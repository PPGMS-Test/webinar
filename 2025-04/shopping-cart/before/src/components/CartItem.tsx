import React from 'react';
import { Product } from '@/types/product';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from '@mui/material';
import CanvasThumbnail from './CanvasThumbnail';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  item: Product;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, increment, decrement } = useCartStore();

  return (
    <Card
      sx={{
        marginBottom: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <CanvasThumbnail width={100} height={100} draw={item.draw} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">{item.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{`$${item.price.toFixed(2)}`}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Box display="flex" alignItems="center">
              <Button onClick={() => decrement(item.id)}>-</Button>
              <Typography mx={2}>{item.quantity}</Typography>
              <Button onClick={() => increment(item.id)}>+</Button>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              Total: ${item.price * item.quantity.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItem;
