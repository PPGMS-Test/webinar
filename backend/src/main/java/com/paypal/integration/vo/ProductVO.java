package com.paypal.integration.vo;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;

public class ProductVO {
    private String productSkuId;
    private String productName;
    private String unit;
    private String price;
    private String total;
    private String imageUrl;

    @JsonGetter("productSkuId")
    public String getProductSkuId() {
        return productSkuId;
    }

    @JsonSetter("productSkuId")
    public void setProductSkuId(String productSkuId) {
        this.productSkuId = productSkuId;
    }

    @JsonGetter("productName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getProductName() {
        return productName;
    }

    @JsonSetter("productName")
    public void setProductName(String productName) {
        this.productName = productName;
    }

    @JsonGetter("unit")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getUnit() {
        return unit;
    }

    @JsonSetter("unit")
    public void setUnit(String unit) {
        this.unit = unit;
    }

    @JsonGetter("price")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getPrice() {
        return price;
    }

    @JsonSetter("price")
    public void setPrice(String price) {
        this.price = price;
    }

    @JsonGetter("total")
    public String getTotal() {
        return total;
    }

    @JsonSetter("total")
    public void setTotal(String total) {
        this.total = total;
    }

    @JsonGetter("imageUrl")
    public String getImageUrl() {
        return imageUrl;
    }

    @JsonSetter("imageUrl")
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
