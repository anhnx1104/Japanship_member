import MoodIcon from '@mui/icons-material/Mood';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import StoreIcon from '@mui/icons-material/Store';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TypographyWrap from 'components/TypographyWrap';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductDetail } from 'types/product';

interface Props {
  isLoading: boolean;
  productDetail: ProductDetail | null;
}

const SellerInfo = (props: Props) => {
  const { t } = useTranslation();
  const { isLoading, productDetail } = props;

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
            {t('title.sellerInfo')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: { xs: 0, s465: 1 },
            }}
          >
            <StoreIcon sx={{ color: 'vShip.product.main', mr: 1 }} />
            <TypographyWrap
              variant="body2"
              sx={{ color: 'vShip.product.main', fontSize: 11 }}
            >
              {productDetail?.seller?.name}
            </TypographyWrap>
          </Box>
          <Grid
            container
            sx={{
              my: 2,
            }}
          >
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <MoodIcon sx={{ width: 15, height: 15, color: 'success.dark' }} />
              <TypographyWrap variant="body2" sx={{ fontSize: 11 }}>
                {productDetail?.seller?.ratings?.good}
              </TypographyWrap>
            </Grid>
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <SentimentNeutralIcon
                sx={{
                  width: 15,
                  height: 15,
                  color: 'vShip.text.orange',
                }}
              />
              <TypographyWrap variant="body2" sx={{ fontSize: 11 }}>
                {productDetail?.seller?.ratings?.normal}
              </TypographyWrap>
            </Grid>
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <MoodBadIcon
                sx={{ width: 15, height: 15, color: 'error.light' }}
              />
              <TypographyWrap variant="body2" sx={{ fontSize: 11 }}>
                {productDetail?.seller?.ratings?.bad}
              </TypographyWrap>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Skeleton variant="rectangular" height={140} />
      )}
    </Fragment>
  );
};

export default SellerInfo;
