import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import RouteLink from 'components/RouteLink';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface DialogProps {
  nameProduct: string;
  openSuccessDialog: boolean;
  handleClose: () => void;
  description: string;
  href: string;
}

const DialogSuccess = (props: DialogProps) => {
  const { nameProduct, openSuccessDialog, handleClose, description, href } =
    props;
  return (
    <Dialog
      open={openSuccessDialog}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent
        sx={{
          textAlign: 'center',
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DialogTitle variant="h4">
          Đơn hàng {nameProduct} của bạn đã được tạo thành công
        </DialogTitle>
        <CheckCircleIcon
          sx={{
            color: 'success.dark',
            width: 80,
            height: 80,
            mb: 2,
          }}
        />
        <DialogContentText variant="body1" color="success.dark">
          {description}
        </DialogContentText>
        <RouteLink sx={{ mt: 3 }} href={href} underline="none">
          <Button>Xem chi tiết</Button>
        </RouteLink>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSuccess;
