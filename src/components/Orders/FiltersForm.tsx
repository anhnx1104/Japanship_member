import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import ProDateRange from 'components/ProDateTime/ProDateRange';
import ProForm from 'components/ProForm';
import ProFormHiddenInput from 'components/ProForm/ProFormHiddenInput';
import ProFormSelect from 'components/ProForm/ProFormSelect';
import ProFormTextField from 'components/ProForm/ProFormTextField';

import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { FiltersRef } from 'types/refs';
import DateFns from 'utils/DateFns';
import Validation from 'utils/Validation';
import { STATUS } from './utils/constants';
import type { FilterParams } from './utils/filters';

interface FilterValues {
  searchText: string;
  status: number;
  orderSearch: string;
  orderStatusId: number | null;
  dateFrom: Date | null;
  dateTo: Date | null;
}

const schema = Validation.shape({
  orderSearch: Validation.string().optional(),
  orderStatusId: Validation.select(STATUS.orderAll),
  // status: Validation.select(STATUS.ALL),
  // inventory: Validation.select(1),
  dateFrom: Validation.date().optional(),
  dateTo: Validation.date().optional(),
});

interface Props {
  onSearch: (params: Partial<FilterParams>) => void;
  onSubmit: VoidFunction;
  onClear: VoidFunction;
}

// eslint-disable-next-line react/display-name
const FiltersForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { onSearch } = props;
  const { t } = useTranslation();

  const form = useForm<FilterValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleSubmit = (values: FilterValues) => {
    const { dateFrom, dateTo, ...rest } = values;

    onSearch({
      ...rest,
      dateFrom: DateFns.StartOfDayToISOString(dateFrom),
      dateTo: DateFns.EndOfDayToISOString(dateTo),
    });
  };

  const handleReset = () => {
    form.reset(schema.getDefault());
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
    submit: form.handleSubmit(handleSubmit),
  }));

  return (
    <ProForm form={form} onFinish={handleSubmit} PaperProps={{ sx: { p: 2 } }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3} md={2} lg={3}>
          <ProFormTextField
            fullWidth
            name="orderSearch"
            placeholder={t('Nhập tên, SĐT, mã VĐ Japan ship, mã VĐ tại Nhật')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProDateRange label={t('Ngày tạo đơn')} from="dateFrom" to="dateTo" />
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={3}>
          <ProFormSelect
            fullWidth
            name="orderStatusId"
            placeholder={t('Trạng thái đơn hàng')}
            options={[
              { value: 1, label: 'Chưa tiếp nhận' },
              { value: 2, label: 'Đã tiếp nhận' },
              { value: 3, label: 'Đã xuất kho Nhật' },

              { value: 5, label: 'Đã xuất kho Việt' },
              { value: 6, label: 'Đang giao' },
              { value: 7, label: 'Giao thành công' },
              { value: 8, label: 'Đã hủy' },
              { value: 9, label: 'Tất cả' },
            ]}
          />
        </Grid>
      </Grid>

      <ProFormHiddenInput />
    </ProForm>
  );
});

export default FiltersForm;
