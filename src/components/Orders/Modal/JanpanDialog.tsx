import { forwardRef, Fragment, useImperativeHandle, useState } from 'react';
import { DialogRef } from 'types/refs';

import { Box, Dialog, FormGroup, Grid, Typography } from '@mui/material';
import ControllerCheckbox from 'components/Form/ControllerCheckbox';
import DialogContent from 'components/Dialog/DialogContent';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ActionButton from 'components/ProButton/ActionButton';
import FormLabel from 'components/Form/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogForm from 'components/Dialog/DialogForm';
import useNotification from 'hooks/useNotification';
import Order from 'services/order';
import getMessageError from 'utils/controlMessage';
import { useTranslation } from 'react-i18next';
import wait from 'utils/wait';
import useAuth from 'hooks/useAuth';
import RouteLink from 'components/RouteLink';
import CardWrap from '../DialogCreate';
import ControllerTextField from 'components/Form/ControllerTextField';

interface FormValue {
  id: string | null;
  userId: number;
  japanCode: string;
  isChecked: boolean;
  staTus: number;
}

const validationSchema = yup.object().shape({
  isChecked: yup.boolean().default(false),
  japanCode: yup
    .string()
    .strict(true)

    .default('')
    .when(['isChecked'], (isChecked, schema) => {
      if (isChecked === false) {
        return schema.required('Vui lòng nhập mã vận đơn');
      }
    }),
});
const STATUS = 2;
interface Props {
  open: () => void;
  idSender: number;
  refetchJappan: () => void;
}
// eslint-disable-next-line react/display-name
const JapanDialog = forwardRef<DialogRef, Props>((props, ref) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const setNotification = useNotification();
  const { t } = useTranslation();
  const { control, handleSubmit, reset, trigger } = useForm<FormValue>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });
  const handleReset = async () => {
    setOpen(false);
    await wait(350);
  };

  const onSubmit = async (data: FormValue) => {
    try {
      setLoading(true);
      await Order.confirmSenders({
        id: props.idSender,
        userId: user?.id,
        japanCode: data.japanCode,
        staTus: STATUS,
        isChecked: data.isChecked,
      });
      setNotification({
        message: t('Cập nhật thông tin người dùng thành công'),
        severity: 'success',
      });
      handleReset();
      props.refetchJappan();
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
  const handleOpen = () => {
    setOpen(true);
  };

  const onBack = () => {
    setOpen(false);
    props.open();
    reset(validationSchema.getDefault());
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  useImperativeHandle(ref, () => ({
    close: () => {},
    open: handleOpen,
  }));

  const handleChangeCheckBox = () => {
    trigger('japanCode');
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
          <Typography component="span">
            Chỉnh sửa mã vận đơn tại Nhật
          </Typography>
        </Typography>

        <CardWrap
          title="Mã vận đơn tại Nhật"
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
                  title={'Mã vận đơn tại Nhật'}
                  name="japanCode"
                  gutterBottom
                  required
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <ControllerTextField
                  name="japanCode"
                  control={control}
                  type="text"
                  placeholder="Nhập mã vận đơn"
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
          <FormGroup>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '16px',
              }}
            >
              <ControllerCheckbox
                onChangeSelect={handleChangeCheckBox}
                name="isChecked"
                control={control}
                label={
                  <Typography variant="body2">
                    Loại đơn hàng không có mã tại Nhật
                  </Typography>
                }
              />
            </Box>
          </FormGroup>

          <Box
            sx={{
              marginTop: '16px',
              justifyContent: 'center',
              display: 'flex',
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

export default JapanDialog;
