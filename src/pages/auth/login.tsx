import { yupResolver } from '@hookform/resolvers/yup';
import LoginIcon from '@mui/icons-material/Login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ControllerCheckbox from 'components/Form/ControllerCheckbox';
import ControllerTextField from 'components/Form/ControllerTextField';
import Form from 'components/Form/Form';
import FormGroup from 'components/Form/FormGroup';
import FormLabel from 'components/Form/FormLabel';
import ImageBackgroundCover from 'components/ImageCover';
import Page from 'components/Page';
import RouteLink from 'components/RouteLink';
import {
  ORDER_PATH,
  PASSWORD_RECOVERY_PATH,
  PRODUCT_DETAIL_PATH,
} from 'constant/route-path';
import withOrdersRoute from 'hocs/withOrdersRoute';
import useAuth from 'hooks/useAuth';
import useNotification from 'hooks/useNotification';
import AuthLayout from 'layouts/Auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { MouseEvent } from 'types/react';
import getMessageError from 'utils/controlMessage';
import LocalStorage from 'utils/LocalStorage';
import wait from 'utils/wait';
import * as yup from 'yup';
import NavbarLoginRegister from './tabNavigation';

export interface FormValueLogin {
  username: string;
  password: string;
  rememberLogin: boolean;
  phoneNumber: string;
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim('schema.trim')
    .required('schema.requiredUsername')
    .default(''),
  password: yup
    .string()
    .trim('schema.trim')
    .required('schema.requiredPassword')
    .default(''),
  rememberLogin: yup.boolean().default(false),
});

const Login = () => {
  const { t } = useTranslation();
  const setNotification = useNotification();
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const { control, handleSubmit } = useForm<FormValueLogin>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSubmit = async (data: FormValueLogin) => {
    try {
      setLoading(true);
      await wait(1000);
      const response = await login({
        ...data,
        phoneNumber: '0961647071',
      });

      if (response.httpStatusCode === 401) {
        setNotification({
          message: t('Tài khoản hoặc mật khẩu chưa chính xác'),
          severity: 'error',
        });
      }
      if (response.httpStatusCode === 200) {
        setNotification({
          message: t('message.loginSuccess'),
          severity: 'success',
        });
        if (LocalStorage.get('last-path') !== PRODUCT_DETAIL_PATH) {
          router.push(ORDER_PATH);
        } else {
          router.push(PRODUCT_DETAIL_PATH + LocalStorage.get('last-product'));
          LocalStorage.remove('last-path');
          LocalStorage.remove('last-product');
        }
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

  const handleToggleShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const handleMouseDownPassword: MouseEvent = (event) => {
    event.preventDefault();
  };

  return (
    <Page title={t('title.login')}>
      <AuthLayout>
        <ImageBackgroundCover src="/static/imgs/background-image-login-register.png">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Grid
              container
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Grid item xs={12} sm={12} md={6}>
                <Container maxWidth="sm" disableGutters={matches}>
                  <NavbarLoginRegister activeSteps={1}>
                    <Box>
                      <Form
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 3 }}
                      >
                        <FormGroup>
                          <FormLabel
                            title={t('label.username')}
                            name="username"
                            gutterBottom
                            required
                          />
                          <ControllerTextField
                            name="username"
                            control={control}
                            type="text"
                            placeholder={t('placeholder.username')}
                            InputProps={{
                              size: matches ? 'small' : 'medium',
                            }}
                          />
                        </FormGroup>
                        <FormGroup>
                          <FormLabel
                            title={t('label.password')}
                            name="password"
                            gutterBottom
                            required
                          />
                          <ControllerTextField
                            name="password"
                            control={control}
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t('placeholder.password')}
                            InputProps={{
                              size: matches ? 'small' : 'medium',
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={handleToggleShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormGroup>
                        <FormGroup>
                          <ControllerCheckbox
                            name="rememberLogin"
                            control={control}
                            label={
                              <Typography variant="body2">
                                {t('title.rememberLogin')}
                              </Typography>
                            }
                          />
                        </FormGroup>
                        <Box sx={{ mt: 2, mb: 2.5 }}>
                          <LoadingButton
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<LoginIcon />}
                            fullWidth
                            size={matches ? 'medium' : 'large'}
                            type="submit"
                          >
                            {t('button.login')}
                          </LoadingButton>
                        </Box>
                      </Form>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mt: 1.25,
                        }}
                      >
                        <RouteLink
                          href={PASSWORD_RECOVERY_PATH}
                          variant="body2"
                        >
                          {t('title.forgotPassword')}
                        </RouteLink>
                      </Box>
                    </Box>
                  </NavbarLoginRegister>
                </Container>
              </Grid>
            </Grid>
          </Box>
        </ImageBackgroundCover>
      </AuthLayout>
    </Page>
  );
};

export default withOrdersRoute(Login);
