// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import OrderStatusStepperIcon from './OrderStatusStepperIcon';
// import { useTranslation } from 'react-i18next';
// import Typography from '@mui/material/Typography';
// import { ColorlibConnector } from './OrderProgressConnector';
// import DateFns from 'utils/DateFns';
// import { OrderDetail } from 'types/order';
// import OrderShippingCodeTag from './OrderShippingCodeTag';
import { Box } from '@mui/material';

// interface OrderProgressBarProps {
//   orderDetail: OrderDetail;
// }

// const DeliveryStep: Record<number, number> = {
//   0: 0,
//   1: 0,
//   2: 1,
//   3: 1,
//   4: 2,
//   5: 4,
//   6: -1,
//   7: 3,
// };

// const getShipUrl = (shippingCode: string) => {
//   if (shippingCode.match(/(GHTK)\w+/g)) {
//     return `https://i.ghtk.vn/${shippingCode}`;
//   }
//   if (shippingCode.match(/(VNPOST)\w+/g)) {
//     return `http://www.vnpost.vn/vi-vn/dinh-vi/buu-pham?key=${shippingCode}`;
//   }
//   return '#';
// };

const OrderProgressBar = () => {
  // const { orderDetail } = props;
  // const { t } = useTranslation()

  return <Box>abc</Box>;
  // <Stepper
  //   alternativeLabel
  //   activeStep={DeliveryStep[orderDetail.deliveryStatus]}
  //   connector={<ColorlibConnector />}
  //   sx={{ width: 1, minWidth: 600 }}
  // >
  //   <Step>
  //     <StepLabel StepIconComponent={OrderStatusStepperIcon}>
  //       <Typography variant="body2">
  //         {t('label.orderDetail.orderStatus.buySuccess')}
  //       </Typography>
  //       <Typography variant="caption">
  //         {orderDetail.purchaseDate
  //           ? DateFns.format(new Date(orderDetail.purchaseDate), 'dd-MM-yyyy')
  //           : ''}
  //       </Typography>
  //     </StepLabel>
  //   </Step>
  //   <Step>
  //     <StepLabel StepIconComponent={OrderStatusStepperIcon}>
  //       <Typography variant="body2">
  //         {t('label.orderDetail.orderStatus.japanExport')}
  //       </Typography>
  //       <Typography variant="caption">
  //         {orderDetail.jpExportDate
  //           ? DateFns.format(new Date(orderDetail.jpExportDate), 'dd-MM-yyyy')
  //           : ''}
  //       </Typography>
  //     </StepLabel>
  //   </Step>
  //   <Step>
  //     <StepLabel StepIconComponent={OrderStatusStepperIcon}>
  //       <Typography variant="body2">
  //         {t('label.orderDetail.orderStatus.vietnamExport')}
  //       </Typography>
  //       <Typography variant="caption">
  //         {orderDetail.vnExportDate
  //           ? DateFns.format(new Date(orderDetail.vnExportDate), 'dd-MM-yyyy')
  //           : ''}
  //       </Typography>
  //     </StepLabel>
  //   </Step>
  //   <Step>
  //     <StepLabel StepIconComponent={OrderStatusStepperIcon}>
  //       <Typography variant="body2">
  //         {t('label.orderDetail.orderStatus.delivering')}
  //       </Typography>
  //       {/* <RouteLink
  //         href={getShipUrl(orderDetail.shippingCode || '')}
  //         target={'_blank'}
  //         rel={'external nofollow noopener noreferrer'}
  //       >
  //         {orderDetail.shippingCode || ''}
  //       </RouteLink> */}
  //       <OrderShippingCodeTag
  //         imgUrl={orderDetail.shippingCodeImageUrl}
  //         shippingCode={orderDetail.shippingCode}
  //         shippingNote={orderDetail.shippingCodeNote}
  //         shippingType={orderDetail.shippingCodeType}
  //       />
  //       <Typography variant="caption">
  //         {orderDetail.shippingDate
  //           ? DateFns.format(new Date(orderDetail.shippingDate), 'dd-MM-yyyy')
  //           : ''}
  //       </Typography>
  //     </StepLabel>
  //   </Step>
  //   <Step>
  //     <StepLabel StepIconComponent={OrderStatusStepperIcon}>
  //       <Typography variant="body2">
  //         {t('label.orderDetail.orderStatus.done')}
  //       </Typography>
  //       <Typography variant="caption">
  //         {orderDetail.completeDate
  //           ? DateFns.format(new Date(orderDetail.completeDate), 'dd-MM-yyyy')
  //           : ''}
  //       </Typography>
  //     </StepLabel>
  //   </Step>
  // </Stepper>
};

export default OrderProgressBar;
