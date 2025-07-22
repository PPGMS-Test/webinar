# 在已有的购物车页面中添加 PayPal 支付

## 需求

-   本项目工程是一个购物车的结算页面，需要在结算页面中添加 PayPal 支付
-   使用 PayPal 的 JS SDK 来渲染 PayPal 支付按钮

## 代码细节

-   在`src/compoenents/PaymentMethod/`目录下添加`PayPal.tsx`文件
-   在`CheckoutForm.tsx`的支付插槽中使用`PayPal.tsx`文件的内容来渲染 PayPal 支付按钮, 不要改动其他部分的代码

-   要求使用 PayPal JavaScript SDK（5.0+）
-   动态加载 PayPal JS SDK, 其中`clientId`为`test`, 请不要使用第三方依赖来实现动态加载, 使用动态加载script标签的方式来完成
  - 可以参考 >https://gist.github.com/user-q123/926a96d471fd9994f54e5fc9a81609d7 的动态加载JS SDK的方式
   
-   请把购物车中的商品信息在创建订单的时候传递给后端,requestBody 的属性请从`@/store/cartStore.ts`中获取相关需要传给PayPal支付功能相关的参数
-   模块的引入路径请使用`@`

## 后端接口

后端调用参考如下:

```javascript
paypal
    .Buttons({
        createOrder: () => {
            /* 调用 localhost:5004/api/orders */
        },
        onApprove: () => {
            /* 调用 localhost:5004//api/orders/:orderId/capture 接口 */
        },
    })
    .render("#paypal-button-container");
```

请按照上述接口来实现 PayPal 支付
