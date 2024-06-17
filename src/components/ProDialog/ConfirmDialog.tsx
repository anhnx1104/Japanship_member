import type { SvgIconComponent } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logger from 'utils/Logger';
import DialogContainer from './DialogContainer';
import DialogContent from './DialogContent';
import DialogFooter from './DialogFooter';
import DialogHeader from './DialogHeader';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  onRefresh?: () => void;
  type: 'confirm' | 'delete';
  content: {
    title: string;
    label: string;
    description: string;
    subdescription?: string;
    headerIcon?: SvgIconComponent;
    submitIcon?: SvgIconComponent;
  };
}

const ConfirmDialog = (props: Props) => {
  const { open, content, onClose, onSubmit, onRefresh, type } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const { label, title, description, subdescription, headerIcon, submitIcon } =
    content;

  const HeaderIcon = headerIcon
    ? headerIcon
    : type === 'confirm'
    ? CheckIcon
    : DeleteIcon;
  const SubmitIcon = submitIcon
    ? submitIcon
    : type === 'confirm'
    ? CheckIcon
    : DeleteIcon;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit();
    } catch (error) {
      Logger.log(error);
    } finally {
      setLoading(false);
      onRefresh?.();
      onClose();
    }
  };

  return (
    <DialogContainer open={open} onClose={onClose}>
      <DialogHeader title={title} icon={HeaderIcon} />
      <DialogContent>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ textAlign: 'center' }}
        >
          {description}
        </Typography>
        {subdescription && (
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            {subdescription}
          </Typography>
        )}
      </DialogContent>
      <DialogFooter>
        <Button
          variant="outlined"
          startIcon={<CloseIcon />}
          onClick={onClose}
          fullWidth={matches}
        >
          {t('Hủy bỏ')}
        </Button>
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          startIcon={<SubmitIcon />}
          color={type === 'delete' ? 'error' : 'success'}
          onClick={handleSubmit}
          fullWidth={matches}
        >
          {label}
        </LoadingButton>
      </DialogFooter>
    </DialogContainer>
  );
};

export default ConfirmDialog;
