import Page from 'components/Page';
import OrderLayout from 'layouts/Orders';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import PlaceIcon from '@mui/icons-material/Place';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Form from 'components/Form/Form';
import { useForm } from 'react-hook-form';
import FormGroup from 'components/Form/FormGroup';
import FormLabel from 'components/Form/FormLabel';
import ControllerTextField from 'components/Form/ControllerTextField';
import ControllerCheckbox from 'components/Form/ControllerCheckbox';
import RouteLink from 'components/RouteLink';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useNotification from 'hooks/useNotification';
import { FILE_TYPES, UPLOAD_TYPE_IMAGE } from 'constant/common';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, Fragment, useEffect } from 'react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import withPrivateRoute from 'hocs/withPrivateRoute';
import DialogSuccess from 'components/DialogSuccess';
import CardWrap from 'components/CardWrap';
import Users from 'services/users';
import getMessageError from 'utils/controlMessage';
import { AddressSender, ListAddress } from 'types/user';
import AutocompleteSelect from 'components/Form/AutocompleteSelect';
import Regexs from 'utils/Regexs';
import { ShippingType } from 'types/order';
import {
  createSingleOrder,
  getEstimateShippingFee,
  getShippingType,
} from 'services/order';
import ControllerDatePicker from 'components/Form/ControllerDatePicker';
import useDebounce from 'hooks/useDebounce';
import { INFO_SENDER } from 'constant/route-path';
import { FormHelperText } from '@mui/material';
import { getCity, getDistrict, getWards } from 'services/common';
import { City, Districts } from 'types/common';
import { startOfDay } from 'date-fns';
import useAuth from 'hooks/useAuth';

interface FormValue {
  senderInfor: string | null;
  nameReceive: string;
  phoneNumber: string;
  addressDetail: string;
  wardsId: number | null;
  districtId: number | null;
  cityId: number | null;
  japanCode: string | null;
  urlImage: string;
  nameProduct: string;
  estimatedWeight: string;
  estimateShipping: string;
  fileImage: string;
  isCheckedAgree: boolean;
  receiveDate: Date | null;
  [key: string]: any;
}

const DEFAULT_START_DATE = startOfDay(new Date());

const validationSchema = yup.object().shape({
  // senderInfor: yup
  //   .string()
  //   .trim('schema.trim')
  //   .nullable()
  //   .required('Vui lòng chọn địa chỉ người gửi')
  //   .default(''),
  // nameReceive: yup
  //   .string()
  //   .trim('schema.trim')
  //   .required('schema.requiredUsername')
  //   .default(''),
  // phoneNumber: yup
  //   .string()
  //   .trim('schema.trim')
  //   .required('Vui lòng nhập số điện thoại')
  //   .matches(Regexs.phoneNumber, 'schema.validPhone')
  //   .default(''),
  // addressDetail: yup
  //   .string()
  //   .trim('schema.trim')
  //   .required('Nhập địa chỉ chi tiết')
  //   .default(''),
  // cityId: yup.number().nullable().required('Vui lòng chọn Tỉnh/Thành phố'),
  // districtId: yup.number().nullable().required('Vui lòng chọn Quận/Huyện'),
  // wardsId: yup.number().nullable().required('Vui lòng chọn Phường/Xã'),
  // urlImage: yup.string(),
  // japanCode: yup
  //   .string()
  //   .trim('schema.trim')
  //   .nullable()
  //   .strict(true)
  //   .matches(Regexs.notContainSpecialChar, {
  //     message: 'Mã vận đơn không được chứa kí tự đặc biệt',
  //     excludeEmptyString: true,
  //   })
  //   .default(null),
  // fileImage: yup
  //   .string()
  //   .default('')
  //   .when(['japanCode', 'urlImage'], (...values: any[]) => {
  //     const [japanCode, urlImage, schema] = values;
  //     if (!japanCode && !urlImage) {
  //       return schema.required(
  //         'Vui lòng thêm ảnh đính kèm hoặc thêm mới mã vận đơn'
  //       );
  //     }
  //     return schema;
  //   }),
  // nameProduct: yup
  //   .string()
  //   .trim('schema.trim')
  //   .required('Vui lòng nhập tên đơn hàng')
  //   .default(''),
  // estimatedWeight: yup
  //   .string()
  //   .trim('schema.trim')
  //   .matches(Regexs.number, 'Vui lòng nhập số')
  //   .required('Vui lòng nhập trọng lượng')
  //   .default(''),
  // receiveDate: yup
  //   .date()
  //   .nullable()
  //   .min(DEFAULT_START_DATE, 'Thời điểm lấy hàng phải từ ngày hiện tại')
  //   .default(null)
  //   .when('$jPShipTypeId', (jPShipTypeId, schema) => {
  //     if (jPShipTypeId && jPShipTypeId === 4) {
  //       return schema.required('Vui lòng chọn thời điểm nhận hàng');
  //     }
  //     return schema;
  //   }),
  isCheckedAgree: yup
    .boolean()
    .oneOf([true], 'Bạn phải đồng ý điều khoản trước khi tạo đơn')
    .default(false),
});

