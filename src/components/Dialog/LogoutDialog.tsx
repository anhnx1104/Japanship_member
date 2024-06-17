import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface Props {
  openLogoutPopup: boolean;
  handleCloseLogoutPopup: () => void;
  loadingLogout: boolean;
  handleLogout: () => Promise<void>;
}

const LogoutDialog = (props: Props) => {
  const {
    openLogoutPopup,
    handleCloseLogoutPopup,
    loadingLogout,
    handleLogout,
  } = props;
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={openLogoutPopup}
      onClose={handleCloseLogoutPopup}
      scroll="body"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
        }}
      >
        {<LogoutIcon sx={{ fontSize: 70, color: 'text.secondary' }} />}
      </Box>
      <Divider />
      <DialogContent>
        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          Bạn có muốn đăng xuất ngay bây giờ không?
        </Typography>
      </DialogContent>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, py: 2 }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={handleCloseLogoutPopup}
            color="error"
          >
            Hủy bỏ
          </Button>
          <LoadingButton
            loading={loadingLogout}
            loadingPosition="start"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Đăng xuất
          </LoadingButton>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default LogoutDialog;
