package com.paypal.integration.common;

public enum PaymentMethod {
    PAYPAL("PAYPAL"),
    CARD("CARD"),
    AP("APPLE_PAY"),
    GP("GOOGLE_PAY");

    private final String method;

    PaymentMethod(String method) {
        this.method = method;
    }

    public String getMethod() {
        return method;
    }
}
