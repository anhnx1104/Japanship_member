import AdjustIcon from '@mui/icons-material/Adjust';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import type { StepIconProps } from '@mui/material/StepIcon';

const QontoStepIcon = (props: StepIconProps) => {
  const { completed } = props;
  return completed ? (
    <AdjustIcon sx={{ color: 'primary.main' }} fontSize="small" />
  ) : (
    <FiberManualRecordIcon fontSize="small" color="disabled" />
  );
};

export default QontoStepIcon;
