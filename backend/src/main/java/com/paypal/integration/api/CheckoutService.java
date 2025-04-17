package com.paypal.integration.api;

import com.paypal.sdk.models.Order;
import com.paypal.integration.vo.OrderVO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public interface CheckoutService {
    @PostMapping("/api/orders")
    public ResponseEntity<Order> createOrder(@RequestBody OrderVO orderVO);

    @PostMapping("/api/orders/{orderID}/capture")
    public ResponseEntity<Order> captureOrder(@PathVariable("orderID") String orderID);

    @PostMapping("/api/orders/createAsync")
    public ResponseEntity<Order> createOrderAsync(@RequestBody OrderVO orderVO);
}
