import React from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { useCartStore } from '@/store/cartStore';
import { useNavigate } from 'react-router-dom';
import PayPalButton from '@/components/PaymentMethod/PayPal';
import { useBuyerStore } from '@/store/buyerStore'; // 新增

const CheckoutForm: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const buyer = useBuyerStore((state) => state.buyer); // 新增
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Handle checkout logic here
    alert('checkout succeed');
  };

  return (
    <Paper sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h5" gutterBottom>
        Checkout
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Buyer Information */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              defaultValue={buyer.firstName} // 新增
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              defaultValue={buyer.lastName} // 新增
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              defaultValue={buyer.email} // 新增
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phoneNumber"
              name="phone"
              label="phone"
              fullWidth
              defaultValue={buyer.phoneNumber} // 新增
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="addressLine1"
              name="addressLine1"
              label="addressLine1"
              fullWidth
              defaultValue={buyer.shippingAddress.addressLine1} // 新增
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="addressLine2"
              name="addressLine2"
              label="addressLine2"
              fullWidth
              defaultValue={buyer.shippingAddress.addressLine2} // 新增
              variant="standard"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="adminArea1"
              name="adminArea1"
              label="adminArea1"
              fullWidth
              defaultValue={buyer.shippingAddress.adminArea1} // 新增
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="adminArea2"
              name="adminArea2"
              label="adminArea2"
              fullWidth
              defaultValue={buyer.shippingAddress.adminArea2} // 新增
              variant="standard"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="postalCode"
              name="postalCode"
              label="Zip / Postal code"
              fullWidth
              defaultValue={buyer.shippingAddress.postalCode} // 新增
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              defaultValue={buyer.shippingAddress.countryCode} // 新增
              variant="standard"
            />
          </Grid>
        
          <Grid item xs={12}>
            <Box border={1} borderColor="gray" p={2} mt={2}>
              <Typography variant="h6">Payment Method</Typography>
              <PayPalButton />
            </Box>
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="flex-end">
          {/* <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mr: 2 }}
          >
            Pay $ {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </Button> */}
          <Button variant="outlined" onClick={() => navigate('/cart')}>
            Cancel
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CheckoutForm;
