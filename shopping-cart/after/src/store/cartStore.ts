import { create } from 'zustand';
import { Product, ProductId } from '@/types/product';
import { productsData } from '@/data/products';

interface CartState {
  products: Product[];
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: ProductId) => void;
  increment: (productId: ProductId) => void;
  decrement: (productId: ProductId) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  products: productsData,
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const itemInCart = state.cart.find((item) => item.id === product.id);
      if (itemInCart) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  increment: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    })),
  decrement: (productId) => {
    const cart = get().cart;
    const product = cart.find((item) => item.id === productId);
    if (!product) return {};
    if (product.quantity === 1) {
      return {
        cart: cart.filter((item) => item.id !== productId),
      };
    }
    return set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    }));
  },
}));
