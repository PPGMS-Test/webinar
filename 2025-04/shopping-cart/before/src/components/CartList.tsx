import React from 'react';
import CartItem from './CartItem';
import { useCartStore } from '@/store/cartStore';
import { Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const CartList: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const navigate = useNavigate();
  if (cart.length === 0) {
    return <Typography>Your cart is empty</Typography>;
  }
  return (
    <>
      <Grid container>
        {cart.map((item) => (
          <Grid item key={item.id} xs={12}>
            <CartItem item={item} />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={() => navigate('/checkout')}>
        Checkout
      </Button>
    </>
  );
};

export default CartList;
