export type ProductId = number;
export interface Product {
  id: ProductId;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;  // 替换原来的draw函数
}
