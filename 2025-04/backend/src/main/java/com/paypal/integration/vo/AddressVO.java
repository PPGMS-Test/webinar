package com.paypal.integration.vo;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;

public class AddressVO {
    private String addressLine1;
    private String addressLine2;
    private String adminArea2;
    private String adminArea1;
    private String postalCode;
    private String countryCode;

    public AddressVO() {
    }

    public AddressVO(String countryCode, String addressLine1, String addressLine2, String adminArea2, String adminArea1, String postalCode) {
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.adminArea2 = adminArea2;
        this.adminArea1 = adminArea1;
        this.postalCode = postalCode;
        this.countryCode = countryCode;
    }

    @JsonGetter("addressLine1")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getAddressLine1() {
        return this.addressLine1;
    }

    @JsonSetter("addressLine1")
    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    @JsonGetter("addressLine2")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getAddressLine2() {
        return this.addressLine2;
    }

    @JsonSetter("addressLine2")
    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    @JsonGetter("adminArea2")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getAdminArea2() {
        return this.adminArea2;
    }

    @JsonSetter("adminArea2")
    public void setAdminArea2(String adminArea2) {
        this.adminArea2 = adminArea2;
    }

    @JsonGetter("adminArea1")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getAdminArea1() {
        return this.adminArea1;
    }

    @JsonSetter("adminArea1")
    public void setAdminArea1(String adminArea1) {
        this.adminArea1 = adminArea1;
    }

    @JsonGetter("postalCode")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getPostalCode() {
        return this.postalCode;
    }

    @JsonSetter("postalCode")
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    @JsonGetter("countryCode")
    public String getCountryCode() {
        return this.countryCode;
    }

    @JsonSetter("countryCode")
    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String toString() {
        return "Address [countryCode=" + this.countryCode + ", addressLine1=" + this.addressLine1 + ", addressLine2=" + this.addressLine2 + ", adminArea2=" + this.adminArea2 + ", adminArea1=" + this.adminArea1 + ", postalCode=" + this.postalCode + "]";
    }
}
