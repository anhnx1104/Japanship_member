import { forwardRef, useImperativeHandle, useState } from 'react';
import { DialogRef } from 'types/refs';

import { Box, Dialog, Typography } from '@mui/material';
import DialogContent from 'components/Dialog/DialogContent';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ActionButton from 'components/ProButton/ActionButton';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogForm from 'components/Dialog/DialogForm';
import Order from 'services/order';
import useNotification from 'hooks/useNotification';
import wait from 'utils/wait';
import getMessageError from 'utils/controlMessage';
import { useTranslation } from 'react-i18next';
import useAuth from 'hooks/useAuth';
import { getListAddressData } from 'services/common';
import { AddressSender } from 'types/common';
import ControllerSelect from 'components/Form/ControllerSelect';
import RouteLink from 'components/RouteLink';
import { INFO_SENDER } from 'constant/route-path';
import CardWrap from '../DialogCreate';

interface FormValue {
  id: string | null;
  userId: number;
  staTus: number;
  sellerName: number;
  sellerAddress: string;
  sellerMobile: number;
}

const validationSchema = yup.object().shape({
  sellerName: yup
    .number()
    .strict(true)
    .required('Nhập tên người gửi')
    .default(null),
});

interface Props {
  open: () => void;
  idSender: number;
  refetchSender: () => void;
}
const STATUS = 1;

// eslint-disable-next-line react/display-name
const DialogSender = forwardRef<DialogRef, Props>((props, ref) => {
  const { refetchSender } = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const setNotification = useNotification();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [address, setAddress] = useState<AddressSender[]>([]);

  const { control, handleSubmit, reset } = useForm<FormValue>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const handleOpen = async () => {
    setOpen(true);
    reset(validationSchema.getDefault());
    setLoading(false);
    await getListAddressData()
      .then(({ data }) => {
        setAddress(data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        staTus: STATUS,
      });
      setNotification({
        message: t('Cập nhật thông tin người dùng thành công'),
        severity: 'success',
      });
      handleReset();
      refetchSender();
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

  const onBack = () => {
    setOpen(false);
    props.open();
    reset(validationSchema.getDefault());
  };

  useImperativeHandle(ref, () => ({
    close: () => {},
    open: handleOpen,
  }));

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
            Chỉnh sửa thông tin người gửi
          </Typography>
        </Typography>

        <CardWrap
          title="NGƯỜI GỬI"
          extra={
            <RouteLink href={INFO_SENDER} underline="none">
              <Typography
                variant="subtitle2"
                color="#aa0a0a"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Cài đặt thông tin người gửi
              </Typography>
            </RouteLink>
          }
        >
          {' '}
          <></>
        </CardWrap>
        <DialogContent>
          <ControllerSelect
            name="sellerName"
            placeholder={t('Chọn địa chỉ người gửi')}
            control={control}
            options={address}
            selector={(item) =>
              item.sellerName +
              ' - ' +
              item.sellerMobile +
              ' - ' +
              item.sellerWardsName +
              ' - ' +
              item.sellerDistrictName +
              ' - ' +
              item.sellerCityName
            }
            // onChangeSelect={handleChange}
          />

          <Box
            sx={{ justifyContent: 'center', display: 'flex', margin: '24px' }}
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

export default DialogSender;
