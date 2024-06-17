import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import RouteLink from 'components/RouteLink';
import { LOGIN_PATH, REGISTER_PATH } from 'constant/route-path';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

interface NavbarProps {
  activeSteps?: number;
  children: React.ReactElement;
}

const NavbarLoginRegister = (props: NavbarProps) => {
  const { activeSteps, children } = props;

  const { t } = useTranslation();
  const { pathname } = useRouter();

  return (
    <Paper
      elevation={24}
      sx={{
        mx: { xs: 2 },
        p: { xs: 3, sm: 4 },
        borderRadius: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          textAlign: 'center',
          mb: 3,
        }}
      >
        {activeSteps === 1 && (
          <Fragment>
            <RouteLink
              underline="none"
              href={REGISTER_PATH}
              sx={{ color: 'primary.dark' }}
            >
              <Typography
                sx={{
                  borderBottom:
                    pathname === REGISTER_PATH ? '2px solid #FEC83C' : '',
                  color:
                    pathname !== REGISTER_PATH ? '#8190A7' : 'primary.dark',
                }}
                variant="h6"
              >
                {t('title.register')}
              </Typography>
            </RouteLink>
            <RouteLink
              underline="none"
              href={LOGIN_PATH}
              sx={{ color: 'primary.dark', mx: 4 }}
            >
              <Typography
                sx={{
                  borderBottom:
                    pathname === LOGIN_PATH ? '2px solid #FEC83C' : '',
                  color: pathname !== LOGIN_PATH ? '#8190A7' : 'primary.dark',
                }}
                variant="h6"
              >
                {t('title.login')}
              </Typography>
            </RouteLink>
          </Fragment>
        )}
      </Box>
      {children}
    </Paper>
  );
};

export default NavbarLoginRegister;
