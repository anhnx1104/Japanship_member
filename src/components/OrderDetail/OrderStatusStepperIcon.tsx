import { ReactElement } from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import JapanFlagIcon from '../Icons/JapanFlagIcon';
import VietnamFlagIcon from '../Icons/VietnamFlagIncon';
import type { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    // backgroundImage:
    //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    backgroundColor: theme.palette.info.main,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    // backgroundImage:
    //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    backgroundColor: theme.palette.info.main,
  }),
}));

const OrderStatusStepperIcon = (props: StepIconProps) => {
  const { active, completed } = props;

  const icons: { [index: string]: ReactElement } = {
    1: <ReceiptLongIcon />,
    2: <JapanFlagIcon width={25} />,
    3: <VietnamFlagIcon width={25} />,
    4: <LocalShippingIcon />,
    5: <TaskAltIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

export default OrderStatusStepperIcon;
