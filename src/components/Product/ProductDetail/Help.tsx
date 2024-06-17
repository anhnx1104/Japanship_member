import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MailIcon from '@mui/icons-material/Mail';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TypographyWrap from 'components/TypographyWrap';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BuyingProcedure from './BuyingProcedure';
import ReturnPolicy from './ReturnPolicy';

interface Props {
  isLoading: boolean;
}

const Help = (props: Props) => {
  const { t } = useTranslation();
  const { isLoading } = props;
  const theme = useTheme();
  const up465 = useMediaQuery(theme.breakpoints.up('s465'));
  const [isOpenBuyingProcedureDialog, setOpenBuyingProcedureDialog] =
    useState<boolean>(false);
  const [isOpenReturnPolicyDialog, setOpenReturnPolicyDialog] =
    useState<boolean>(false);

  const handleOpenOrderProcessDialog = () => {
    setOpenBuyingProcedureDialog(true);
  };

  const handleOpenReturnPolicyDialog = () => {
    setOpenReturnPolicyDialog(true);
  };

  const handleCloseBuyingProcedureDialog = () => {
    setOpenBuyingProcedureDialog(false);
  };

  const handleCloseReturnPolicyDialog = () => {
    setOpenReturnPolicyDialog(false);
  };

  return (
    <Fragment>
      {!isLoading ? (
        <Box
          sx={{
            backgroundColor: 'vShip.product.bg',
            p: { xs: 1, s465: 2 },
            minHeight: 140,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', height: { xs: 37, s465: 1 } }}
          >
            {t('title.help')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MailIcon
              sx={{
                color: 'vShip.product.main',
                mr: { xs: 0.5, sm: 1 },
                width: 20,
              }}
            />
            <Typography variant="body2" sx={{ color: 'vShip.product.main' }}>
              cskh@vship.com
            </Typography>
          </Box>
          <Grid
            container
            sx={{
              my: 1,

              color: 'vShip.text.lightBlue',
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TypographyWrap
                variant="body2"
                onClick={handleOpenOrderProcessDialog}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.5 },
                }}
              >
                {t('title.buyingProcedure')}
              </TypographyWrap>
              {up465 && (
                <KeyboardDoubleArrowRightIcon sx={{ width: 20, height: 20 }} />
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TypographyWrap
                variant="body2"
                sx={{ cursor: 'pointer', '&:hover': { opacity: 0.5 } }}
                onClick={handleOpenReturnPolicyDialog}
              >
                {t('title.returnPolicy')}
              </TypographyWrap>
              {up465 && (
                <KeyboardDoubleArrowRightIcon sx={{ width: 20, height: 20 }} />
              )}
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Skeleton variant="rectangular" height={140} />
      )}
      <BuyingProcedure
        open={isOpenBuyingProcedureDialog}
        handleClose={handleCloseBuyingProcedureDialog}
      />
      <ReturnPolicy
        open={isOpenReturnPolicyDialog}
        handleClose={handleCloseReturnPolicyDialog}
      />
    </Fragment>
  );
};

export default Help;
