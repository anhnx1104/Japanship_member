import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import TypographyWrap from 'components/TypographyWrap';
import { Fragment } from 'react';
import { version } from 'utils/config';
import RouteLink from 'components/RouteLink';
import { TERM_OF_SERVICE } from 'constant/route-path';

const Footer = () => {
  const theme = useTheme();
  const mediaMinMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        backgroundColor: 'vShip.footer.background',
        mt: 5,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={1}>
          <Grid
            container
            item
            xs={12}
            s465={6}
            md={3}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: 'common.white',
              }}
            >
              JAPAN SHIP
            </Typography>
          </Grid>
          {mediaMinMd ? (
            <Fragment>
              <Grid item xs={12} s465={6} md={3}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'bold' }}
                  mb={2.5}
                  color="common.white"
                >
                  Về japan ship
                </Typography>
                <Typography variant="body1" pb={1} color="vShip.footer.color">
                  Giới thiệu
                </Typography>
                <RouteLink
                  href={TERM_OF_SERVICE + '?type=1'}
                  color={'primary.dark'}
                >
                  <Typography variant="body1" pb={1} color="vShip.footer.color">
                    Chính sách bảo mật
                  </Typography>
                </RouteLink>
                <RouteLink href={TERM_OF_SERVICE} color={'primary.dark'}>
                  <Typography variant="body1" pb={1} color="vShip.footer.color">
                    Điều khoản dịch vụ
                  </Typography>
                </RouteLink>
              </Grid>
              <Grid item xs={12} s465={6} md={3}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'bold' }}
                  pb={2.5}
                  color="common.white"
                >
                  Dành cho khách hàng
                </Typography>
                <Typography variant="body1" pb={1} color="vShip.footer.color">
                  Trung tâm hỗ trợ
                </Typography>
                <Typography variant="body1" pb={1} color="vShip.footer.color">
                  Câu hỏi thường gặp
                </Typography>
                <Typography variant="body1" pb={1} color="vShip.footer.color">
                  Hướng dẫn sử dụng dịch vụ
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={12}
                s465={6}
                md={3}
                sx={{
                  justifyContent: 'center',
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold' }}
                    pb={2.5}
                    color="common.white"
                  >
                    Theo dõi chúng tôi trên
                  </Typography>
                  <Typography variant="body1" pb={1} color="vShip.footer.color">
                    Facebook
                  </Typography>
                  <Typography variant="body1" pb={1} color="vShip.footer.color">
                    Instagram
                  </Typography>
                </Box>
              </Grid>
            </Fragment>
          ) : (
            <Grid item xs={12} s465={6}>
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: 'vShip.footer.background',
                    px: 0,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold' }}
                    color="common.white"
                  >
                    Về japan ship
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: 'vShip.footer.background',
                  }}
                >
                  <Typography variant="body1" pb={1} color="vShip.footer.color">
                    Giới thiệu
                  </Typography>
                  <RouteLink
                    href={TERM_OF_SERVICE + '?type=1'}
                    color={'primary.dark'}
                  >
                    <Typography
                      variant="body1"
                      pb={1}
                      color="vShip.footer.color"
                    >
                      Chính sách bảo mật
                    </Typography>
                  </RouteLink>
                  <RouteLink href={TERM_OF_SERVICE} color={'primary.dark'}>
                    <Typography
                      variant="body1"
                      pb={1}
                      color="vShip.footer.color"
                    >
                      Điều khoản dịch vụ
                    </Typography>
                  </RouteLink>
                </AccordionDetails>
              </Accordion>
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: 'vShip.footer.background',
                    px: 0,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold' }}
                    color="common.white"
                  >
                    Dành cho khách hàng
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: 'vShip.footer.background',
                  }}
                >
                  <Typography variant="body1" pb={1} color="vShip.footer.color">
                    Trung tâm hỗ trợ
                  </Typography>
                  <Typography variant="body1" pb={1} color="vShip.footer.color">
                    Câu hỏi thường gặp
                  </Typography>
                  <Typography variant="body1" pb={1} color="vShip.footer.color">
                    Hướng dẫn sử dụng dịch vụ
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: 'vShip.footer.background',
                    px: 0,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold' }}
                    color="common.white"
                  >
                    Theo dõi chúng tôi trên
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: 'vShip.footer.background',
                  }}
                >
                  <Typography variant="body1" pb={1} color="vShip.footer.color">
                    facebook
                  </Typography>
                  <Typography variant="body1" pb={1} color="vShip.footer.color">
                    Instagram
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          )}
          <Grid
            item
            container
            xs={12}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <TypographyWrap variant="subtitle1" color="vShip.footer.color">
              <Typography component="span" sx={{ fontWeight: 'bold' }}>
                Trụ sở:{' '}
              </Typography>
              Tòa nhà HL, 82 P. Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội.
            </TypographyWrap>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1" color="vShip.footer.color">
              Version {version}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
