import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoginIcon from '@mui/icons-material/Login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ControllerCheckbox from 'components/Form/ControllerCheckbox';
import ControllerTextField from 'components/Form/ControllerTextField';
import Form from 'components/Form/Form';
import FormGroup from 'components/Form/FormGroup';
import FormLabel from 'components/Form/FormLabel';
import RouteLink from 'components/RouteLink';
import Page from 'components/Page';
import useAuth from 'hooks/useAuth';
import useNotification from 'hooks/useNotification';
import AuthLayout from 'layouts/Auth';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { MouseEvent } from 'types/react';
import Regexs from 'utils/Regexs';
import wait from 'utils/wait';
import * as yup from 'yup';
import getMessageError from 'utils/controlMessage';
import { TERM_OF_SERVICE } from 'constant/route-path';
import { STEP_1, STEP_2 } from 'constant/common';
import OTPInput from 'components/OTPInput';
import ImageBackgroundCover from 'components/ImageCover';
import NavbarLoginRegister from './tabNavigation';
import withPublicRoute from 'hocs/withPublicRoute';

interface FormValue {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
  passwordConfirm: string;
  isCheckedTerm: boolean;
}

const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .max(50, 'schema.textMax50')
    .trim('schema.trim')
    .required('schema.requiredFullname')
    .default(''),
  mobile: yup
    .string()
    .trim('schema.trim')
    .required('schema.requiredPhone')
    .matches(Regexs.phoneNumber, 'schema.validPhone')
    .default(''),
  email: yup
    .string()
    .trim('schema.trim')
    .max(50, 'schema.textMax50')
    .matches(Regexs.optionalEmail, 'schema.validEmail')
    .default(''),
  password: yup
    .string()
    .max(50, 'schema.passwordMax')
    .trim('schema.trim')
    .required('schema.requiredPassword')
    .default(''),
  passwordConfirm: yup
    .string()
    .trim('schema.trim')
    .required('schema.requiredPasswordConfirm')
    .default('')
    .test({
      name: 'passwordConfirm',
      message: 'schema.passwordDoesNotMatch',
      test: (value, context) => {
        const { password } = context.parent;
        return value === password;
      },
    }),
  isCheckedTerm: yup
    .boolean()
    .oneOf([true], 'schema.acceptTerm')
    .default(false),
});

