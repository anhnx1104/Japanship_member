import CardWrap from 'components/CardWrap';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Form from 'components/Form/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Regexs from 'utils/Regexs';
import ControllerTextField from 'components/Form/ControllerTextField';
import FormLabel from 'components/Form/FormLabel';
import Page from 'components/Page';
import UserProfileLayout from 'layouts/UserProfile';
import ControllerCheckbox from 'components/Form/ControllerCheckbox';
import AutocompleteSelect from 'components/Form/AutocompleteSelect';
import { COUNTRY_DEFAULT } from 'constant/common';
import { AddressSender } from 'types/user';
import { useEffect, useState } from 'react';
import useNotification from 'hooks/useNotification';
import getMessageError from 'utils/controlMessage';
import { getCity, getDistrict, getWards } from 'services/common';
import { useTranslation } from 'react-i18next';
import { City, Districts } from 'types/common';
import { createAddressSender } from 'services/sender';
import { useRouter } from 'next/router';
import wait from 'utils/wait';

interface FormValues {
  userName: string;
  phoneNumber: string;
  detailAddress: string;
  countryId: number | null;
  cityId: number | null;
  districtId: number | null;
  wardsId: number | null;
  isCheckedDefault: boolean;
}

const validationSchemaAddAddress = yup.object().shape({
  userName: yup
    .string()
    .trim('schema.trim')
    .required('Vui lòng nhập họ và tên')
    .default(''),
  phoneNumber: yup
    .string()
    .trim('schema.trim')
    .required('Vui lòng nhập số điện thoại')
    .matches(Regexs.phoneNumber, 'schema.validPhone')
    .default(''),
  detailAddress: yup
    .string()
    .trim('schema.trim')
    .required('Vui lòng nhập địa chỉ ')
    .default(''),
  countryId: yup.number().nullable().required('Vui lòng chọn nước'),
  cityId: yup.number().nullable().required('Vui lòng chọn tỉnh/thành phố'),
  districtId: yup.number().nullable().required('Vui lòng chọn quận/huyện'),
  wardsId: yup.number().nullable().required('Vui lòng nhập phường/xã'),
  isCheckedDefault: yup.boolean().default(false),
});

