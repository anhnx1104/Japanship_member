import { forwardRef, useImperativeHandle, useState } from 'react';
import { DialogRef } from 'types/refs';
import { Box, Dialog, FormGroup, Grid, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DialogContent from 'components/Dialog/DialogContent';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FormLabel from 'components/Form/FormLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { getCity, getDistrict, getWards } from 'services/common';
import { useForm } from 'react-hook-form';
import type { City, Districts, Wards } from 'types/common';
import DialogForm from 'components/Dialog/DialogForm';
import ControllerTextField from 'components/Form/ControllerTextField';
import Order from 'services/order';
import useNotification from 'hooks/useNotification';
import wait from 'utils/wait';
import getMessageError from 'utils/controlMessage';
import { useTranslation } from 'react-i18next';
import useAuth from 'hooks/useAuth';
import Regexs from 'utils/Regexs';
import ControllerSelect from 'components/Form/ControllerSelect';
import CardWrap from '../DialogCreate';
import RouteLink from 'components/RouteLink';

interface FormValues {
  id: string | null;
  userId: number | null;
  buyerName: string;
  buyerMobile: string;
  buyerAddress: string;
  cityId: number | null;
  districtId: number | null;
  wardsId: number | null;
  staTus: number;
}
const validationSchema = yup.object().shape({
  buyerName: yup
    .string()
    .strict(true)
    .required('Vui lòng nhập họ tên ')
    .default(''),
  buyerMobile: yup
    .string()
    .matches(Regexs.phoneNumber, 'schema.validPhone')
    .strict(true)
    .required('Vui lòng nhập số điện thoại ')
    .default(''),
  buyerAddress: yup
    .string()
    .strict(true)
    .required('Vui lòng nhập địa chỉ ')
    .default(''),
  cityId: yup
    .number()
    .required('Vui lòng chọn thành phố  ')
    .strict(true)
    .default(null)
    .nullable(),
  districtId: yup
    .number()
    .required('Vui lòng chọn quận huyện  ')
    .strict(true)
    .default(null)
    .nullable(),
  wardsId: yup
    .number()
    .required('Vui lòng chọn phường xã  ')
    .strict(true)
    .default(null)
    .nullable(),
});

const ID_CITY = 0;
const STATUS = 3;

interface Props {
  open: () => void;
  idSender: number;
  refetchEdit: () => void;
}
// eslint-disable-next-line react/display-name
const EditDialog = forwardRef<DialogRef, Props>((props, ref) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const setNotification = useNotification();
  const { t } = useTranslation();

  const [countries, setCountries] = useState<City[]>([]);
  const [districs, setDistrics] = useState<Districts[]>([]);
  const [wards, setWards] = useState<Wards[]>([]);
  const { handleSubmit, control, reset } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const handleOpen = async () => {
    setOpen(true);
    await getCity(ID_CITY)
      .then(({ data }) => {
        setCountries(data || []);
      })
      .catch((err) => {
        console.log(err);
      });
    reset(validationSchema.getDefault());
  };

  const handleChangeCity = (countryId: number | null) => {
    if (!countryId) return;
    getDistrict(countryId)
      .then(({ data }) => {
        setDistrics(data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeDistrict = (districtId: number | null) => {
    if (!districtId) return;
    getWards(districtId)
      .then(({ data }) => {
        setWards(data || []);
      })
      .catch((err) => {
        console.log(err);
      });
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
  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await Order.confirmSenders({
        id: props.idSender,
        userId: user?.id,
        buyerName: data.buyerName,
        buyerMobile: data.buyerMobile,
        buyerAddress: data.buyerAddress,
        cityId: data.cityId,
        districtId: data.districtId,
        wardsId: data.wardsId,
        staTus: STATUS,
      });
      setNotification({
        message: t('Cập nhật thông tin người dùng thành công'),
        severity: 'success',
      });
      handleReset();
      props.refetchEdit();
      reset(validationSchema.getDefault());
    } catch (error) {
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        message: t(message),
        severity: 'error',
      });
    } finally {
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
          <Typography component="span">
            Chỉnh sửa thông tin người nhận
          </Typography>
        </Typography>
        <CardWrap
          title="Người nhận"
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
                  title={'Họ và tên'}
                  name="buyerName"
                  gutterBottom
                  required
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <ControllerTextField
                  name="buyerName"
                  control={control}
                  type="text"
                  placeholder={'Nhập họ và tên người nhận'}
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

          <FormGroup sx={{ marginTop: '16px' }}>
            <Grid container>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel
                  title={'Số điện thoại'}
                  name="buyerMobile"
                  gutterBottom
                  required
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <ControllerTextField
                  name="buyerMobile"
                  control={control}
                  type="text"
                  placeholder={'Nhập số điện thoại người nhận'}
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
          <FormGroup sx={{ marginTop: '16px' }}>
            <Grid container>
              <Grid item xs={12} sm={4} md={4}>
                <FormLabel
                  title={'Địa chỉ người nhận'}
                  name="buyerAddress"
                  gutterBottom
                  required
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <ControllerTextField
                  name="buyerAddress"
                  control={control}
                  type="text"
                  placeholder={'Nhập địa chỉ chi tiết'}
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

          <FormGroup sx={{ marginTop: '16px' }}>
            <Grid container>
              <Grid item xs={12} sm={4} md={4}>
                <LocationOnIcon />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <ControllerSelect
                  name="cityId"
                  placeholder={t('Tỉnh/thành phố')}
                  options={countries}
                  onChangeSelect={handleChangeCity}
                  // rowKey={i}
                  selector={(country) => country.name}
                  control={control}
                />
              </Grid>
            </Grid>
          </FormGroup>

          <FormGroup sx={{ marginTop: '16px' }}>
            <Grid container>
              <Grid item xs={12} sm={4} md={4}></Grid>
              <Grid item xs={12} sm={8} md={8}>
                <ControllerSelect
                  name="districtId"
                  placeholder={t('Quận/Huyện')}
                  options={districs}
                  selector={(district) => district.name}
                  control={control}
                  onChangeSelect={handleChangeDistrict}
                />
              </Grid>
            </Grid>
          </FormGroup>

          <FormGroup sx={{ marginTop: '16px' }}>
            <Grid container>
              <Grid item xs={12} sm={4} md={4}></Grid>
              <Grid item xs={12} sm={8} md={8}>
                <ControllerSelect
                  name="wardsId"
                  placeholder={t('Phường/Xã')}
                  options={wards}
                  selector={(ward) => ward.name}
                  control={control}
                />
              </Grid>
            </Grid>
          </FormGroup>

          <Box
            sx={{
              justifyContent: 'center',
              display: 'flex',
              marginTop: '24px',
            }}
          >
            <LoadingButton
              // color="inherit"
              type="submit"
              loading={loading}
              size={'large'}
            >
              Xác nhận
            </LoadingButton>
          </Box>
        </DialogContent>
      </DialogForm>
    </Dialog>
  );
});

export default EditDialog;
