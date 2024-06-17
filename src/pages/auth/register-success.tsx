import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageBackgroundCover from 'components/ImageCover';
import RouteLink from 'components/RouteLink';
import { LOGIN_PATH } from 'constant/route-path';
import AuthLayout from 'layouts/Auth';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RegisterSuccess = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AuthLayout>
      <ImageBackgroundCover src="/static/imgs/background-image-login-register.png">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 1,
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
              <Container maxWidth="xs" disableGutters={matches}>
                <Paper
                  elevation={24}
                  sx={{
                    m: { xs: 2, md: { mt: 6 } },
                    p: { xs: 4, sm: 5 },
                    borderRadius: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <CheckCircleIcon
                      fontSize="large"
                      sx={{ color: '#0FA958', mb: 3, mt: 2 }}
                    />
                    <Typography sx={{ fontWeight: 'bold' }}>
                      {t('title.registerSuccess')}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <RouteLink href={LOGIN_PATH}>
                      <Button
                        size={matches ? 'small' : 'medium'}
                        sx={{
                          backgroundColor: 'primary.main',
                          borderRadius: 1.5,
                          padding: '10px 20px',
                          color: 'primary.contrastText',
                          width: '100%',
                        }}
                      >
                        {t('button.loginNow')}
                      </Button>
                    </RouteLink>
                  </Box>
                </Paper>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </ImageBackgroundCover>
    </AuthLayout>
  );
};

export default RegisterSuccess;
