import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import HomeLayout from 'layouts/Home';
import Paper from '@mui/material/Paper';
import Image from 'components/Image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getOrderDetail } from 'services/order';
import { getMessageCodeError } from 'utils/controlMessage';
import useNotification from 'hooks/useNotification';
import { useTranslation } from 'react-i18next';
import { OrderDetail } from 'types/order';
import Currency from 'utils/Currency';
import { PAY_STATUS } from 'constant/common';
import StepperOrder from 'components/StepperOrder';
import withPrivateRoute from 'hocs/withPrivateRoute';
import LoadingScreen from 'components/LoadingScreen';
import NoResult from 'components/NoResult';

const OrderDetails = () => {
  const setNotification = useNotification();
  const { t } = useTranslation();
  const { query, back } = useRouter();
  const { id: orderId } = query;

  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  console.log('orderDetail', orderDetail);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof orderId !== 'string') {
      return;
    }
    setLoading(true);
    getOrderDetail({ orderId })
      .then(({ data }) => {
        setOrderDetail(data);
      })
      .catch((error) => {
        const message = getMessageCodeError(error) || 'message.systemError';
        setNotification({
          error: t(message),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orderId, setNotification, t]);

  return (
    <HomeLayout>
      <Container maxWidth="lg" sx={{ pt: { xs: 12 }, height: '100%' }}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItem: 'center' }}>
            <ArrowBackIcon
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                back();
              }}
            />
            <Typography sx={{ fontWeight: 'bold' }} pb={2.5} pl={1}>
              Thông tin đơn hàng
            </Typography>
          </Box>

          {loading ? (
            <LoadingScreen />
          ) : orderDetail ? (
            <Paper sx={{ boxShadow: (theme) => theme.shadows[8] }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'vShip.footer.background',
                  color: 'vShip.footer.color',
                  px: 2,
                  boxShadow: '#63636333 0px 2px 8px 0px',
                }}
              >
                <Typography py={2} pr={2.5}>
                  {` Mã vận đơn: ${orderDetail.jpBillCode}`}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography pl={2.5}>{orderDetail.statusStr}</Typography>
              </Box>
              <Box sx={{ p: { xs: 0, sm: 2 } }}>
                <Paper
                  sx={{
                    boxShadow: '#63636333 0px 2px 8px 0px',
                    p: 2,
                    mb: 2,
                  }}
                >
                  <Typography
                    color="primary.main"
                    sx={{ fontWeight: 'bold' }}
                    gutterBottom
                  >
                    Người gửi11
                  </Typography>
                  <Box pl={1.5}>
                    <Typography gutterBottom>
                      {orderDetail?.senderName} - {orderDetail.sellerMobile}
                    </Typography>
                    <Typography sx={{ fontWeight: '500' }} gutterBottom>
                      Địa chỉ:{' '}
                      <Typography component="span">
                        {`${orderDetail.receiverCountry}, ${orderDetail.receiverAddress}`}
                      </Typography>
                    </Typography>
                  </Box>
                  <Typography
                    color="primary.main"
                    sx={{ fontWeight: '600' }}
                    gutterBottom
                  >
                    Người nhận
                  </Typography>
                  <Box pl={1.5}>
                    <Typography gutterBottom>
                      {orderDetail.receiverName} - {orderDetail.buyerMobile}
                    </Typography>
                    <Typography sx={{ fontWeight: '500' }} gutterBottom>
                      Địa chỉ:{' '}
                      <Typography component="span">
                        {`${orderDetail.receiverCountry}, ${orderDetail.receiverAddress}`}

                        {/* {`${orderDetail.buyerAddress}, ${orderDetail.buyerWardsName}, ${orderDetail.buyerDistrictName}, ${orderDetail.buyerCityName}`} */}
                      </Typography>
                    </Typography>
                  </Box>
                </Paper>
                <Paper
                  sx={{
                    display: 'flex',
                    alignItems: { md: 'center' },
                    justifyContent: 'space-between',
                    boxShadow: '#63636333 0px 2px 8px 0px',
                    flexDirection: { xs: 'column', md: 'row' },
                    p: 2,
                    mb: 2,
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      color="primary.main"
                      sx={{ fontWeight: '600' }}
                      gutterBottom
                    >
                      Thông tin đơn hàng
                    </Typography>
                    <Box pl={1.5}>
                      <Typography gutterBottom></Typography>
                      <Typography sx={{ fontWeight: '500' }} gutterBottom>
                        Mã vận đơn tại Nhật:{' '}
                        <Typography component="span">
                          {' '}
                          {orderDetail.japanCode}
                        </Typography>
                      </Typography>
                      <Typography sx={{ fontWeight: '500' }} gutterBottom>
                        Tên hàng hoá:{' '}
                        <Typography component="span">
                          {' '}
                          {orderDetail.productName}
                        </Typography>
                      </Typography>
                      <Typography sx={{ fontWeight: '500' }} gutterBottom>
                        Hình thức giao hàng đến kho Nhật:{' '}
                        <Typography component="span">
                          {orderDetail.jpShippingName}
                        </Typography>
                      </Typography>
                      <Typography sx={{ fontWeight: '500' }} gutterBottom>
                        Trọng lượng đơn hàng:{' '}
                        <Typography component="span">
                          {orderDetail.estimatedWeight} kg{' '}
                        </Typography>
                      </Typography>
                      <Typography sx={{ fontWeight: '500' }} gutterBottom>
                        Đơn giá vận chuyển về Việt Nam:{' '}
                        <Typography component="span">
                          {orderDetail?.estimatedShippingPrice &&
                            Currency.templatePriceVI(
                              orderDetail.estimatedShippingPrice
                            )}{' '}
                          đ
                        </Typography>
                      </Typography>
                      <Typography sx={{ fontWeight: '500' }} gutterBottom>
                        Giá cước vận chuyển về Việt Nam:{' '}
                        <Typography component="span">
                          {orderDetail.shippingCostFeeToVn &&
                            Currency.templatePriceVI(
                              orderDetail.shippingCostFeeToVn
                            )}{' '}
                          đ
                        </Typography>
                      </Typography>
                      <Typography sx={{ fontWeight: '500' }} gutterBottom>
                        Trạng thái thanh toán:{' '}
                        <Typography component="span" color="primary.main">
                          {orderDetail.paymentStatus &&
                            orderDetail.paymentStatus in PAY_STATUS &&
                            PAY_STATUS[orderDetail.paymentStatus]}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                  {orderDetail.dataUrl && (
                    <Box pl={1.5}>
                      <Typography
                        sx={{
                          fontWeight: '500',
                          display: { xs: 'block', md: 'none' },
                        }}
                        gutterBottom
                      >
                        Ảnh đơn hàng:
                      </Typography>
                      <Image
                        sx={{
                          width: 120,
                          height: 150,
                          ml: { xs: 2, md: 3 },
                          objectFit: 'cover',
                        }}
                        src={orderDetail.hostUrl + orderDetail.dataUrl}
                        alt=""
                      />
                    </Box>
                  )}
                </Paper>
                <Paper
                  sx={{
                    boxShadow: '#63636333 0px 2px 8px 0px',
                    p: 2,
                  }}
                >
                  <Typography
                    color="primary.main"
                    sx={{ fontWeight: '600' }}
                    gutterBottom
                  >
                    Thông tin giao vận
                  </Typography>
                  <StepperOrder
                    orderStatusId={orderDetail.orderStatusId || 0}
                    createdAt={orderDetail.createdAt || ''}
                    confirmAt={orderDetail.confirmAt || ''}
                    vnExportDate={orderDetail.vnExportDate || ''}
                    shippingDate={orderDetail.shippingDate || ''}
                    shippingCompleteDate={
                      orderDetail.shippingCompleteDate || ''
                    }
                    jpExportDate={orderDetail.jpExportDate || ''}
                  />
                </Paper>
              </Box>
            </Paper>
          ) : (
            <NoResult
              imageWidth={100}
              imageHeight={100}
              message={'Đơn hàng không tồn tại'}
            />
          )}
        </Paper>
      </Container>
    </HomeLayout>
  );
};

export default withPrivateRoute(OrderDetails);
