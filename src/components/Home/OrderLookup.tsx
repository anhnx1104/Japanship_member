import { yupResolver } from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Order from 'services/order';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CardWrap from 'components/CardWrap';
import Form from 'components/Form/Form';
import ControllerTextField from 'components/Form/ControllerTextField';
import getMessageError from 'utils/controlMessage';
import useNotification from 'hooks/useNotification';
import Regexs from 'utils/Regexs';
import { ListSearchOrder } from 'types/order';
import StepperOrder from 'components/StepperOrder';

interface FormValue {
  billCode: string;
}

const validationSchema = yup.object().shape({
  billCode: yup
    .string()
    .strict(true)
    .required('Vui lòng nhập mã vận đơn')
    .matches(Regexs.notContainSpace, 'không được để khoảng trắng')
    .default(''),
});

const OrderLookup = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const setNotification = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [isNoResult, setIsNoResult] = useState<boolean>(false);
  const [resultsSearchOrder, setResultsSearchOrder] = useState<any>([]);

  const { control, handleSubmit } = useForm<FormValue>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = async (data: FormValue) => {
    const { billCode } = data;

    setLoading(true);
    setIsNoResult(false);

    await Order.searchOrderBillCode(billCode)
      .then((result) => {
        console.log('>>', result?.data?.length);
        setResultsSearchOrder(result.data || []);
        if (!result?.data?.length) {
          setIsNoResult(true);
        }
      })
      .catch((error) => {
        console.log('>>>error', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Mã vận đơn
      </Typography>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ py: 2.5, width: { xs: '100%', sm: '70%' } }}>
          <ControllerTextField
            name="billCode"
            control={control}
            type="text"
            placeholder={t(
              'Nhập mã vận đơn, tra cứu nhiều vận đơn bằng thêm dấu phẩy'
            )}
            InputProps={{
              inputProps: {
                sx: {
                  py: { xs: 1.5 },
                },
              },
              sx: {
                fontSize: theme.typography.body2.fontSize,
              },
            }}
          />
        </Box>
        <LoadingButton
          loading={loading}
          size="large"
          loadingPosition="start"
          startIcon={<SearchIcon />}
          type="submit"
        >
          Tra Cứu
        </LoadingButton>
      </Form>

      <Box sx={{ mt: 3 }}>
        {isNoResult && (
          <Typography align="center">
            Không có dữ liệu cho đơn hàng này
          </Typography>
        )}
        {resultsSearchOrder.map((result: any, i: number) => {
          const {
            productName,
            senderName,
            receiverName,
            estimatedWeight,
            statusStr,
            orderStatusId,
            createdAt,
            confirmAt,
            jpExportDate,
            shippingCompleteDate,
            shippingDate,
            vnExportDate,
            receiverAddress,
          } = result;
          return (
            <Box
              key={i}
              sx={{ ...(resultsSearchOrder.length > 1 && { mb: 3 }) }}
            >
              <CardWrap
                title={`Thông tin vận đơn: ${
                  productName + ' - ' + receiverAddress
                }`}
              >
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      borderRight: { xs: 'none', md: '1px solid' },
                      pr: { xs: 0, md: 4 },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pb: 1.5,
                      }}
                    >
                      <Typography>Người gửi:</Typography>
                      <Typography sx={{ fontWeight: '600' }}>
                        {senderName}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pb: 1.5,
                      }}
                    >
                      <Typography>Người nhận:</Typography>
                      <Typography sx={{ fontWeight: '600' }}>
                        {receiverName}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ pl: { xs: 0, md: 4 } }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pb: 1.5,
                      }}
                    >
                      <Typography>Trọng lượng:</Typography>
                      <Typography sx={{ fontWeight: '600' }}>
                        {estimatedWeight}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pb: 1.5,
                      }}
                    >
                      <Typography>Trạng thái đơn hàng: </Typography>
                      <Typography
                        sx={{ fontWeight: '600', color: 'primary.main' }}
                      >
                        {statusStr}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 5 }}>
                  <StepperOrder
                    orderStatusId={orderStatusId || 0}
                    createdAt={createdAt || ''}
                    confirmAt={confirmAt || ''}
                    vnExportDate={vnExportDate || ''}
                    shippingDate={shippingDate || ''}
                    shippingCompleteDate={shippingCompleteDate || ''}
                    jpExportDate={jpExportDate || ''}
                  />
                </Box>
              </CardWrap>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default OrderLookup;
