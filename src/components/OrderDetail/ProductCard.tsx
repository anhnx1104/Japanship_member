import Box from '@mui/material/Box';
import Image from 'components/Image';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { OrderProduct } from 'types/order';
import RouteLink from 'components/RouteLink';
import Currency from 'utils/Currency';

interface ProductCardProps {
  product: OrderProduct;
}

const getProductUrl = (name: string, id: string) => {
  try {
    new URL(name);
  } catch (_) {
    return `/products/${id}`;
  }
  return name;
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;

  return (
    <Box sx={{ py: 1 }}>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Image
                src={product.url}
                alt="product_thumbnails"
                sx={{
                  maxWidth: 50,
                  maxHeight: 50,
                }}
              />
            </Grid>
            <Grid item sx={{ maxWidth: { md: 600, xs: 400 } }}>
              <Tooltip
                title={`${product.productName || 'N/A'}`}
                placement="top"
              >
                <Box
                  sx={{
                    overflow: 'hidden',
                    WebkitLineClamp: 2,
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {/* <Typography variant="body1">
                    {product.productName || 'N/A'}
                  </Typography> */}
                  <RouteLink
                    href={getProductUrl(product.productName, product.productId)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {product.productName || 'N/A'}
                  </RouteLink>
                </Box>
              </Tooltip>

              {/* <Typography variant="body1">26,000 Yên</Typography> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ textAlign: 'right' }}>
          <Typography variant="h6">
            {Currency.templatePriceVI(product.vnPrice || 0)} đ
          </Typography>
          <Typography variant="caption">
            {Currency.templatePriceVI(product.jpPrice || 0)} Yên
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductCard;
