import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material';
import { Product } from '@/types/product';
import CanvasThumbnail from './CanvasThumbnail';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        backgroundColor: '#f5f5f5',
      }}
    >
      <CardContent>
        <CanvasThumbnail width={100} height={100} draw={product.draw} />
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`$${product.price.toFixed(2)}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
