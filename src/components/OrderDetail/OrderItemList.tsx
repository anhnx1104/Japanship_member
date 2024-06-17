// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import ProductCard from './ProductCard';
// import Tooltip from '@mui/material/Tooltip';
import { OrderDetail } from 'types/order';
// import Currency from 'utils/Currency';

interface OrderItemListProps {
  orderDetail: OrderDetail;
}

const OrderItemList = (props: OrderItemListProps) => {
  // const { orderDetail } = props;

  return (
    <Grid container justifyContent={'flex-end'} spacing={1}>
      {/* <Grid item xs={12}>
        {orderDetail.products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </Grid>
      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>
      <Grid item md={6} xs={12}>
        <Tooltip
          title={'Phí thanh toán là 100 Yên/sản phẩm'}
          arrow
          placement="top"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography>Phí thanh toán</Typography>
            <Typography>
              {Currency.templatePriceVI(orderDetail.paymentFee || 0)} đ
            </Typography>
          </Box>
        </Tooltip>

        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography>Tiền dịch vụ</Typography>
          <Typography>
            {Currency.templatePriceVI(orderDetail.serviceFee || 0)} đ
          </Typography>
        </Box>
        <Divider />
        <Tooltip
          title={
            'Phụ phí cho đơn hàng dưới 1 triệu VNĐ là 30.000 VNĐ và phụ phí đối với máy tính, điện thoại là 100.000 VNĐ'
          }
          arrow
          placement="top"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography>Phụ phí</Typography>
            <Typography>
              {Currency.templatePriceVI(orderDetail.surcharge || 0)} đ
            </Typography>
          </Box>
        </Tooltip>

        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography>Phí ship nội địa Nhật</Typography>
          <Typography>
            {Currency.templatePriceVI(orderDetail.jpShippingFee || 0)} đ
          </Typography>
        </Box>
        <Divider />
        <Tooltip
          title={
            'Phí ship Việt Nam = Trọng lượng của đơn hàng x Đơn giá vận chuyển'
          }
          arrow
          placement="top"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography>Phí ship Việt Nam</Typography>
            <Typography>
              {Currency.templatePriceVI(orderDetail.vnShippingFee || 0)} đ
            </Typography>
          </Box>
        </Tooltip>

        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: 'error.main',
          }}
        >
          <Typography>Tổng tiền hàng</Typography>
          <Typography>
            {Currency.templatePriceVI(orderDetail.totalPrice || 0)} đ
          </Typography>
        </Box>
      </Grid> */}
    </Grid>
  );
};

export default OrderItemList;
