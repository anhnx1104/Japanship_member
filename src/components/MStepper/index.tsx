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
  5: 'Xuất hàng tại kho việt nam',
  6: 'Đang giao đến người nhận',
  7: 'Giao hàng thành công',
  8: 'Đã Hủy',
};

const index = () => {
  return (
    <Stepper
      activeStep={2}
      orientation="vertical"
      sx={{ flexDirection: 'column-reverse' }}
    >
      <Step>
        <StepLabel StepIconComponent={QontoStepIcon} sx={{ p: 0 }}>
          <Typography variant="subtitle2">{STATUS_ORDER_DETAIL[1]}</Typography>
          {DateFns.format(new Date('2022-02-15T09:03:55.000Z'), 'dd-MM-yyyy')}
        </StepLabel>
      </Step>
      <Step>
        <StepLabel StepIconComponent={QontoStepIcon} sx={{ p: 0 }}>
          <Typography variant="subtitle2">{STATUS_ORDER_DETAIL[2]}</Typography>
          {DateFns.format(new Date('2022-02-15T09:03:55.000Z'), 'dd-MM-yyyy')}
        </StepLabel>
      </Step>
    </Stepper>
  );
};

export default index;
