import React from 'react';
import CartList from '@/components/CartList';
import { Grid, Typography } from '@mui/material';
import ProductCard from '@/components/ProductCard';
import { useCartStore } from '@/store/cartStore';

const CartPage: React.FC = () => {
  const products = useCartStore((state) => state.products);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        <CartList />
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartPage;
