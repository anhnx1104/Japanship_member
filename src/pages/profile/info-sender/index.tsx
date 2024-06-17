import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Container from '@mui/material/Container';
import ControllerTextField from 'components/Form/ControllerTextField';
import Page from 'components/Page';
import UserProfileLayout from 'layouts/UserProfile';
import { useForm } from 'react-hook-form';
import Regexs from 'utils/Regexs';
import * as yup from 'yup';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CardWrap from 'components/CardWrap';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PlaceIcon from '@mui/icons-material/Place';
import CloseIcon from '@mui/icons-material/Close';
import { COUNTRY_DEFAULT, STEP_1, STEP_2 } from 'constant/common';
import { Fragment, useEffect, useState } from 'react';
import FormLabel from 'components/Form/FormLabel';
import Form from 'components/Form/Form';
import User from 'services/users';
import { AddressSender, ListAddressSender } from 'types/user';
import getMessageError from 'utils/controlMessage';
import useNotification from 'hooks/useNotification';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import type { ChangeEvent } from 'react';
import useDebounce from 'hooks/useDebounce';
import AutocompleteSelect from 'components/Form/AutocompleteSelect';
import { useRouter } from 'next/router';
import LoadingScreen from 'components/LoadingScreen';
import NoResult from 'components/NoResult';
import { getCity, getDistrict, getWards } from 'services/common';
import { City, Districts } from 'types/common';
import { deleteSenderAddress, updateSenderAddress } from 'services/sender';

interface FormValues {
  userName: string;
  phoneNumber: string;
  receiveAddress: string;
  countryId: number | null;
  cityId: number | null;
  districtId: number | null;
  wardsId: number | null;
  isCheckedDefault: boolean;
}

