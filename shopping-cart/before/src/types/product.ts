export type ProductId = number;
export interface Product {
  id: ProductId;
  name: string;
  price: number;
  quantity: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
}
