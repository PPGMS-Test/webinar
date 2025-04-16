import { create } from 'zustand';

interface ShippingAddress {
  addressLine1: string;
  addressLine2: string;
  adminArea1: string;
  adminArea2: string;
  postalCode: string;
  countryCode: string;
}

interface Buyer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  shippingAddress: ShippingAddress;
}

interface BuyerStore {
  buyer: Buyer;
  setBuyer: (buyer: Buyer) => void;
}

export const useBuyerStore = create<BuyerStore>((set) => ({
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
  setBuyer: (buyer) => set({ buyer })
}));
