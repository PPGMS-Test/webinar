## when using PayPal Tools, recheck parameter.
### format
When creating order using PayPal order tools, use following format:
create order sample:
```json
{
  "intent": "CAPTURE", // 订单意图：CAPTURE（立即扣款）或 AUTHORIZE（预授权）
  "purchase_units": [
    {
      "reference_id": "SCUBA-ORDER-{{随机订单号}}", // 自定义订单参考号（需唯一）
      "description": "夏威夷潜水商店订单",
      "amount": {
        "currency_code": "USD", // 货币单位
        "value": "{{订单总金额}}" // 需与商品总价一致
      },
      "items": [
        {
          "name": "{{商品名称}}", // 示例：潜水装备套装 / 开放水域潜水课程 / 运动饮料
          "unit_amount": {
            "currency_code": "USD",
            "value": "{{单项价格}}"
          },
          "quantity": "{{数量}}",
          "category": "{{商品类别}}", // 可选：DIGITAL_GOODS / PHYSICAL_GOODS / SERVICE 等
          "sku": "{{商品SKU}}" // 自定义商品编码（可选）
        }
        // 可添加多个items（最多100个）
      ],
      "shipping": {
        "method": "USPS", // 运输方式：按要求固定为USPS
        "name": {
          "full_name": "{{收件人姓名}}"
        },
        "address": {
          "address_line_1": "{{地址1}}",
          "address_line_2": "{{地址2（可选）}}",
          "admin_area_2": "{{城市}}",
          "admin_area_1": "{{州/省}}",
          "postal_code": "{{邮政编码}}",
          "country_code": "US" // 美国地址固定为US
        }
      }
    }
  ],
  "application_context": {
    "return_url": "{{return_url}}", // 您的网站返回URL
    "cancel_url": "{{cancel_url}}", // 取消支付返回URL
    "brand_name": "{{品牌名称}}", // 品牌名称

    "locale": "en-US", // 页面语言
    "shipping_preference": "SET_PROVIDED_ADDRESS", // 运输偏好：使用用户提供的地址
    "user_action": "PAY_NOW" // 用户操作：立即支付
  }
}
```

###
For return_url when creating order, use "https://gmsshanghai-thankyou.surge.sh"