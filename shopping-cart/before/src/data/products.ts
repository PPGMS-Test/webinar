import { Product } from '@/types/product';

export const productsData: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 10.99,
    quantity: 0,
    draw: (ctx) => {
      ctx.fillStyle = 'red';
      ctx.fillRect(25, 25, 50, 50);
    },
  },
  {
    id: 2,
    name: 'Product 2',
    price: 25.5,
    quantity: 0,
    draw: (ctx) => {
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(50, 50, 40, 0, 2 * Math.PI);
      ctx.fill();
    },
  },
  {
    id: 3,
    name: 'Product 3',
    price: 15.0,
    quantity: 0,
    draw: (ctx) => {
      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.moveTo(50, 10);
      ctx.lineTo(10, 90);
      ctx.lineTo(90, 90);
      ctx.closePath();
      ctx.fill();
    },
  },
];
