import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import DateFns from 'utils/DateFns';
import QontoStepIcon from 'components/QontoStepIcon';

const STATUS_ORDER_DETAIL: Record<number, string> = {
  1: 'Tạo đơn',
  2: 'Đã tiếp Nhận',
  3: 'Xuất hàng tại kho nhật',
  4: 'Xuất hàng tại kho việt nam',
  5: 'Đang giao đến người nhận',
  6: 'Giao hàng thành công',
};

interface Props {
  orderStatusId: number;
  jpExportDate: string;
  shippingCompleteDate: string;
  shippingDate: string;
  vnExportDate: string;
  createdAt: string;
  confirmAt: string;
}
const StepperOrder = (props: Props) => {
  const {
    orderStatusId,
    createdAt,
    confirmAt,
    vnExportDate,
    shippingDate,
    shippingCompleteDate,
    jpExportDate,
  } = props;

  return (
    <Stepper
      activeStep={orderStatusId}
      orientation="vertical"
      sx={{ flexDirection: 'column-reverse' }}
    >
      <Step>
        <StepLabel StepIconComponent={QontoStepIcon} sx={{ p: 0 }}>
          <Typography variant="subtitle2">{STATUS_ORDER_DETAIL[1]}</Typography>
          {createdAt ? DateFns.format(new Date(createdAt), 'dd-MM-yyyy') : ''}
        </StepLabel>
      </Step>
      <Step>
        <StepLabel StepIconComponent={QontoStepIcon} sx={{ p: 0 }}>
          <Typography variant="subtitle2">{STATUS_ORDER_DETAIL[2]}</Typography>
          {confirmAt ? DateFns.format(new Date(confirmAt), 'dd-MM-yyyy') : ''}
        </StepLabel>
      </Step>
      <Step>
        <StepLabel StepIconComponent={QontoStepIcon} sx={{ p: 0 }}>
          <Typography variant="subtitle2">{STATUS_ORDER_DETAIL[3]}</Typography>
          {jpExportDate
            ? DateFns.format(new Date(jpExportDate), 'dd-MM-yyyy')
            : ''}
        </StepLabel>
      </Step>

      <Step>
        <StepLabel StepIconComponent={QontoStepIcon} sx={{ p: 0 }}>
          <Typography variant="subtitle2">{STATUS_ORDER_DETAIL[4]}</Typography>
          {vnExportDate
            ? DateFns.format(new Date(vnExportDate), 'dd-MM-yyyy')
            : ''}
        </StepLabel>
      </Step>
      <Step>
        <StepLabel StepIconComponent={QontoStepIcon} sx={{ p: 0 }}>
          <Typography variant="subtitle2">{STATUS_ORDER_DETAIL[5]}</Typography>
          {shippingDate
            ? DateFns.format(new Date(shippingDate), 'dd-MM-yyyy')
            : ''}
        </StepLabel>
      </Step>
      <Step>
        <StepLabel StepIconComponent={QontoStepIcon} sx={{ p: 0 }}>
          <Typography variant="subtitle2">{STATUS_ORDER_DETAIL[6]}</Typography>
          {shippingCompleteDate
            ? DateFns.format(new Date(shippingCompleteDate), 'dd-MM-yyyy')
            : ''}
        </StepLabel>
      </Step>
    </Stepper>
  );
};

export default StepperOrder;
