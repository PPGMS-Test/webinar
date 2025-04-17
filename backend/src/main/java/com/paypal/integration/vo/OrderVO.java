package com.paypal.integration.vo;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;

import java.util.List;

public class OrderVO {
    private List<ProductVO> products;
    private BuyerVO buyer;

    public OrderVO() {
    }

    public OrderVO(List<ProductVO> products, BuyerVO buyer) {
        this.products = products;
        this.buyer = buyer;
    }

    @JsonGetter("products")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public List<ProductVO> getProducts() {
        return products;
    }

    @JsonSetter("products")
    public void setProducts(List<ProductVO> products) {
        this.products = products;
    }

    @JsonGetter("buyer")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public BuyerVO getBuyer() {
        return buyer;
    }

    @JsonSetter("buyer")
    public void setBuyer(BuyerVO buyer) {
        this.buyer = buyer;
    }

    @Override
    public String toString() {
        return "OrderVO{" +
                "products=" + products +
                ", buyer=" + buyer +
                '}';
    }
}
