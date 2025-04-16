# 购物车支付页面
 
## 项目定位
1. 完成一个基础的购物车支付页面
2. 包含了几个测试用的商品
3. 纯前端应用
4. 完成度高, 可以直接通过`pnpm dev`命令启动
 
## 核心代码技术点
-   使用Material UI
-   React+TypeScript
-   React Router
-   基于 zustand 的状态管理
 
## 页面式样
- 符合Material UI的设计风格
- 内容元素(请与下方的`zustand要求`部分结合)
  - 待支付的商品列表
    - 价格
    - 数量
    - 货币单位
    - 总价格
  - 消费者信息(以合理的方式排列)
    - 电话
    - 邮箱
    - 地址
    - 邮编
    - 国家
    - 省份
    - 姓名
  - 支付方式列表 (**留空, 作为slot**)
    - 支付按钮
 
## zustand要求
此购物在订单结算时候与后台通讯的接口如下, 请在zustand中管理它
 
```ts
export const orderData = {
  buyer: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'JohnDoe@paypal.com',
    phoneNumber: '1234567890',
    shippingAddress: {
      addressLine1: '173 Drury Lane',
      addressLine2: '100 Paypal Apartment',
      adminArea1: 'New York City',
      adminArea2: 'New York',
      postalCode: '10013',
      countryCode: 'US'
    }
  },
  products: [{
    productSkuId: 'psku001',
    productName: 'Book: Aromatherapy' ,
    unit: 1,
    price: 19.90,
    imageUrl: './image/book_aromatherapy.jpeg',
  },{
    productSkuId: 'psku002',
    productName: 'Flower: Chrysanthemum' ,
    unit: 2,
    price: 9.90,
    imageUrl: './image/flower_chrysanthemum.jpg',
  }]
}
```
 
## 项目代码细节
1. 使用`pnpm`作为包管理工具
2. 使用`vite`作为构建工具
3. 请输出包括`package.json`,`tsconfig.json`,`vite.config.ts`在内的所有代码
4. 模块化设计
5. 设置`@`别名指向`src`目录
6. 请使用`pnpm dev`命令启动项目, 请使用`pnpm build`命令构建项目, 请使用`pnpm preview`命令预览项目
9.  启动端口设置为`4000`
10. 请自己应用背景色到各个组件中
11. 把这些文件都应用到目前项目工程中, 也就是说根目录为 `./`
12. 包含3个测试商品
13. 请你用canvas给每个商品画一个简单的图案作为缩略图
14. 打印项目结构让我有一个直观的了解