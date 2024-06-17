import { yupResolver } from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import Form from 'components/Form/Form';
import ControllerTextField from 'components/Form/ControllerTextField';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import getMessageError from 'utils/controlMessage';
import useNotification from 'hooks/useNotification';
import { useState } from 'react';
import Regexs from 'utils/Regexs';
import Order from 'services/order';

interface FormValue {
  weight: string;
}

const validationSchema = yup.object().shape({
  weight: yup
    .string()
    .strict(true)
    .required('Vui lòng nhập trọng lượng')
    .matches(Regexs.number, 'Vui lòng nhập số')
    .default(''),
});

const EstimatFee = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [isNoResult, setIsNoResult] = useState<boolean>(false);
  const [resultsSearchOrder, setResultsSearchOrder] = useState<string>(
    'Vui lòng nhập trọng lượng ước tính'
  );

  const { control, handleSubmit } = useForm<FormValue>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = async (data: FormValue) => {
    setIsNoResult(false);
    setLoading(true);

    const { weight } = data;
    await Order.searchCalculateShippingFee(weight)
      .then((result) => {
        console.log('>>', result);
        setResultsSearchOrder(result.data || '');
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
        Trọng lượng ước tính (Gram)
      </Typography>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ py: 2.5, width: { xs: '100%', sm: '70%' } }}>
          <ControllerTextField
            name="weight"
            control={control}
            type="text"
            placeholder={t('Nhập trọng lượng')}
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
        {resultsSearchOrder && (
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            {resultsSearchOrder}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default EstimatFee;