const CreateSenderAddress = () => {
  const { t } = useTranslation();
  const setNotification = useNotification();
  const route = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [listCitys, setListCitys] = useState<City[]>([]);
  const [listDistricts, setListDistricts] = useState<Districts[]>([]);
  const [listWards, setListWards] = useState<AddressSender[]>([]);

  const { control, handleSubmit, reset, watch, trigger, setValue } =
    useForm<FormValues>({
      mode: 'onChange',
      resolver: yupResolver(validationSchemaAddAddress),
      defaultValues: validationSchemaAddAddress.getDefault(),
    });

  const onSubmitCreateAddress = async (values: FormValues) => {
    if (!values) return;
    const {
      cityId,
      detailAddress,
      districtId,
      isCheckedDefault,
      phoneNumber,
      userName,
      wardsId,
    } = values;
    try {
      setLoading(true);
      await createAddressSender({
        addressLine: '',
        addressDefault: isCheckedDefault ? 1 : 2,
        cityId: cityId,
        districtId: districtId,
        wardsId: wardsId,
        fullName: userName,
        mobile: phoneNumber,
        specificAddress: detailAddress,
      });
      await wait(350);
      reset(validationSchemaAddAddress.getDefault());
      route.push('/profile/info-sender');
      setNotification({
        message: t('message.createAddressSuccess'),
        severity: 'success',
      });
    } catch (error) {
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        message: t(message),
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const [countryId, cityId] = watch(['countryId', 'cityId']);
    if (countryId && cityId) trigger('cityId');
  }, [trigger, watch]);

  const handleSelectedCountry = async (value: number | null) => {
    if (value === null && !value) {
      reset({
        cityId: null,
        districtId: null,
        wardsId: null,
      });

      setListCitys([]);
      setListDistricts([]);
      setListWards([]);
      return;
    }
    setListCitys([]);
    setListDistricts([]);
    setListWards([]);
    setValue('cityId', null);
    setValue('districtId', null);
    setValue('wardsId', null);
    let newValue;
    if (value === 1) {
      newValue = 0;
    } else {
      newValue = 1;
    }
    try {
      const { data } = await getCity(newValue);
      if (data) {
        setListCitys(data || []);
      }
    } catch (error) {
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        message: t(message),
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    const [cityId, districtId] = watch(['cityId', 'districtId']);
    if (cityId && districtId) trigger('districtId');
  }, [watch, trigger]);

  const handleSelectedCity = async (value: number | null) => {
    if (value === null && !value) {
      setValue('districtId', null);
      setValue('wardsId', null);
      setListDistricts([]);
      setListWards([]);
      return;
    }
    setListDistricts([]);
    setListWards([]);
    setValue('districtId', null);
    setValue('wardsId', null);
    try {
      const { data } = await getDistrict(value);
      if (data) {
        setListDistricts(data || []);
      }
    } catch (error) {
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        message: t(message),
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    const [districtId, wardsId] = watch(['districtId', 'wardsId']);
    if (districtId && wardsId) trigger('wardsId');
  }, [trigger, watch]);

  const handleSelectedDistrict = async (value: number | null) => {
    if (value === null && !value) {
      setValue('wardsId', null);
      setListWards([]);
      return;
    }
    setListWards([]);
    setValue('wardsId', null);
    try {
      const { data } = await getWards(value);
      if (data) {
        setListWards(data || []);
      }
    } catch (error) {
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        message: t(message),
        severity: 'error',
      });
    }
  };

  const handleCloseCreateAddress = () => {
    route.back();
  };

  return (
    <Page title="Cài đặt thông tin người gửi">
      <UserProfileLayout>
        <Container
          maxWidth="lg"
          sx={{
            backgroundColor: 'background.paper',
            p: 2.5,
            boxShadow: '1px 1px 3px #ccc,-1px -1px 3px #ccc',
          }}
        >
          <CardWrap
            title="Thêm mới địa chỉ lấy hàng"
            extra={
              <IconButton onClick={handleCloseCreateAddress}>
                <CloseIcon />
              </IconButton>
            }
          >
            <Form noValidate onSubmit={handleSubmit(onSubmitCreateAddress)}>
              <FormGroup sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3} md={2}>
                    <FormLabel
                      name="userName"
                      title="Họ và tên"
                      required
                      gutterBottom
                    />
                  </Grid>
                  <Grid item xs={12} sm={9} md={10}>
                    <ControllerTextField
                      name="userName"
                      control={control}
                      placeholder="Nhập họ và tên"
                    />
                  </Grid>
                </Grid>
              </FormGroup>
              <FormGroup sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3} md={2}>
                    <FormLabel
                      name="phoneNumber"
                      title="Số điện thoại"
                      required
                      gutterBottom
                    />
                  </Grid>
                  <Grid item xs={12} sm={9} md={10}>
                    <ControllerTextField
                      name="phoneNumber"
                      control={control}
                      placeholder="Nhập số điện thoại của bạn"
                    />
                  </Grid>
                </Grid>
              </FormGroup>
              <FormGroup sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3} md={2}>
                    <FormLabel
                      name="reciveAddress"
                      title="Địa chỉ"
                      required
                      gutterBottom
                    />
                  </Grid>
                  <Grid item xs={12} sm={9} md={10}>
                    <ControllerTextField
                      name="detailAddress"
                      control={control}
                      placeholder="Nhập địa chỉ chi tiết"
                    />
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12} sm={12} md={6}>
                        <AutocompleteSelect
                          name="countryId"
                          options={COUNTRY_DEFAULT}
                          selector={(option) => option.name}
                          control={control}
                          placeholder="Đất nước"
                          onChangeSelect={handleSelectedCountry}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <AutocompleteSelect
                          name="cityId"
                          options={listCitys.map((item) => {
                            return {
                              id: item.id,
                              name: item.name,
                            };
                          })}
                          selector={(option) => option.name}
                          control={control}
                          placeholder="Tỉnh/thành phố"
                          onChangeSelect={handleSelectedCity}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12} sm={12} md={6}>
                        <AutocompleteSelect
                          name="districtId"
                          options={listDistricts.map((item) => {
                            return {
                              id: item.id,
                              name: item.name,
                            };
                          })}
                          selector={(option) => option.name}
                          control={control}
                          placeholder="Quận/Huyện"
                          onChangeSelect={handleSelectedDistrict}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <AutocompleteSelect
                          name="wardsId"
                          options={listWards.map((item) => {
                            return {
                              id: item.id,
                              name: item.name,
                            };
                          })}
                          selector={(option) => option.name}
                          control={control}
                          placeholder="Phường/Xã"
                        />
                      </Grid>
                    </Grid>
                    <FormGroup>
                      <Grid container sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={12} md={6}>
                          <ControllerCheckbox
                            name="isCheckedDefault"
                            control={control}
                            label={
                              <Typography variant="body2">
                                Đặt làm thông tin người gửi mặc định
                              </Typography>
                            }
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>
                  </Grid>
                </Grid>
              </FormGroup>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: 2,
                  mb: 4,
                }}
              >
                <LoadingButton
                  loading={loading}
                  size="small"
                  variant="outlined"
                  type="submit"
                >
                  Lưu
                </LoadingButton>
              </Box>
            </Form>
          </CardWrap>
        </Container>
      </UserProfileLayout>
    </Page>
  );
};

export default CreateSenderAddress;