const Register = () => {
  const { t } = useTranslation();
  const setNotification = useNotification();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    register,
    confirmAccount,
    activeAccount,
    sendOtpAgain,
    checkEmailPhoneExist,
  } = useAuth();
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [idActiveAccount, setIdAccount] = useState<any>();
  const [time, setTime] = useState<number>(60);
  const [registerData, setRegisterData] = useState<FormValue>({
    email: '',
    fullName: '',
    mobile: '',
    password: '',
    passwordConfirm: '',
    isCheckedTerm: false,
  });

  useEffect(() => {
    const timer =
      time > 0 &&
      setInterval(() => {
        setTime(() => time - 1);
      }, 1000);

    return () => clearInterval(timer as NodeJS.Timer);
  }, [time]);

  const { control, handleSubmit, watch, trigger, reset } = useForm<FormValue>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const [password, passwordConfirm] = watch(['password', 'passwordConfirm']);

  useEffect(() => {
    if (password && passwordConfirm) {
      trigger('passwordConfirm');
    }
  }, [password, trigger, passwordConfirm]);

  const onSubmit = async (data: FormValue) => {
    try {
      setLoading(true);
      setRegisterData(data);
      await wait(1000);

      const { email, fullName, mobile, passwordConfirm, password } = data;
      // if (!email) {
      //   if (!fullName || !mobile || !passwordConfirm || !password) return;
      //   await register({
      //     email: email || null,
      //     fullName,
      //     mobile,
      //     password,
      //     passwordConfirm,
      //   });
      //   router.push('/auth/register-success');
      //   setNotification({
      //     message: t('message.registerSuccess'),
      //     severity: 'success',
      //   });
      // } else {checkEmailPhoneExist

      // }
      // await checkEmailPhoneExist({
      //   email: email,
      //   mobile: mobile,
      // });
      await register({
        email: email || null,
        fullName,
        mobile,
        password,
        passwordConfirm,
      }).then((reset) => {
        setIdAccount(reset.data);
      });

      // await setNotification({
      //   message: t('message.registerSuccess2'),
      //   severity: 'success',
      // });
      reset({
        email: '',
        fullName: '',
        isCheckedTerm: false,
        mobile: '',
        password: '',
        passwordConfirm: '',
      });
      setActiveStep(2);
      setLoading(false);
    } catch (error) {
      console.log('>>', error);
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        message: t(message),
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAccount = async () => {
    try {
      setLoading(true);
      await wait(1000);
      // await confirmAccount({ email: registerData.email, otp: otp.join('') });
      // await register(registerData);
      await activeAccount({
        userId: idActiveAccount?.id || '',
        otp: '000000',
      });
      setNotification({
        message: t('message.confirmRegisterAccountSuccess'),
        severity: 'success',
      });
      router.push('/auth/register-success');
    } catch (error) {
      setOtp(Array(6).fill(''));
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        message: t(message),
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtpAgain = async () => {
    try {
      if (time === 0) {
        setTime(60);
        await wait(1000);
        await sendOtpAgain({ email: registerData.email });
        setNotification({
          message: t('message.sendMailOtpSuccess'),
          severity: 'success',
        });
      }
    } catch (error) {
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        message: t(message),
        severity: 'error',
      });
    }
  };

  const handleSendToOtpCodeEmail = async () => {
    try {
      setTime(60);
      // await sendOtpAgain({ email: registerData.email });
      setNotification({
        message: t('message.sendMailOtpSuccess'),
        severity: 'success',
      });
      setActiveStep(3);
    } catch (error) {
      const message = getMessageError(error) || 'message.systemError';
      setNotification({
        message: t(message),
        severity: 'error',
      });
    }
  };

  const handleToggleShowNewPassword = () => {
    setShowNewPassword((state) => !state);
  };

  const handleToggleShowConfirmPassword = () => {
    setShowConfirmPassword((state) => !state);
  };

  const handleMouseDownPassword: MouseEvent = (event) => {
    event.preventDefault();
  };

  const changeStep1 = () => {
    setActiveStep(STEP_1);
  };

  const changeStep2 = () => {
    setActiveStep(STEP_2);
  };

  return (
    <Page title="Đăng ký">
      <AuthLayout>
        <ImageBackgroundCover src="/static/imgs/background-image-login-register.png">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              py: 2,
            }}
          >
            <Grid
              container
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Grid item xs={12} sm={12} md={6}>
                <Container maxWidth="sm" disableGutters={matches}>
                  <NavbarLoginRegister activeSteps={activeStep}>
                    <Box>
                      {activeStep === 1 && (
                        <Fragment>
                          <Form
                            autoComplete="off"
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{ mt: 2 }}
                          >
                            <FormGroup>
                              <FormLabel
                                title={t('label.fullName')}
                                name="fullName"
                                gutterBottom
                                required
                              />
                              <ControllerTextField
                                name="fullName"
                                control={control}
                                placeholder={t('placeholder.fullName')}
                                InputProps={{
                                  size: matches ? 'small' : 'medium',
                                }}
                              />
                            </FormGroup>

                            <FormGroup>
                              <FormLabel
                                title={t('label.email')}
                                name="email"
                                gutterBottom
                                required
                              />
                              <ControllerTextField
                                name="email"
                                control={control}
                                placeholder={t('placeholder.email')}
                                InputProps={{
                                  size: matches ? 'small' : 'medium',
                                }}
                              />
                            </FormGroup>
                            <FormGroup>
                              <FormLabel
                                title={t('label.phone')}
                                name="mobile"
                                gutterBottom
                                required
                              />
                              <ControllerTextField
                                name="mobile"
                                control={control}
                                placeholder={t('placeholder.phone')}
                                InputProps={{
                                  size: matches ? 'small' : 'medium',
                                }}
                              />
                            </FormGroup>
                            <FormGroup>
                              <FormLabel
                                title={t('label.password')}
                                name="password"
                                required
                              />
                              <ControllerTextField
                                name="password"
                                control={control}
                                margin="normal"
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder={t('placeholder.password')}
                                InputProps={{
                                  size: matches ? 'small' : 'medium',
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={handleToggleShowNewPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                      >
                                        {showNewPassword ? (
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
                              <FormLabel
                                title={t('label.confirmPassword')}
                                name="passwordConfirm"
                                required
                              />
                              <ControllerTextField
                                name="passwordConfirm"
                                control={control}
                                margin="normal"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder={t('placeholder.confirmPassword')}
                                InputProps={{
                                  size: matches ? 'small' : 'medium',
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={
                                          handleToggleShowConfirmPassword
                                        }
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                      >
                                        {showConfirmPassword ? (
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
                                name="isCheckedTerm"
                                control={control}
                                label={
                                  <Typography variant="body2">
                                    {t('message.termMes1')}
                                    <RouteLink
                                      href={TERM_OF_SERVICE}
                                      variant="body2"
                                    >
                                      {' '}
                                      {t('message.termMes2')}
                                    </RouteLink>
                                    {t('message.termMes3')}
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
                                {t('button.register')}
                              </LoadingButton>
                            </Box>
                          </Form>
                        </Fragment>
                      )}
                      {activeStep === 2 && (
                        <Box>
                          <Typography
                            align="left"
                            variant="h6"
                            sx={{
                              color: 'vShip.link.main',
                              cursor: 'pointer',
                              fontWeight: 'inherit',
                              mb: 3,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                            onClick={changeStep1}
                          >
                            <ArrowBackIosIcon />
                            <Typography component="span">
                              {t('button.back')}
                            </Typography>
                          </Typography>
                          <Typography
                            variant="h4"
                            alignItems="start"
                            sx={{ mt: 3, mb: 1 }}
                          >
                            Xác thực
                          </Typography>
                          <Typography sx={{ mb: 4 }}>
                            Gửi mã xác thực qua Email{' '}
                            <Typography sx={{ color: 'primary.main' }}>
                              {`<${registerData.email}>`}
                            </Typography>
                          </Typography>
                          <Box sx={{ mt: 4, mb: 4 }}>
                            <LoadingButton
                              loading={loading}
                              onClick={handleSendToOtpCodeEmail}
                              fullWidth
                              size="large"
                            >
                              Gửi mã
                            </LoadingButton>
                          </Box>
                        </Box>
                      )}
                      {activeStep === 3 && (
                        <Fragment>
                          <Box>
                            <Typography
                              variant="h4"
                              alignItems="start"
                              sx={{ mt: 3, mb: 2 }}
                            >
                              {t('title.comfirmOtpCode')}
                            </Typography>
                            <Typography sx={{ mb: 4 }}>
                              Mã xác thực đã được gửi tới email của quý khách
                              hàng. Nhập mã xác thực quý khách hàng nhận được
                              dưới đây.
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 3 }}>
                            <Box
                              sx={{
                                display: 'flex',
                                align: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <OTPInput values={otp} setValues={setOtp} />
                            </Box>
                            <Typography
                              sx={{
                                width: 300,
                                margin: '26px auto',
                                textAlign: 'center',
                                color: '#8190A7',
                              }}
                              variant="subtitle2"
                            >
                              Bạn chưa nhận được mã ? Vui lòng nhấn nhận lại mã
                              xác thực sau ({time})s{''}
                            </Typography>
                            {time === 0 && (
                              <Typography
                                variant="subtitle1"
                                align="center"
                                sx={{
                                  mt: 3,
                                  mb: 3,
                                  color: 'vShip.link.main',
                                  cursor: 'pointer',
                                }}
                                onClick={handleSendOtpAgain}
                              >
                                {t('title.sendOtpAgain')}
                              </Typography>
                            )}
                            <Box sx={{ mt: 4, mb: 4 }}>
                              <LoadingButton
                                loading={loading}
                                onClick={handleConfirmAccount}
                                fullWidth
                                size="large"
                                disabled={!otp.join('') ? true : false}
                              >
                                {t('button.next')}
                              </LoadingButton>
                            </Box>
                            <Typography
                              align="left"
                              variant="h6"
                              sx={{
                                color: 'vShip.link.main',
                                cursor: 'pointer',
                                fontWeight: 'inherit',
                                mb: 3,
                                display: 'flex',
                                alignItems: 'center',
                              }}
                              onClick={changeStep2}
                            >
                              <ArrowBackIosIcon />
                              <Typography component="span">
                                {t('button.back')}
                              </Typography>
                            </Typography>
                          </Box>
                        </Fragment>
                      )}
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

export default withPublicRoute(Register);
