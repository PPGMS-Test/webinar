package com.paypal.integration.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.paypal.integration.api.CheckoutService;
import com.paypal.integration.common.IdUtils;
import com.paypal.integration.common.PaymentMethod;
import com.paypal.integration.vo.AddressVO;
import com.paypal.integration.vo.BuyerVO;
import com.paypal.integration.vo.OrderVO;
import com.paypal.integration.vo.ProductVO;
import com.paypal.sdk.PaypalServerSdkClient;
import com.paypal.sdk.controllers.OrdersController;
import com.paypal.sdk.exceptions.ApiException;
import com.paypal.sdk.http.response.ApiResponse;
import com.paypal.sdk.models.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
public class CheckoutServiceImpl implements CheckoutService {
    private final PaypalServerSdkClient client;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public CheckoutServiceImpl(PaypalServerSdkClient client) {
        this.client = client;
    }

    @Override
    public ResponseEntity<Order> createOrder(OrderVO orderVO) {
        try {
            log.info("CreateOrder request: {}", gson.toJson(orderVO));
            Order response = this.createOrderVO(orderVO);
            log.info("CreateOrder response: {}", gson.toJson(response));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Order> captureOrder(String orderID) {
        try {
            log.info("CaptureOrder requestOrderId: {}", orderID);
            Order response = this.captureOrders(orderID);
            log.info("CaptureOrder response: {}", gson.toJson(response));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Order> createOrderAsync(OrderVO orderVO) {
        // TODO: Implement this method
        try {
            log.info("CreateOrderAsync request: {}", gson.toJson(orderVO));
            Order response = this.createOrderVO(orderVO);
            log.info("CreateOrderAsync response: {}", gson.toJson(response));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Order captureOrders(String orderID) throws IOException, ApiException {
        CaptureOrderInput captureOrderInput = new CaptureOrderInput.Builder(
                orderID,
                null)
                .build();
        OrdersController ordersController = client.getOrdersController();
        ApiResponse<Order> apiResponse = ordersController.captureOrder(captureOrderInput);
        return apiResponse.getResult();
    }

    private Order createOrderVO(OrderVO orderVO) throws IOException, ApiException {
        // init order create request
        CreateOrderInput createOrderInput = new CreateOrderInput();
        // Request ID is preferred to be unique for debugging
        createOrderInput.setPaypalRequestId("REQ-ID-" + IdUtils.id32());
        createOrderInput.setBody(this.createOrderRequest(orderVO));

        OrdersController ordersController = client.getOrdersController();
        log.info("CreateOrderInput: {}", gson.toJson(createOrderInput));
        ApiResponse<Order> apiResponse = ordersController.createOrder(createOrderInput);
        return apiResponse.getResult();
    }

    private OrderRequest createOrderRequest(OrderVO orderVO) {
        OrderRequest orderRequest = new OrderRequest();

        // 设置必填字段
        orderRequest.setIntent(CheckoutPaymentIntent.CAPTURE);

        // 创建PurchaseUnit
        PurchaseUnitRequest purchaseUnit = new PurchaseUnitRequest();

        // 设置Items
        List<Item> items = new ArrayList<>();
        BigDecimal itemTotalValue = BigDecimal.ZERO;

        for (ProductVO product : orderVO.getProducts()) {
            Item item = new Item();
            item.setName(product.getProductName());
            item.setSku(product.getProductSkuId());
            item.setQuantity(product.getUnit());
            item.setCategory(ItemCategory.PHYSICAL_GOODS);

            Money unitAmount = new Money();
            unitAmount.setCurrencyCode("USD");
            unitAmount.setValue(new BigDecimal(product.getPrice()).setScale(2, RoundingMode.HALF_UP).toString());
            item.setUnitAmount(unitAmount);

            items.add(item);

            // 计算商品总价
            BigDecimal productPrice = new BigDecimal(product.getPrice());
            BigDecimal quantity = new BigDecimal(product.getUnit());
            itemTotalValue = itemTotalValue.add(productPrice.multiply(quantity));
        }
        purchaseUnit.setItems(items);

        // 设置Amount
        AmountWithBreakdown amount = new AmountWithBreakdown();
        amount.setCurrencyCode("USD");
        amount.setValue(itemTotalValue.setScale(2, RoundingMode.HALF_UP).toString());

        AmountBreakdown breakdown = new AmountBreakdown();
        Money itemTotal = new Money();
        itemTotal.setCurrencyCode("USD");
        itemTotal.setValue(itemTotalValue.setScale(2, RoundingMode.HALF_UP).toString());
        breakdown.setItemTotal(itemTotal);
        amount.setBreakdown(breakdown);
        purchaseUnit.setAmount(amount);

        // 设置Shipping
        ShippingDetails shipping = new ShippingDetails();
        shipping.setType(FulfillmentType.SHIPPING);

        ShippingName name = new ShippingName();
        BuyerVO buyer = orderVO.getBuyer();
        name.setFullName(buyer.getFirstName() + " " + buyer.getLastName());
        shipping.setName(name);

        PhoneNumberWithCountryCode phoneNumber = new PhoneNumberWithCountryCode();
        phoneNumber.setCountryCode("1"); // 默认美国区号
        phoneNumber.setNationalNumber(buyer.getPhoneNumber());
        shipping.setPhoneNumber(phoneNumber);

        Address address = new Address();
        AddressVO shippingAddress = buyer.getShippingAddress();
        address.setCountryCode(shippingAddress.getCountryCode());
        address.setPostalCode(shippingAddress.getPostalCode());
        address.setAddressLine1(shippingAddress.getAddressLine1());
        address.setAddressLine2(shippingAddress.getAddressLine2());
        address.setAdminArea1(shippingAddress.getAdminArea1());
        address.setAdminArea2(shippingAddress.getAdminArea2());
        shipping.setAddress(address);
        purchaseUnit.setShipping(shipping);

        purchaseUnit.setInvoiceId("InvoiceId_" + IdUtils.id32());
        orderRequest.setPurchaseUnits(Collections.singletonList(purchaseUnit));

        // 设置PaymentSource
        PaymentSource paymentSource = new PaymentSource();
        // saveCardChecked means pay by card, otherwise pay by PayPal
        if (PaymentMethod.CARD.equals(buyer.getPaymentMethod())) {
            // set an empty object, js sdk will set it automatically
            paymentSource.setCard(new CardRequest());
            if (buyer.isSaveCardChecked()) {
                // set attributes
                CardRequest cardRequest = new CardRequest();
                CardAttributes attributes = new CardAttributes();
                VaultInstructionBase vaultInstructionBase = new VaultInstructionBase();
                vaultInstructionBase.setStoreInVault(StoreInVaultInstruction.ON_SUCCESS);
                attributes.setVault(vaultInstructionBase);
                cardRequest.setAttributes(attributes);
                paymentSource.setCard(cardRequest);
            }
        } else {
            PaypalWallet paypal = new PaypalWallet();
            PaypalWalletExperienceContext experienceContext = new PaypalWalletExperienceContext();
            experienceContext.setReturnUrl("https://example.com/return");
            experienceContext.setCancelUrl("https://example.com/cancel");
            paypal.setExperienceContext(experienceContext);
            paymentSource.setPaypal(paypal);
        }
        orderRequest.setPaymentSource(paymentSource);


        return orderRequest;
    }
}
