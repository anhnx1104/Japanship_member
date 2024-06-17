import withPrivateRoute from 'hocs/withPrivateRoute';
// import UserProfileLayout from 'layouts/UserProfile';
// import Container from '@mui/material/Container';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Grid';
// import OrderProgressBar from 'components/OrderDetail/OrderProgressBar';
// import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import OrderItemList from 'components/OrderDetail/OrderItemList';
// import { createRef, useEffect, useState } from 'react';
// import CartAddress from 'components/OrderDetail/Address';
// import { useRouter } from 'next/router';
// import order from 'services/order';
// import useNotification from 'hooks/useNotification';
// import { useTranslation } from 'react-i18next';
// import getMessageError from 'utils/controlMessage';
// import { OrderDetail as OrderDetailType } from 'types/order';
// import CircularProgress from '@mui/material/CircularProgress';
// import NoResult from 'components/NoResult';

// interface OrderDetailProps {}

// const OrderStatus: Record<number, string> = {
//   0: 'Chờ nhập kho Nhật',
//   1: 'Đã nhập kho Nhật',
//   2: 'Chờ nhập kho Việt',
//   3: 'Đã nhập kho Việt',
//   4: 'Đã xuất kho Việt',
//   5: 'Đã giao thành công',
//   6: 'Đã hủy',
//   7: 'Đang vận chuyển',
// };

const OrderDetail = (props: any) => {
  //   const [showAddress, setShowAddress] = useState<boolean>(false);
  //   const stepperRef = createRef<HTMLDivElement>();
  //   const { back } = useRouter();
  //   // const { id } = query;
  //   const setNotification = useNotification();
  //   const { t } = useTranslation();
  //   const [orderDetail, setOrderDetail] = useState<OrderDetailType | null>(null);
  //   const [loading] = useState<boolean>(true);

  //   // const getDetail = useCallback(() => {
  //   //   if (typeof id !== 'string') {
  //   //     return;
  //   //   }

  //   //   order
  //   //     .getOrderDetail(id)
  //   //     .then((res) => {
  //   //       if (res.data) {
  //   //         setOrderDetail(res.data);
  //   //       }
  //   //     })
  //   //     .catch((error) => {
  //   //       const message = getMessageError(error) || 'message.systemError';
  //   //       setNotification({
  //   //         error: t(message),
  //   //       });
  //   //     })
  //   //     .finally(() => {
  //   //       setLoading(false);
  //   //     });
  //   // }, [id, setNotification, t]);

  //   // useEffect(() => {
  //   //   if (typeof id !== 'string') {
  //   //     return;
  //   //   }
  //   //   getDetail();
  //   // }, [id, getDetail]);

  //   useEffect(() => {
  //     if (stepperRef.current) {
  //       stepperRef.current.scrollLeft = 0;
  //     }
  //   }, [stepperRef]);

  //   const handleChangeAddress = (addressId: number) => {
  //     if (!orderDetail) return;

  //     order
  //       .updateOrderAddress({
  //         addressId,
  //         billCode: orderDetail.billCode,
  //       })
  //       .then((res) => {
  //         if (res.data) {
  //           setOrderDetail((prev) => {
  //             if (prev) {
  //               return {
  //                 ...prev,
  //                 addressId: res.data!.addressId,
  //               };
  //             }
  //             return null;
  //           });
  //           setNotification({
  //             message: t('label.orderDetail.successChangeAddress'),
  //             severity: 'success',
  //           });
  //         } else {
  //           setNotification({
  //             error: t('label.orderDetail.failChangeAddress'),
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         const message = getMessageError(err) || 'message.systemError';
  //         setNotification({
  //           error: t(message),
  //         });
  //       });
  //   };

  return (
    <Box>abc</Box>
    //     <UserProfileLayout>
    //       <Container
    //         maxWidth="md"
    //         sx={{
    //           backgroundColor: 'background.paper',
    //           p: 2.5,
    //           boxShadow: '1px 1px 3px #ccc,-1px -1px 3px #ccc',
    //           minHeight: 500,
    //         }}
    //       >
    //         {!loading ? (
    //           orderDetail ? (
    //             <Grid container spacing={1}>
    //               <Grid item xs={12}>
    //                 <Stack
    //                   justifyContent="space-between"
    //                   sx={{ flexDirection: { sm: 'row', sx: 'column' } }}
    //                 >
    //                   <Typography
    //                     onClick={() => {
    //                       back();
    //                     }}
    //                     sx={{
    //                       color: 'info.main',
    //                       cursor: 'pointer',
    //                       '&:hover': {
    //                         textDecoration: 'underline',
    //                       },
    //                     }}
    //                   >
    //                     Trở lại
    //                   </Typography>
    //                   <Box display={'flex'}>
    //                     <Typography>
    //                       Mã vận đơn: {orderDetail.billCode || 'N/A'}
    //                     </Typography>
    //                     <Divider orientation="vertical" sx={{ mx: 1 }} />
    //                     <Typography
    //                       color={'error.main'}
    //                       style={{ textTransform: 'uppercase' }}
    //                     >
    //                       ĐƠN HÀNG {OrderStatus[orderDetail.deliveryStatus]}
    //                     </Typography>
    //                   </Box>
    //                 </Stack>
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <Divider variant="fullWidth" />
    //               </Grid>
    //               <Grid item xs={12} sx={{ overflow: 'auto' }} ref={stepperRef}>
    //                 <OrderProgressBar orderDetail={orderDetail} />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <Divider />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <CartAddress
    //                   showAddAddress={showAddress}
    //                   setShowAddAddress={setShowAddress}
    //                   orderStatus={orderDetail.deliveryStatus}
    //                   orderAddressId={orderDetail.addressId}
    //                   onChangeAddress={handleChangeAddress}
    //                 />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <Divider />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <OrderItemList orderDetail={orderDetail} />
    //               </Grid>
    //             </Grid>
    //           ) : (
    //             <Box sx={{ display: 'flex', height: 1 }}>
    //               <NoResult
    //                 imageWidth={100}
    //                 imageHeight={100}
    //                 message={'Không có dữ liệu'}
    //               />
    //             </Box>
    //           )
    //         ) : (
    //           <Box sx={{ display: 'flex', height: 1 }}>
    //             <CircularProgress sx={{ margin: 'auto' }} />
    //           </Box>
    //         )}
    //       </Container>
    //     </UserProfileLayout>
  );
};

export default withPrivateRoute(OrderDetail);