const validationSchemaUpdateAddress = yup.object().shape({
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
  receiveAddress: yup
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

const SetupInfoSender = () => {
  const { t } = useTranslation();
  const setNotification = useNotification();
  const route = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  const [listCitys, setListCitys] = useState<City[]>([]);
  const [listDistricts, setListDistricts] = useState<Districts[]>([]);
  const [listWards, setListWards] = useState<AddressSender[]>([]);

  const [searchKey, setSearchKey] = useState<string>('');
  const [currentId, setCurrentId] = useState<number>(0);

  const [search] = useDebounce(searchKey, 500);
  const [listAdressSender, setListAddressSender] = useState<
    ListAddressSender[]
  >([]);

  const getListAddressSender = async (search: string) => {
    try {
      setLoading(true);
      const { data } = await User.searchAddressSender(search);
      if (data) {
        setListAddressSender(data || []);
      }
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

  // call get list addressSender
  useEffect(() => {
    getListAddressSender(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const { control, handleSubmit, reset, watch, trigger, setValue } =
    useForm<FormValues>({
      mode: 'onChange',
      resolver: yupResolver(validationSchemaUpdateAddress),
      defaultValues: validationSchemaUpdateAddress.getDefault(),
    });

  // handle update address
  const onSubmitUpdateAddress = async (data: FormValues) => {
    try {
      setLoading1(true);
      const response = await updateSenderAddress(currentId, {
        addressLine: '',
        addressDefault: data.isCheckedDefault ? 1 : 2,
        cityId: data.cityId,
        districtId: data.districtId,
        fullName: data.userName,
        mobile: data.phoneNumber,
        wardsId: data.wardsId,
        specificAddress: data.receiveAddress,
      });
      if (response.success) {
        setActiveStep(STEP_1);
        getListAddressSender('');
      }
      setNotification({
        message: t('message.updateAddressSuccess'),
        severity: 'success',
      });
    } catch (error) {
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        message: t(message),
        severity: 'error',
      });
    } finally {
      setLoading1(false);
    }
  };

  // set address defaults
  const handleSetDefaultAddress = (index: number) => {
    if (listAdressSender[index].addressDefault === 1) {
      return;
    }
    User.setAddressDefault({
      userAddressId: listAdressSender[index].id,
      isDefault: 2,
    })
      .then(() => {
        setListAddressSender((prev) => {
          prev.forEach((address) => {
            address.addressDefault = 2;
          });
          prev[index].addressDefault = 1;
          return [...prev];
        });
        setNotification({
          message: t('message.setDefaultAddressSuccess'),
          severity: 'success',
        });
      })
      .catch((error) => {
        const message = getMessageError(error) || 'message.systemError';
        setNotification({
          message: t(message),
          severity: 'error',
        });
      });
  };

  // search info sender
  const handleSearchInfoSender = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchKey(e.target.value);
  };

  // delete address sender
  const handleDeleteAddress = (id: number) => async () => {
    try {
      await deleteSenderAddress(id);
      getListAddressSender('');
      setNotification({
        message: t('message.removeAddressSuccess'),
        severity: 'success',
      });
    } catch (error) {
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        message: t(message),
        severity: 'error',
      });
    }
  };

  // create address
  const handleCreateAddress = () => {
    route.push('/profile/info-sender/create');
  };

  // close update address
  const handleCloseUpdateAddress = () => {
    setActiveStep(STEP_1);
  };

  // handle change sender address
  const handleChangeSenderAddress = (id: number) => async () => {
    const values = listAdressSender.find((item) => item.id === id);
    if (!values) return;
    setCurrentId(values.id);
    const {
      fullName,
      mobile,
      specificAddress,
      city,
      cityId,
      districtId,
      wardsId,
    } = values;
    const response1 = await getCity(city.country);
    const response2 = await getDistrict(cityId);
    const response3 = await getWards(districtId);
    if (response1.data && response2.data && response3.data) {
      setListCitys(response1.data || []);
      setListDistricts(response2.data || []);
      setListWards(response3.data || []);
      reset({
        userName: fullName,
        phoneNumber: mobile,
        receiveAddress: specificAddress,
        countryId: city.country === 0 ? 1 : 2,
        cityId: cityId,
        districtId: districtId,
        wardsId: wardsId,
      });
    }

    setActiveStep(STEP_2);
  };

  useEffect(() => {
    const [countryId, cityId] = watch(['countryId', 'cityId']);
    if (countryId && cityId) trigger('cityId');
  }, [watch, trigger]);

  const handleSelectedCountry = async (value: number | null) => {
    if (value === null && !value) {
      setValue('cityId', null);
      setValue('districtId', null);
      setValue('wardsId', null);
      setListCitys([]);
      setListDistricts([]);
      setListWards([]);
      return;
    }
    setValue('cityId', null);
    setValue('districtId', null);
    setValue('wardsId', null);
    setListCitys([]);
    setListDistricts([]);
    setListWards([]);
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
    if (!value && value === null) {
      setValue('districtId', null);
      setValue('wardsId', null);
      setListDistricts([]);
      setListWards([]);
      return;
    }
    setValue('districtId', null);
    setValue('wardsId', null);
    setListDistricts([]);
    setListWards([]);
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
  }, [watch, trigger]);

  const handleSelectedDistrict = async (value: number | null) => {
    if (!value && value === null) {
      setValue('wardsId', null);
      setListWards([]);
      return;
    }
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
          {activeStep === STEP_1 && (
            <Fragment>
              <FormGroup sx={{ mb: 4, mt: 2 }}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      value={searchKey}
                      onChange={handleSearchInfoSender}
                      placeholder="Tìm kiếm thông tin người gửi ..."
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button
                      variant="outlined"
                      startIcon={<AddCircleOutlineIcon />}
                      onClick={handleCreateAddress}
                    >
                      Thêm người gửi
                    </Button>
                  </Grid>
                </Grid>
              </FormGroup>
              {loading ? (
                <LoadingScreen />
              ) : listAdressSender ? (
                <Box>
                  {listAdressSender.map((item, index) => {
                    return (
                      <Box sx={{ my: 6 }} key={index}>
                        <CardWrap
                          title={
                            <Box sx={{ display: 'flex' }}>
                              <HomeIcon />
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 'bold', ml: 2 }}
                              >
                                {' '}
                                {item.fullName}
                              </Typography>
                            </Box>
                          }
                          extra={
                            <Box sx={{ display: 'flex' }}>
                              <Tooltip title="Chỉnh sửa" arrow>
                                <IconButton>
                                  <BorderColorIcon
                                    onClick={handleChangeSenderAddress(item.id)}
                                  />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Xóa" arrow>
                                <IconButton
                                  onClick={handleDeleteAddress(item.id)}
                                  sx={{ color: 'primary.main', ml: 1 }}
                                >
                                  <DeleteForeverIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          }
                          footer={
                            <Stack
                              alignItems="center"
                              direction="row"
                              paddingRight={2}
                            >
                              <Checkbox
                                id={`addressDefault${index}`}
                                onChange={() => handleSetDefaultAddress(index)}
                                checked={
                                  item.addressDefault === 1 ? true : false
                                }
                              />
                              <Typography
                                component="label"
                                htmlFor={`addressDefault${index}`}
                              >
                                Đặt làm mặc định
                              </Typography>
                            </Stack>
                          }
                        >
                          <Box sx={{ display: 'flex', mb: 2 }}>
                            <LocalPhoneIcon />
                            <Typography sx={{ ml: 2 }}>
                              {item.mobile}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex' }}>
                            <PlaceIcon />
                            <Typography sx={{ ml: 2 }}>
                              {item.specificAddress +
                                ' - ' +
                                item.wards.name +
                                ' - ' +
                                item.district.name +
                                ' - ' +
                                item.city.name}
                            </Typography>
                          </Box>
                        </CardWrap>
                      </Box>
                    );
                  })}
                </Box>
              ) : (
                <NoResult
                  imageWidth={100}
                  imageHeight={100}
                  message={'Thông tin người gửi không tồn tại'}
                />
              )}
            </Fragment>
          )}
          {activeStep === STEP_2 && (
            <CardWrap
              title="Chỉnh sửa địa chỉ lấy hàng"
              extra={
                <IconButton onClick={handleCloseUpdateAddress}>
                  <CloseIcon />
                </IconButton>
              }
            >
              <Form noValidate onSubmit={handleSubmit(onSubmitUpdateAddress)}>
                <FormGroup sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={3}>
                      <FormLabel
                        name="userName"
                        title="Họ và tên"
                        required
                        gutterBottom
                      />
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                      <ControllerTextField
                        name="userName"
                        control={control}
                        placeholder="Vui lòng nhập tên"
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
                <FormGroup sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={3}>
                      <FormLabel
                        name="phoneNumber"
                        title="Số điện thoại"
                        required
                        gutterBottom
                      />
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                      <ControllerTextField
                        name="phoneNumber"
                        control={control}
                        placeholder="Vui lòng nhập số điện thoại"
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
                <FormGroup sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={3}>
                      <FormLabel
                        name="reciveAddress"
                        title="Địa chỉ"
                        required
                        gutterBottom
                      />
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                      <ControllerTextField
                        name="receiveAddress"
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
                    </Grid>
                  </Grid>
                </FormGroup>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 3,
                    mb: 2,
                  }}
                >
                  <LoadingButton
                    loading={loading1}
                    size="small"
                    variant="outlined"
                    type="submit"
                  >
                    Chỉnh sửa
                  </LoadingButton>
                </Box>
              </Form>
            </CardWrap>
          )}
        </Container>
      </UserProfileLayout>
    </Page>
  );
};

export default SetupInfoSender;
