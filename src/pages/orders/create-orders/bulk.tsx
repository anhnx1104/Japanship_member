import * as yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Page from 'components/Page';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import OrderLayout from 'layouts/Orders';
import { useForm, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import ProForm from 'components/ProForm';
import ProFormContent from 'components/ProForm/ProFormContent';
import ProFormTextField from 'components/ProForm/ProFormTextField';
import ProFormAutocomplete from 'components/ProForm/ProFormAutocomplete';
import ProTableScrollbar from 'components/ProTable/ProTableScrollbar';
import TableCellBulk from 'components/TableCellBulk';
import ProFormDate from 'components/ProForm/ProFormDate';
import ProFormImg from 'components/ProForm/ProFormImg';
import ControllerCheckbox from 'components/Form/ControllerCheckbox';
import RouteLink from 'components/RouteLink';
import ActionButton from 'components/ProButton/ActionButton';
import { startOfDay } from 'date-fns';
import Validation from 'utils/Validation';
import getMessageError from 'utils/controlMessage';
import Regexs from 'utils/Regexs';
import TypedObject from 'utils/TypedObject';
import { useEffect, useState } from 'react';
import { createOrderBulk, getShippingType } from 'services/order';
import { searchSender, SenderParams } from 'services/sender';
import { getCity, getDistrict, getWards } from 'services/common';
import type { City, Districts, ImageURLS, Wards } from 'types/common';
import type { ShippingType } from 'types/order';
import withPrivateRoute from 'hocs/withPrivateRoute';
import { ORDER_PATH, TERM_OF_SERVICE } from 'constant/route-path';
import useDialog from 'hooks/useDialog';
import { ADDRESS_SENDER_STATUS, COUNTRIES } from 'constant/common';
import useNotification from 'hooks/useNotification';

interface FormValues {
  userAddressId: number | null;
  checkAll: boolean;
  isCheckedTerm: boolean;
  createSingleOrderRequestList: {
    isChecked: boolean;
    japanCode: string;
    receiverName: string;
    receiverMobile: string;
    specificAddress: string;
    cityId: number | null;
    districtId: number | null;
    wardsId: number | null;
    jpShippingTypeId: number | null;
    goodsName: string;
    imageOrderURL?: ImageURLS[] | null;
    pickUpTime: Date | null;
    districts: Districts[];
    wards: Wards[];
  }[];
}
const DEFAULT_START_DATE = startOfDay(new Date());

const DEFAULT_VALUE = {
  isChecked: false,
  japanCode: '',
  receiverName: '',
  receiverMobile: '',
  specificAddress: '',
  cityId: null,
  districtId: null,
  wardsId: null,
  goodsName: '',
  imageOrderURL: [],
  jpShippingTypeId: null,
  pickUpTime: null,
  districts: [],
  wards: [],
};

const validationSchema = Validation.shape({
  userAddressId: Validation.option(),
  isCheckedTerm: yup
    .boolean()
    .oneOf([true], 'schema.acceptTermCreateOrder')
    .default(true),
  checkAll: yup.boolean().default(false),
  createSingleOrderRequestList: Validation.array()
    .of(
      Validation.shape({
        isChecked: yup.boolean(),
        japanCode: yup.string().trim('schema.trim'),
        receiverName: Validation.string(),
        receiverMobile: Validation.pattern(Regexs.phone, 'schema.validPhone'),
        specificAddress: Validation.string(),
        cityId: Validation.option(),
        districtId: Validation.option(),
        wardsId: Validation.option(),
        goodsName: Validation.string(),
        imageOrderURL: Validation.array()
          .of(
            Validation.shape({
              hostUrl: yup.string(),
              dataUrl: yup.string(),
            })
          )
          .when(['japanCode'], (japanCode, schema) => {
            if (!japanCode) {
              return schema.min(1, 'schema.required');
            }
            return schema;
          }),
        jpShippingTypeId: Validation.option(),
        pickUpTime: yup
          .date()
          .nullable()
          .typeError('schema.validDate')
          .min(DEFAULT_START_DATE, 'Thời điểm lấy hàng phải từ ngày hiện tại')
          .when(['jpShippingTypeId'], (jpShippingTypeId, schema) => {
            if (jpShippingTypeId && jpShippingTypeId === 4) {
              return schema.required('schema.required');
            }

            return schema;
          }),
      })
    )
    .default(() => [DEFAULT_VALUE]),
});

const Bulk = () => {
  const { t } = useTranslation();
  const dialog = useDialog();
  const router = useRouter();
  const setNotification = useNotification();

  const [loading, setLoading] = useState<boolean>(false);
  const [isIndeterminate, setIndeterminate] = useState<boolean>(false);
  const [listTypeShipping, setListTypeShipping] = useState<ShippingType[]>([]);
  const [countries, setCountries] = useState<City[]>([]);
  const [listInfoSender, setListInfoSender] = useState<SenderParams[]>([]);

  const form = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
    mode: 'onChange',
  });

  const { fields, append, insert, remove, update, replace } = useFieldArray({
    name: 'createSingleOrderRequestList',
    control: form.control,
  });

  const handleChangeUser = (id: number | null) => {
    if (typeof id !== 'number') return;

    const sender = listInfoSender.find((infoSender) => infoSender.id === id);

    const countryId = sender?.city?.country;

    if (!countryId && typeof countryId !== 'number') return;
    getCity(countryId)
      .then(({ data }) => {
        setCountries(data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeCity = (countryId: number | null, key: number | null) => {
    if (!countryId || typeof key !== 'number') return;
    getDistrict(countryId)
      .then(({ data }) => {
        const defaultValue = form.getValues().createSingleOrderRequestList[key];
        update(key, { ...defaultValue, districts: data || [] });
        form.setValue(`createSingleOrderRequestList.${key}.districtId`, null);
        form.setValue(`createSingleOrderRequestList.${key}.wardsId`, null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeDistrict = (
    districtId: number | null,
    key: number | null
  ) => {
    if (!districtId || typeof key !== 'number') return;
    getWards(districtId)
      .then(({ data }) => {
        const defaultValue = form.getValues().createSingleOrderRequestList[key];
        update(key, { ...defaultValue, wards: data || [] });
        form.setValue(`createSingleOrderRequestList.${key}.wardsId`, null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteRow = (id: number) => () => {
    dialog({
      supportingText: 'Bạn có chắc chắn muốn xóa đơn hàng này không?',
      onConfirm: () => {
        remove(id);
      },
    });
  };

  const handleDeleteOrder = () => {
    dialog({
      supportingText: 'Bạn có chắc chắn muốn xóa tất cả đơn hàng này không?',
      onConfirm: () => {
        replace([]);
        form.trigger();
      },
    });
  };

  const handleChangejpShippingType = (
    id: number | null,
    key: number | null
  ) => {
    if (typeof key !== 'number') return;
    form.trigger(`createSingleOrderRequestList.${key}.pickUpTime`);
  };

  const handleChangeCheckAll = (checked: boolean) => {
    setIndeterminate(false);
    for (let i = 0; i < fields.length; i++) {
      form.setValue(`createSingleOrderRequestList.${i}.isChecked`, checked);
    }
  };

  const handleChangeCheckRow = () => {
    const values = form.getValues().createSingleOrderRequestList;

    const countChecked = values.filter((value) => value.isChecked).length;

    form.setValue('checkAll', countChecked === values.length);
    setIndeterminate(countChecked > 0 && countChecked < values.length);
  };

  const handleDuplicateRow = (i: number) => () => {
    insert(i + 1, form.getValues().createSingleOrderRequestList[i]);
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const { createSingleOrderRequestList, userAddressId } = data;
    if (!userAddressId) return;
    if (userAddressId) {
      const newListOrder = createSingleOrderRequestList.map((item) => {
        let attachedImageUrl: string | null;
        const { imageOrderURL, wards, districts, ...rest } = item;
        attachedImageUrl = imageOrderURL?.length
          ? imageOrderURL[0].dataUrl
          : null;
        return {
          userAddressId,
          attachedImageUrl,
          estimateWeight: null,
          estimateShippingFee: null,
          ...rest,
        };
      });
      try {
        await createOrderBulk({ createSingleOrderRequestList: newListOrder });
        router.push(ORDER_PATH);
        setNotification({
          message: t('Thêm đơn hàng thành công'),
          severity: 'success',
        });
      } catch (error) {
        const message = getMessageError(error) || 'message.systemError';
        setNotification({
          error: t(message),
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    searchSender()
      .then(({ data }) => {
        setListInfoSender(data || []);
      })
      .catch((error) => {
        const message = getMessageError(error) || 'message.systemError';
        setNotification({
          error: t(message),
        });
      });
  }, [t, setNotification]);

  useEffect(() => {
    getShippingType()
      .then(({ data }) => {
        setListTypeShipping(data || []);
      })
      .catch((error) => {
        const message = getMessageError(error) || 'message.systemError';
        setNotification({
          error: t(message),
        });
      });
  }, [t, setNotification]);

  useEffect(() => {
    if (!listInfoSender.length) return;
    const addressDefault = listInfoSender.find(
      (sender) => sender.addressDefault === ADDRESS_SENDER_STATUS.DEFAULT
    );
    form.setValue('userAddressId', addressDefault?.id || null);

    const countryId = addressDefault?.city?.country;
    if (!countryId && typeof countryId !== 'number') return;
    getCity(countryId)
      .then(({ data }) => {
        setCountries(data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [listInfoSender, form]);

  return (
    <Page title={t('Tạo đơn excel')}>
      <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
        <OrderLayout>
          <ProForm<FormValues> form={form} grid onFinish={onSubmit}>
            <Box sx={{ px: { md: 2 } }}>
              <Typography pb={1} sx={{ fontWeight: 'bold' }}>
                Thông tin người gửi
              </Typography>
              <Box sx={{ width: { xs: '100%', sm: '70%' } }}>
                <ProFormAutocomplete
                  name="userAddressId"
                  placeholder="Thông tin người gửi"
                  options={listInfoSender}
                  onSelect={handleChangeUser}
                  renderLabel={(infoSender) =>
                    `${infoSender.fullName} - ${infoSender.city.name}, ${
                      COUNTRIES[infoSender.city.country]
                    } - ${infoSender.mobile}`
                  }
                  renderValue={(infoSender) => infoSender.id}
                />
              </Box>
            </Box>
            <ProFormContent sx={{ px: { md: 2 } }}>
              <TableContainer
                sx={{
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                }}
              >
                <ProTableScrollbar style={{ maxHeight: '60vh' }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCellBulk
                          header
                          stickyLeft
                          sx={{ zIndex: (theme) => theme.zIndex.appBar + 2 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ControllerCheckbox
                              label=""
                              name="checkAll"
                              control={form.control}
                              indeterminate={isIndeterminate}
                              onChangeSelect={handleChangeCheckAll}
                            />
                            STT
                          </Box>
                        </TableCellBulk>
                        <TableCellBulk align="center" header>
                          Mã vận đơn tại Nhật
                        </TableCellBulk>
                        <TableCellBulk align="center" header>
                          Tên người nhận
                        </TableCellBulk>
                        <TableCellBulk align="center" header>
                          Số điện thoại
                        </TableCellBulk>
                        <TableCellBulk
                          align="center"
                          sx={{ minWidth: 400 }}
                          header
                        >
                          Địa chỉ chi tiết
                        </TableCellBulk>
                        <TableCellBulk align="center" header>
                          Tên hàng hóa
                        </TableCellBulk>
                        <TableCellBulk
                          align="center"
                          header
                          sx={{ minWidth: 270 }}
                        >
                          Hình thức giao hàng
                        </TableCellBulk>
                        <TableCellBulk align="center" header>
                          Thời điểm lấy hàng
                        </TableCellBulk>
                        <TableCellBulk
                          align="center"
                          stickyRight
                          header
                          sx={{ zIndex: (theme) => theme.zIndex.appBar + 2 }}
                        >
                          Thao tác
                        </TableCellBulk>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fields.map((field, i) => {
                        return (
                          <TableRow key={field.id}>
                            <TableCellBulk stickyLeft>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  pb: 3,
                                }}
                              >
                                <ControllerCheckbox
                                  label=""
                                  name={`createSingleOrderRequestList.${i}.isChecked`}
                                  control={form.control}
                                  onChangeSelect={handleChangeCheckRow}
                                />
                                <Typography>{i + 1}</Typography>
                              </Box>
                              <ProFormImg
                                name={`createSingleOrderRequestList.${i}.imageOrderURL`}
                                maxFiles={1}
                                width={50}
                                height={50}
                                multiple={false}
                              />
                            </TableCellBulk>
                            <TableCellBulk align="center">
                              <Box>
                                <ProFormTextField
                                  name={`createSingleOrderRequestList.${i}.japanCode`}
                                  variant="standard"
                                  onChangeValue={() => {
                                    form.trigger(
                                      `createSingleOrderRequestList.${i}.imageOrderURL`
                                    );
                                  }}
                                />
                              </Box>
                            </TableCellBulk>
                            <TableCellBulk align="center">
                              <ProFormTextField
                                name={`createSingleOrderRequestList.${i}.receiverName`}
                                variant="standard"
                              />
                            </TableCellBulk>
                            <TableCellBulk align="center">
                              <ProFormTextField
                                name={`createSingleOrderRequestList.${i}.receiverMobile`}
                                variant="standard"
                              />
                            </TableCellBulk>
                            <TableCellBulk align="center">
                              <ProFormTextField
                                name={`createSingleOrderRequestList.${i}.specificAddress`}
                                variant="standard"
                                fullWidth
                              />
                              <Box py={1}>
                                <ProFormAutocomplete
                                  name={`createSingleOrderRequestList.${i}.cityId`}
                                  placeholder={t('Tỉnh/thành phố')}
                                  options={countries}
                                  onSelect={handleChangeCity}
                                  rowKey={i}
                                  actionText="Hãy chọn thông tin người gửi trước"
                                  renderLabel={(country) => country.name}
                                  renderValue={(country) => country.id}
                                />
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                }}
                              >
                                <Box sx={{ flexGrow: 1, pr: 0.5 }}>
                                  <ProFormAutocomplete
                                    name={`createSingleOrderRequestList.${i}.districtId`}
                                    placeholder={t('Quận/Huyện')}
                                    options={field.districts}
                                    renderLabel={(district) => district.name}
                                    renderValue={(district) => district.id}
                                    actionText="Hãy chọn thành phố Trước"
                                    rowKey={i}
                                    onSelect={handleChangeDistrict}
                                  />
                                </Box>
                                <Box sx={{ flexGrow: 1, pl: 0.5 }}>
                                  <ProFormAutocomplete
                                    name={`createSingleOrderRequestList.${i}.wardsId`}
                                    placeholder={t('Phường/Xã')}
                                    options={field.wards}
                                    renderLabel={(ward) => ward.name}
                                    renderValue={(ward) => ward.id}
                                    actionText="Hãy chọn thành quận/huyện Trước"
                                  />
                                </Box>
                              </Box>
                            </TableCellBulk>
                            <TableCellBulk align="center">
                              <ProFormTextField
                                name={`createSingleOrderRequestList.${i}.goodsName`}
                                variant="standard"
                              />
                            </TableCellBulk>
                            <TableCellBulk align="center">
                              <ProFormAutocomplete
                                name={`createSingleOrderRequestList.${i}.jpShippingTypeId`}
                                placeholder=""
                                options={listTypeShipping}
                                rowKey={i}
                                onSelect={handleChangejpShippingType}
                                renderLabel={(ward) => ward.name}
                                renderValue={(ward) => ward.id}
                              />
                            </TableCellBulk>
                            <TableCellBulk align="center">
                              <ProFormDate
                                type="end"
                                name={`createSingleOrderRequestList.${i}.pickUpTime`}
                                DatePickerProps={{
                                  disablePast: true,
                                }}
                                // onSelect={handleChangepickUpTime}
                              />
                            </TableCellBulk>
                            <TableCellBulk align="center" stickyRight>
                              <Tooltip title="Nhân bản">
                                <IconButton
                                  color="default"
                                  onClick={handleDuplicateRow(i)}
                                >
                                  <ContentCopyIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Xóa">
                                <IconButton
                                  color="default"
                                  onClick={handleDeleteRow(i)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCellBulk>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </ProTableScrollbar>
              </TableContainer>
            </ProFormContent>
            <Box sx={{ mx: '-16px' }}>
              <Divider sx={{ borderWidth: 1 }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: { xs: 'column', md: 'row' },
                  pt: 2,
                  px: 2,
                }}
              >
                <ControllerCheckbox
                  name="isCheckedTerm"
                  control={form.control}
                  label={
                    <Typography variant="body2">
                      {t('message.termMes1')}
                      <RouteLink href={TERM_OF_SERVICE} variant="body2">
                        {' '}
                        {t('message.termMes2')}
                      </RouteLink>
                    </Typography>
                  }
                />
                <Stack>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => append(DEFAULT_VALUE)}
                  >
                    Thêm đơn hàng
                  </Button>
                  <Button
                    onClick={handleDeleteOrder}
                    startIcon={<DeleteIcon />}
                    disabled={!fields.length}
                  >
                    Xóa đơn hàng
                  </Button>
                  <ActionButton
                    actionType="save"
                    loading={loading}
                    type="submit"
                    disabled={
                      TypedObject.isExist(form.formState.errors) ||
                      !fields.length
                    }
                  >
                    {t(' Gửi đơn')}
                  </ActionButton>
                </Stack>
              </Box>
            </Box>
          </ProForm>
        </OrderLayout>
      </Box>
    </Page>
  );
};

export default withPrivateRoute(Bulk);
