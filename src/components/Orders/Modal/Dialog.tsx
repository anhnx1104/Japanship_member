import {
  forwardRef,
  Fragment,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { DialogRef } from 'types/refs';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import DialogContainer from 'components/Dialog/DialogContainer';
import DialogHeader from 'components/Dialog/DialogHeader';
import DialogContent from 'components/Dialog/DialogContent';
import DialogFooter from 'components/Dialog/DialogFooter';

import DialogSender from './SenderDialog';
import JapanDialog from './JanpanDialog';
import EditDialog from './EditInfoDialog';
import CancelDialog from './CancelDialog';

interface Props {
  id: number | null;
  refetch: () => void;
}

// eslint-disable-next-line react/display-name
const Dialog = forwardRef<DialogRef, Props>((props, ref) => {
  const { id, refetch } = props;

  const [open, setOpen] = useState(false);

  const dialogRef1 = useRef<DialogRef>(null);
  const dialogRef2 = useRef<DialogRef>(null);
  const dialogRef3 = useRef<DialogRef>(null);
  const dialogRef4 = useRef<DialogRef>(null);

  const handleOpenDialogSender = () => {
    dialogRef1.current?.open();
    setOpen(false);
  };

  const handleOpenDialogJaPan = () => {
    dialogRef2.current?.open();
    setOpen(false);
  };

  const handleOpenDialogEdit = () => {
    dialogRef3.current?.open();
    setOpen(false);
  };

  const handleOpenDialogCancel = () => {
    dialogRef4.current?.open();
    setOpen(false);
  };

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useImperativeHandle(ref, () => ({
    close: () => {},
    open: handleOpen,
  }));

  return (
    <Fragment>
      <DialogContainer maxWidth="sm" open={open}>
        <DialogHeader title={'Chỉnh sửa thông tin đơn hàng'} />
        <DialogContent>
          <MenuItem
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            onClick={handleOpenDialogSender}
          >
            Chỉnh sửa thông tin người gửi <KeyboardArrowRightIcon />
          </MenuItem>
          <Divider />
          <MenuItem
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            onClick={handleOpenDialogJaPan}
          >
            Chỉnh sửa thông tin mã vận đơn tại Nhật <KeyboardArrowRightIcon />
          </MenuItem>
          <Divider />
          <MenuItem
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            onClick={handleOpenDialogEdit}
          >
            Chỉnh sửa thông tin người nhận <KeyboardArrowRightIcon />
          </MenuItem>
          <Divider />
          <MenuItem
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            onClick={handleOpenDialogCancel}
          >
            Hủy đơn hàng <KeyboardArrowRightIcon />
          </MenuItem>
          <Divider />
        </DialogContent>
        <DialogFooter>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={handleClose}
          >
            {'Hủy bỏ'}
          </Button>
        </DialogFooter>
      </DialogContainer>

      {id ? (
        <>
          <DialogSender
            refetchSender={refetch}
            ref={dialogRef1}
            idSender={id}
            open={handleOpen}
          />

          <JapanDialog
            refetchJappan={refetch}
            ref={dialogRef2}
            idSender={id}
            open={handleOpen}
          />
          <EditDialog
            refetchEdit={refetch}
            ref={dialogRef3}
            idSender={id}
            open={handleOpen}
          />
          <CancelDialog
            refetchCancel={refetch}
            ref={dialogRef4}
            idSender={id}
            open={handleOpen}
          />
        </>
      ) : null}
    </Fragment>
  );
});

export default Dialog;
