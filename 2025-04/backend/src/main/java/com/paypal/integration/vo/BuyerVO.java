package com.paypal.integration.vo;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.paypal.integration.common.PaymentMethod;

public class BuyerVO {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private AddressVO shippingAddress;
    private PaymentMethod paymentMethod;
    private Boolean saveCardChecked;
    private String cardVaultId;

    public BuyerVO() {
    }

    @JsonGetter("firstName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getFirstName() {
        return firstName;
    }

    @JsonSetter("firstName")
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @JsonGetter("lastName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getLastName() {
        return lastName;
    }

    @JsonSetter("lastName")
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @JsonGetter("email")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getEmail() {
        return email;
    }

    @JsonSetter("email")
    public void setEmail(String email) {
        this.email = email;
    }

    @JsonGetter("phoneNumber")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getPhoneNumber() {
        return phoneNumber;
    }

    @JsonSetter("phoneNumber")
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @JsonGetter("shippingAddress")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public AddressVO getShippingAddress() {
        return shippingAddress;
    }

    @JsonSetter("shippingAddress")
    public void setShippingAddress(AddressVO shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    @JsonGetter("paymentMethod")
    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    @JsonSetter("paymentMethod")
    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    @JsonGetter("saveCardChecked")
    public Boolean isSaveCardChecked() {
        return saveCardChecked;
    }

    @JsonSetter("saveCardChecked")
    public void setSaveCardChecked(Boolean saveCardChecked) {
        this.saveCardChecked = saveCardChecked;
    }

    @JsonGetter("cardVaultId")
    public String getCardVaultId() {
        return cardVaultId;
    }

    @JsonSetter("cardVaultId")
    public void setCardVaultId(String cardVaultId) {
        this.cardVaultId = cardVaultId;
    }

    @Override
    public String toString() {
        return "BuyerVO{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", shippingAddress=" + shippingAddress +
                ", paymentMethod=" + paymentMethod +
                ", saveCardChecked=" + saveCardChecked +
                ", cardVaultId='" + cardVaultId + '\'' +
                '}';
    }
}
