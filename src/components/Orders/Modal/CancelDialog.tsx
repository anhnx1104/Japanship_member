import useAuth from 'hooks/useAuth';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { DialogRef } from 'types/refs';
import { Box, Dialog, FormGroup, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import * as yup from 'yup';
import DialogContent from 'components/Dialog/DialogContent';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FormLabel from 'components/Form/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogForm from 'components/Dialog/DialogForm';
import ControllerTextField from 'components/Form/ControllerTextField';
import Order from 'services/order';
import useNotification from 'hooks/useNotification';
import wait from 'utils/wait';
import getMessageError from 'utils/controlMessage';
import RouteLink from 'components/RouteLink';
import CardWrap from '../DialogCreate';
interface FormValue {
  note: string;
  id: number | null;
  userId: number;
  staTus: number;
}
interface Props {
  open: () => void;
  idSender: number;
  refetchCancel: () => void;
}
const validationSchema = yup.object().shape({
  note: yup
    .string()
    .strict(true)
    .required('Nhập lý do hủy đơn hàng')
    .default(''),
});

const STATUS = 4;
// eslint-disable-next-line react/display-name
const CancelDialog = forwardRef<DialogRef, Props>((props, ref) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const setNotification = useNotification();
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<FormValue>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const handleOpen = () => {
    setOpen(true);
    reset(validationSchema.getDefault());
  };
  const onBack = () => {
    setOpen(false);
    props.open();
    reset(validationSchema.getDefault());
  };

  useImperativeHandle(ref, () => ({
    close: () => {},
    open: handleOpen,
  }));

  const handleReset = async () => {
    setOpen(false);
    await wait(350);
  };
  const onSubmit = async (data: FormValue) => {
    try {
      setLoading(true);
      await Order.confirmSenders({
        note: data.note,
        id: props.idSender,
        userId: user?.id,
        staTus: STATUS,
      });
      setNotification({
        message: t('Cập nhật thông tin người dùng thành công'),
        severity: 'success',
      });
      handleReset();
      props.refetchCancel();
      reset(validationSchema.getDefault());
    } catch (error) {
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        message: t(message),
        severity: 'error',
      });
    } finally {
      reset(validationSchema.getDefault());
      handleReset();
      setLoading(false);
    }
  };

  return (
    <Dialog fullWidth scroll="body" open={open}>
      <DialogForm onSubmit={handleSubmit(onSubmit)}>
        <Typography
          align="left"
          variant="h6"
          sx={{
            color: 'vShip.link.main',
            cursor: 'pointer',
            fontWeight: 'inherit',
            margin: '24px',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={onBack}
        >
          <ArrowBackIosIcon />
          <Typography component="span">Hủy đơn hàng</Typography>
        </Typography>

        <CardWrap
          title="Vui lòng điền lý do hủy đơn hàng"
          extra={
            <RouteLink href={'/'} underline="none">
              <></>
            </RouteLink>
          }
        >
          {' '}
          <></>
        </CardWrap>
        <DialogContent>
          <FormGroup>
            <Grid container>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel
                  title={'Lý do hủy đơn'}
                  name="note"
                  gutterBottom
                  required
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <ControllerTextField
                  name="note"
                  control={control}
                  type="text"
                  placeholder={'Lý do'}
                  InputProps={{
                    inputProps: {
                      sx: {
                        py: { xs: 1.5 },
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </FormGroup>

          <Box
            sx={{
              justifyContent: 'center',
              display: 'flex',
              marginTop: '36px',
            }}
          >
            <LoadingButton type="submit" loading={loading} size={'large'}>
              Xác nhận
            </LoadingButton>
          </Box>
        </DialogContent>
      </DialogForm>
    </Dialog>
  );
});

export default CancelDialog;
