参数定义： 项目实例：OrderVO.java 项目实例示例报文：OrderVO.json 目标实例：OrderRequest.java 目标实例示例报文：CreateOrderDetailed.json

需求： 参照项目实例，项目实例示例报文，目标实例，目标实例示例报文，实现从项目实例到目标实例的字段映射。 代码封装到"CheckoutServiceImpl.java"的"createOrderRequest"方法里。

注意: 1. 目标实例中的必填字段需要有值.必填字段有以下字段: intent(intent默认值CheckoutPaymentIntent.CAPTURE), purchaseUnits, purchaseUnits.items, purchaseUnits.items.name, purchaseUnits.items.quantity, purchaseUnits.items.category(category默认值ItemCategory.PHYSICAL_GOODS), purchaseUnits.items.unitAmount, purchaseUnits.items.unitAmount.currencyCode, purchaseUnits.items.unitAmount.value, purchaseUnits.amount, purchaseUnits.amount.currencyCode, purchaseUnits.amount.value, purchaseUnits.amount.breakdown, purchaseUnits.amount.breakdown.itemTotal, purchaseUnits.amount.breakdown.itemTotal.currencyCode, purchaseUnits.amount.breakdown.itemTotal.value, purchaseUnits.shipping, purchaseUnits.shipping.type(type默认值FulfillmentType.SHIPPING), purchaseUnits.shipping.name, purchaseUnits.shipping.name.fullName, purchaseUnits.shipping.phoneNumber.countryCode, purchaseUnits.shipping.phoneNumber.nationalNumber, purchaseUnits.shipping.address, purchaseUnits.shipping.address.countryCode, purchaseUnits.shipping.address.postalCode, purchaseUnits.shipping.address.addressLine1, purchaseUnits.shipping.address.addressLine2, purchaseUnits.shipping.address.adminArea1, purchaseUnits.shipping.address.adminArea2, paymentSource, paymentSource.paypal, paymentSource.paypal.experienceContext, paymentSource.paypal.experienceContext.returnUrl, paymentSource.paypal.experienceContext.cancelUrl

生成代码时禁止使用建造者模式, 请只使用setter和getter方法
尽可能多的将项目实例的字段映射到目标实例中
映射过程需要使用目标实例的枚举值
金额的计算需要使用BigDecimal来处理，默认返回两位小数
