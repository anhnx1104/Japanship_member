import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TableOrder } from 'components/MyOrders';
import UserProfileLayout from 'layouts/UserProfile';
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import useOrders from 'hooks/useOrders';
import { Button, FormGroup, Grid, MenuItem, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import ControllerDatePicker from 'components/Form/ControllerDatePicker';
import FormLabel from 'components/Form/FormLabel';

type Props = {};
type ValueProps = {
  searchText: string;
  purchaseDateFrom: Date | null;
  purchaseDateTo: Date | null;
  deliveryStatus: number | null;
  pageSize: number;
  pageNumber: number;
};

const initialValue = {
  searchText: '',
  purchaseDateFrom: null,
  purchaseDateTo: null,
  deliveryStatus: null,
  pageSize: 10,
  pageNumber: 1,
};

const deliveryId = [
  'Chờ nhập kho Nhật',
  'Đã nhập kho Nhật',
  'Chờ nhập kho Việt',
  'Đã nhập kho Việt',
  'Đã xuất kho Việt',
  'Đã giao thành công',
  'Đã hủy',
  'Đang vận chuyển',
];

const BoughtOrder = (props: Props) => {
  const { t } = useTranslation();
  const { total } = useOrders();
  const [search, setSearch] = useState<ValueProps>(initialValue);

  const { handleSubmit, control, reset } = useForm<ValueProps>({
    defaultValues: initialValue,
  });

  const onSubmit: SubmitHandler<ValueProps> = (data: ValueProps) => {
    setSearch({ ...data, pageNumber: 1 });
  };

  const onHandleClose = () => {
    setSearch({ ...initialValue });
    reset({
      searchText: '',
      purchaseDateFrom: null,
      purchaseDateTo: null,
      deliveryStatus: null,
    });
  };

  useEffect(() => {
    // orders({ ...search }).then();
    // eslint-disable-next-line
  }, [search]);

  return (
    <UserProfileLayout>
      <Container
        maxWidth="md"
        sx={{
          p: 2.5,
          backgroundColor: 'background.paper',
          boxShadow: '1px 1px 3px #ccc,-1px -1px 3px #ccc',
        }}
      >
        <Typography variant={'h5'}>Đơn hàng của tôi</Typography>

        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction={'row'} spacing={2}>
              <Grid item xs={4}>
                <FormGroup>
                  <FormLabel title={'Tìm kiếm đơn hàng'} name={'searchText'} />
                  <Controller
                    name={'searchText'}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ width: '100%' }}
                        placeholder={'Tìm kiếm tên sản phẩm, người bán'}
                        size={'small'}
                        {...field}
                      />
                    )}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <FormGroup>
                  <FormLabel
                    title={'Ngày mua hàng'}
                    name={'purchaseDateFrom'}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <ControllerDatePicker
                        control={control}
                        name={'purchaseDateFrom'}
                        DatePickerProps={{ label: 'Từ' }}
                        TextFieldProps={{ size: 'small' }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <ControllerDatePicker
                        control={control}
                        name={'purchaseDateTo'}
                        DatePickerProps={{ label: 'Đến' }}
                        TextFieldProps={{ size: 'small' }}
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
              </Grid>

              <Grid item xs={2}>
                <FormGroup>
                  <FormLabel title={'Trạng thái'} name={'deliveryStatus'} />
                  <Controller
                    name={'deliveryStatus'}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id={'outlined-select-currency-native'}
                        select
                        defaultValue={'EUR'}
                        {...field}
                        sx={{ width: '100%' }}
                      >
                        {deliveryId.map((item, idx) => (
                          <MenuItem key={idx} value={idx}>
                            {item}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </FormGroup>
              </Grid>
            </Grid>

            <Grid
              mt={2}
              container
              direction={'row'}
              justifyContent={'end'}
              gap={2}
            >
              <Grid item xs={2}>
                <Button
                  type={'button'}
                  onClick={onHandleClose}
                  variant={'outlined'}
                  fullWidth
                >
                  Xóa bộ lọc
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button type={'submit'} fullWidth>
                  Tìm kiếm
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <TableOrder />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 5,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box
            sx={{
              mr: { xs: 0, md: 2 },
              mt: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="body2">
              {total > 0
                ? `${(search.pageNumber - 1) * search.pageSize + 1} - ${
                    total > (search.pageNumber - 1) * search.pageSize + 10
                      ? (search.pageNumber - 1) * search.pageSize + 10
                      : total
                  } ${t('title.outOfTotal')} ${total}`
                : `0 - 0 ${t('title.outOfTotal')} 0`}
            </Typography>
          </Box>
          <Pagination
            count={Math.ceil(total / search.pageSize)}
            showFirstButton
            showLastButton
            onChange={(_, value: number) => {
              setSearch({ ...search, pageNumber: value });
            }}
            page={search.pageNumber}
          />
        </Box>
      </Container>
    </UserProfileLayout>
  );
};

export default BoughtOrder;