const CreateSingleOrder = () => {
  const { t } = useTranslation();
  const setNotification = useNotification();
  const { user } = useAuth();

  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [listAddressSender, setListAddressSender] = useState<ListAddress[]>([]);
  const [listCitys, setListCity] = useState<City[]>([]);
  const [listDistricts, setListDistrict] = useState<Districts[]>([]);
  const [listWards, setListWards] = useState<AddressSender[]>([]);
  const [listTypeShipping, setListTypeShipping] = useState<ShippingType[]>([]);

  const [imageURL, setImageURL] = useState<string>('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [jPShipTypeId, setJPShipType] = useState<number>(0);
  const [currentShippingFee, setCurrentShippingFee] = useState<string>('');
  const [jpCode, setJPCode] = useState<string>('');
  const [dataThencreatedSingle, setDataThenCreatedSingle] =
    useState<string>('');

  useEffect(() => {
    Users.searchAddressSenderTest({
      filter: {
        name: '',
      },
      sortByParam: 'string',
      sortOrderBy: 'string',
      pageSize: 1000,
      pageNumber: 0,
    })
      .then((response) => {
        const { data } = response;
        if (data) {
          console.log(data);
          const newData = data.map((item: any) => {
            return {
              id: item.id,
              name:
                item.fullName + ' - ' + item.address + ' - ' + item.phoneNumber,
            };
          });

          setListAddressSender(newData || []);
        }
      })
      .catch((error) => {
        const message = getMessageError(error) || 'message.systemError';
        setNotification({
          message: t(message),
          severity: 'error',
        });
      });
  }, [setNotification, t]);

  useEffect(() => {
    getShippingType()
      .then(({ data }) => {
        if (data) {
          if (!user?.isVip) {
            const changedData = data.slice(0, -1);
            setListTypeShipping(changedData || []);
          } else {
            setListTypeShipping(data || []);
          }
        }
      })
      .catch((error) => {
        const message = getMessageError(error) || 'message.systemError';
        setNotification({
          error: t(message),
        });
      });
  }, [t, setNotification, user?.isVip]);

  // useEffect(() => {
  //   getCity(0)
  //     .then(({ data }) => {
  //       if (data) {
  //         setListCity(data || []);
  //       }
  //     })
  //     .catch((error) => {
  //       const message = getMessageError(error) || 'message.systemError';
  //       setNotification({
  //         error: t(message),
  //       });
  //     });
  // }, [setNotification, t]);

  // get estimate shipping fee
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    trigger,
    register,
    formState: { isSubmitted, errors },
  } = useForm<FormValue>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
    context: { jPShipTypeId, imgFile },
  });

  const japanCode = watch('japanCode');
  useEffect(() => {
    trigger('fileImage');
  }, [trigger, japanCode]);

  const urlImage = watch('urlImage');
  useEffect(() => {
    trigger('fileImage');
  }, [trigger, urlImage]);

  useEffect(() => {
    register('fileImage');
  }, [register]);

  const [estimatedWeight] = watch(['estimatedWeight']);
  const [search] = useDebounce(100, 300);

  // useEffect(() => {
  //   if (!search) return;
  //   if (search) {
  //     getEstimateShippingFee({ weight: Number(search) })
  //       .then(({ data }) => {
  //         if (data) {
  //           setCurrentShippingFee(data);
  //         } else {
  //           setCurrentShippingFee('');
  //         }
  //       })
  //       .catch((error) => {
  //         const message = getMessageError(error) || 'message.systemError';
  //         setNotification({
  //           error: t(message),
  //         });
  //       });
  //   }
  // }, [t, setNotification, search]);

  const onSubmitCreateSingle = async (data: FormValue) => {
    if (!jPShipTypeId) return;
    if (data.japanCode) {
      setJPCode(data.japanCode);
    }
    try {
      let image: string | null = null;
      setLoading(true);
      // if (imgFile) {
      //   const formData = new FormData();
      //   formData.append('inputFile', imgFile as File);
      //   formData.append('fileType', UPLOAD_TYPE_IMAGE);
      //   const { data } = await Users.getAvatarUrl(formData);
      //   if (data?.dataUrl && data?.hostUrl) {
      //     image = data.dataUrl;
      //   }
      // }
      if (user && data) {
        const {
          japanCode,
          nameProduct,
          estimatedWeight,
          wardsId,
          addressDetail,
          cityId,
          districtId,
          nameReceive,
          phoneNumber,
          receiveDate,
          senderInfor,
        } = data;
        console.log('data', data);

        const response = await createSingleOrder({
          senderId: senderInfor,
          jpBillCode: japanCode,
          productName: nameProduct,
          estimatedWeight: Number(estimatedWeight),
          estimatedShippingPrice: Number(currentShippingFee),
          deliveryToJpMethod: jPShipTypeId,
          receiverAddress: {
            orderId: senderInfor,
            fullName: nameReceive,
            phoneNumber: phoneNumber,
            address: addressDetail,
            country: 'string',
            province: '3',
            district: String(districtId),
            ward: String(wardsId),
          },
          pickUpTime: user?.isVip ? receiveDate : '2024-02-26T09:19:13.798Z',
        });

        setDataThenCreatedSingle(response.data);

        setOpenSuccessDialog(true);
      }
    } catch (error) {
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        error: t(message),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCity = async (cityId: number | null) => {
    if (cityId === null && !cityId) {
      setValue('cityId', null);
      setValue('districtId', null);
      setValue('wardsId', null);
      setListDistrict([]);
      setListWards([]);
      return;
    }
    setListDistrict([]);
    setListWards([]);
    setValue('districtId', null);
    setValue('wardsId', null);
    try {
      const { data } = await getDistrict(cityId);
      if (data) {
        setListDistrict(data || []);
      }
    } catch (error) {
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        error: t(message),
      });
    }
  };

  const handleSelectDistrict = async (districtId: number | null) => {
    if (districtId === null && !districtId) {
      setValue('districtId', null);
      setValue('wardsId', null);
      setListWards([]);
      return;
    }
    setListWards([]);
    setValue('wardsId', null);
    try {
      const { data } = await getWards(districtId);
      if (data) {
        setListWards(data || []);
      }
    } catch (error) {
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        error: t(message),
      });
    }
  };

  const handleUploadImgProduct = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files?.length !== 0) {
      const file = event.target.files[0];
      if (!FILE_TYPES.includes(file.type)) {
        setNotification({
          message: t('Ảnh phải có định dạng: .JPEG, .JPG, .PNG'),
          severity: 'error',
        });
        return;
      }

      if (file.size / 1024 / 1024 > 5) {
        setNotification({
          message: t('Dụng lượng file tối đa 5 MB'),
          severity: 'error',
        });
        return;
      }
      setImgFile(file);
      setValue('urlImage', URL.createObjectURL(file as Blob));
      setImageURL(URL.createObjectURL(file as Blob));
    }
  };

  const handleSelectJPShipType = (id: number) => {
    trigger('receiveDate');
    setJPShipType(id);
  };

  const handleClose = () => {
    setOpenSuccessDialog(false);
  };

  const handleReMakeForm = () => {
    setImageURL('');
    setImgFile(null);
    setCurrentShippingFee('');
    setJPShipType(0);
    reset({
      senderInfor: '',
      nameReceive: '',
      phoneNumber: '',
      addressDetail: '',
      cityId: null,
      districtId: null,
      estimatedWeight: '',
      isCheckedAgree: false,
      japanCode: '',
      nameProduct: '',
      wardsId: null,
      receiveDate: null,
    });
    setListDistrict([]);
    setListCity([]);
    setListWards([]);
  };

  return (
    <Page title="Tạo đơn lẻ">
      <OrderLayout>
        <Box sx={{ px: { md: 5, xs: 2 }, py: 2 }}>
          <Form
            noValidate
            sx={{ height: '100%' }}
            onSubmit={handleSubmit(onSubmitCreateSingle)}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={6}>
                <Box
                  sx={{
                    height: '100%',
                  }}
                >
                  <CardWrap
                    title="NGƯỜI GỬI"
                    extra={
                      <RouteLink href={INFO_SENDER} underline="none">
                        <Typography
                          color="secondary.contrastText"
                          sx={{
                            bgcolor: 'secondary.main',
                            fontWeight: 'bold',
                          }}
                        >
                          Cài đặt thông tin người gửi
                        </Typography>
                      </RouteLink>
                    }
                  >
                    <AutocompleteSelect
                      name="senderInfor"
                      control={control}
                      placeholder="Chọn địa chỉ người gửi"
                      options={listAddressSender}
                      selector={(option) => option.name}
                    />
                  </CardWrap>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box
                  sx={{
                    height: '100%',
                  }}
                >
                  <CardWrap title="NGƯỜI NHẬN">
                    <FormGroup>
                      <Grid container>
                        <Grid item xs={12} sm={3} md={3}>
                          <FormLabel
                            title={'Họ tên'}
                            name="nameReceive"
                            gutterBottom
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={9} md={9}>
                          <ControllerTextField
                            name="nameReceive"
                            control={control}
                            type="text"
                            placeholder="Nhập tên người nhận"
                            InputProps={{
                              size: 'small',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>
                    <FormGroup>
                      <Grid container>
                        <Grid item xs={12} sm={3} md={3}>
                          <FormLabel
                            title={'Điện thoại'}
                            name="phoneNumber"
                            gutterBottom
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={9} md={9}>
                          <ControllerTextField
                            name="phoneNumber"
                            control={control}
                            type="text"
                            placeholder="Vui lòng nhập số điện thoại"
                            InputProps={{
                              size: 'small',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>
                    <FormGroup>
                      <Grid container>
                        <Grid item xs={12} sm={3} md={3}>
                          <FormLabel
                            title={'Địa chỉ'}
                            name="addressDetail"
                            gutterBottom
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={9} md={9}>
                          <ControllerTextField
                            name="addressDetail"
                            control={control}
                            type="text"
                            placeholder={'Nhập địa chỉ chi tiết'}
                            InputProps={{
                              size: 'small',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>
                    <FormGroup>
                      <Grid container>
                        <Grid item xs={12} sm={3} md={3}>
                          <PlaceIcon sx={{ color: '#1B3459' }} />
                        </Grid>
                        <Grid item xs={12} sm={9} md={9}>
                          <AutocompleteSelect
                            name="cityId"
                            control={control}
                            placeholder={'Tỉnh/Thành phố'}
                            // options={listCitys}
                            options={[
                              { id: 0, name: 'Hà Nội' },
                              { id: 1, name: 'TP.Hồ Chí Minh' },
                            ]}
                            selector={(option) => option.name}
                            // onChangeSelect={handleSelectCity}
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>
                    <FormGroup>
                      <Grid
                        container
                        spacing={1.5}
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <Grid item xs={12} sm={4.5} md={4.5}>
                          <AutocompleteSelect
                            name="districtId"
                            control={control}
                            placeholder="Quận/Huyện"
                            // options={listDistricts}
                            options={[
                              { id: 0, name: 'Ba Đình' },
                              { id: 1, name: 'Hoàn Kiếm' },
                              { id: 2, name: 'Tây Hồ' },
                              { id: 3, name: 'Long Biên' },
                              { id: 4, name: 'Cầu Giấy' },
                              { id: 5, name: 'Đống Đa' },
                              { id: 6, name: 'Hai Bà Trưng' },
                              { id: 7, name: 'Hoàng Mai' },
                              { id: 8, name: 'Thanh Xuân' },
                              { id: 9, name: 'Sóc Sơn' },
                            ]}
                            selector={(option) => option.name}
                            // onChangeSelect={handleSelectDistrict}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4.5} md={4.5}>
                          <AutocompleteSelect
                            name="wardsId"
                            control={control}
                            placeholder="Phường/Xã"
                            // options={listWards}
                            options={[
                              { id: 0, name: 'test1' },
                              { id: 1, name: 'test2' },
                              { id: 2, name: 'test3' },
                              { id: 3, name: 'test4' },
                              { id: 4, name: 'test5' },
                              { id: 5, name: 'test6' },
                            ]}
                            selector={(option) => option.name}
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>
                  </CardWrap>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={4} sx={{ mt: 0.5 }}>
              <Grid item xs={12} sm={12} md={6}>
                <Box
                  sx={{
                    height: '100%',
                  }}
                >
                  <CardWrap title="THÔNG TIN ĐƠN HÀNG">
                    <FormGroup>
                      <Grid container>
                        <Grid item xs={12} sm={3} md={4}>
                          <FormLabel
                            title="Mã vận đơn tại Nhật"
                            name="japanCode"
                            gutterBottom
                          />
                        </Grid>
                        <Grid item xs={12} sm={9} md={8}>
                          <ControllerTextField
                            name="japanCode"
                            control={control}
                            type="text"
                            placeholder="Nhập mã vận đơn"
                            InputProps={{
                              size: 'small',
                            }}
                            // onChange={handleChangeJPCode}
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>
                    <FormGroup>
                      <Grid container>
                        <Grid item xs={12} sm={3} md={4}>
                          <FormLabel
                            title="Tên hàng hóa"
                            name="nameProduct"
                            gutterBottom
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={9} md={8}>
                          <ControllerTextField
                            name="nameProduct"
                            control={control}
                            type="text"
                            placeholder="Nhập tên đơn hàng"
                            InputProps={{
                              size: 'small',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>
                    <FormGroup>
                      <Grid container>
                        <Grid item xs={12} sm={3} md={4}>
                          <FormLabel
                            title={'Trọng lượng ước tính (kg)'}
                            name="estimatedWeight"
                            gutterBottom
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={9} md={8}>
                          <ControllerTextField
                            name="estimatedWeight"
                            control={control}
                            placeholder={'Nhập trọng lượng ước tính'}
                            InputProps={{
                              size: 'small',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>
                    <FormGroup>
                      <Grid container>
                        <Grid item xs={12} sm={3} md={4}>
                          <FormLabel
                            title={'Giá vận chuyển ước tính'}
                            name="estimateShipping"
                            gutterBottom
                          />
                        </Grid>
                        <Grid sx={{ pl: 1 }} item xs={12} sm={9} md={8}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              px: 2,
                            }}
                          >
                            {search && (
                              <Typography>{`${new Intl.NumberFormat('vn-IN', {
                                maximumFractionDigits: 2,
                              }).format(
                                Number(currentShippingFee)
                              )}`}</Typography>
                            )}
                            <Typography sx={{ ml: 1 }}>VND</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </FormGroup>
                    <FormGroup>
                      <Grid container>
                        <Grid item xs={12} sm={3} md={4}>
                          <FormLabel
                            title="Ảnh đính kèm"
                            name="fileImage"
                            gutterBottom
                          />
                        </Grid>
                        <Grid item xs={12} sm={9} md={8}>
                          <Button
                            component="label"
                            variant="outlined"
                            startIcon={<PhotoCameraIcon />}
                          >
                            {t('button.selectImage')}
                            <input
                              hidden
                              accept="image/*"
                              multiple
                              type="file"
                              name="fileImage"
                              onChange={handleUploadImgProduct}
                            />
                          </Button>
                          {errors.fileImage && (
                            <FormHelperText variant="standard" error>
                              {errors?.fileImage?.message}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid
                          container
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            mt: 2,
                          }}
                        >
                          <Grid item xs={12} sm={9} md={8}>
                            {imageURL && (
                              <Box>
                                <IconButton
                                  onClick={() => {
                                    setImgFile(null);
                                    setImageURL('');
                                    setValue('urlImage', '');
                                  }}
                                >
                                  <CloseIcon />
                                </IconButton>
                                <Avatar
                                  sx={{ width: 150, height: 150 }}
                                  src={imageURL}
                                  variant="rounded"
                                />
                              </Box>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </FormGroup>
                  </CardWrap>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box
                  sx={{
                    height: '100%',
                  }}
                >
                  <CardWrap title="HÌNH THỨC GIAO HÀNG ĐẾN KHO NHẬT">
                    {listTypeShipping.map((data, index) => {
                      return (
                        <Box key={data.id}>
                          <FormGroup>
                            <ControllerCheckbox
                              name={''}
                              control={control}
                              onChangeSelect={() =>
                                handleSelectJPShipType(data.id)
                              }
                              checked={data.id === jPShipTypeId}
                              label={
                                <Typography variant="body2">
                                  {data.value}
                                </Typography>
                              }
                            />
                            {jPShipTypeId === data.id && (
                              <Fragment>
                                <Box sx={{ pl: 3, color: '#2766C8' }}>
                                  <Typography variant="body2">
                                    {data.description}
                                  </Typography>
                                  {user &&
                                    user?.isVip &&
                                    jPShipTypeId === 4 && (
                                      <Box>
                                        <FormGroup>
                                          <Grid container sx={{ mt: 2 }}>
                                            <Grid item xs={12} sm={5} md={5}>
                                              <FormLabel
                                                title={'Thời điểm đến lấy hàng'}
                                                name="receiveDate"
                                                gutterBottom
                                                required
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={7} md={7}>
                                              <ControllerDatePicker
                                                name="receiveDate"
                                                control={control}
                                              />
                                            </Grid>
                                          </Grid>
                                        </FormGroup>
                                      </Box>
                                    )}
                                </Box>
                                <DialogSuccess
                                  nameProduct={jpCode}
                                  description={data.messageGuidel}
                                  openSuccessDialog={openSuccessDialog}
                                  handleClose={handleClose}
                                  href={`/orders/${dataThencreatedSingle}`}
                                />
                              </Fragment>
                            )}
                          </FormGroup>
                        </Box>
                      );
                    })}
                    {!jPShipTypeId && isSubmitted && (
                      <FormHelperText variant="standard" error>
                        Vui lòng chọn hình thức giao hàng
                      </FormHelperText>
                    )}
                  </CardWrap>
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}
              spacing={4}
            >
              <Grid item xs={12} sm={6} md={6}>
                <FormGroup>
                  <ControllerCheckbox
                    name="isCheckedAgree"
                    control={control}
                    label={
                      <Typography variant="body2">
                        Tôi đã đọc và đồng ý với {}
                        <RouteLink
                          href={''}
                          variant="body2"
                          sx={{ fontWeight: 'bold' }}
                        >
                          Điều khoản quy định
                        </RouteLink>
                      </Typography>
                    }
                  />
                </FormGroup>
                <Box sx={{ mt: 1 }}>
                  <LoadingButton size="medium" type="submit" loading={loading}>
                    Gửi đơn
                  </LoadingButton>
                  <Button
                    onClick={handleReMakeForm}
                    variant="outlined"
                    sx={{ ml: 2 }}
                  >
                    Làm mới
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </OrderLayout>
    </Page>
  );
};

export default withPrivateRoute(CreateSingleOrder);
