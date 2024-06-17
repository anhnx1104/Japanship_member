import Container from '@mui/material/Container';
import Box from '@mui/system/Box';
import Page from 'components/Page';
import HomeLayout from 'layouts/Home';
import { useLayoutEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import banner from 'services/banner';
import type { BannerType } from 'types/banner';
import ButtonStatus from 'components/Home/ButtonStatus';
import SearchOrder from 'components/Home/SearchOrder';
import ServiceJanpanShip from 'components/Home/ServiceJanpanShip';
import Banner from 'components/Banner';
import SplashScreen from 'components/SplashScreen';

interface Props {
  activeBanners: BannerType[];
}

const Home: NextPage<Props> = (props: Props) => {
  // const { activeBanners = [] } = props;
  const [status, setStatus] = useState<string>('order');
  const [loading, setLoading] = useState<boolean>(false);
  const [activeBanners, setActiveBanners] = useState<BannerType[]>([]);
  const { t } = useTranslation();

  const handleChangeStatus = (status: string) => {
    setStatus(status);
  };

  useLayoutEffect(() => {
    setLoading(true);
    banner
      .getActiveBanner()
      .then(({ data }) => {
        setActiveBanners(data || []);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <HomeLayout>
      <Page title={t('title.home')}>
        <Box sx={{ pt: { xs: 8, sm: 16 } }}>
          <Banner banners={activeBanners} />
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <ButtonStatus
              title="Tra cứu"
              active={status === 'order'}
              onClickStatus={handleChangeStatus}
            />
            <ButtonStatus
              title="Dịch vụ"
              active={status === 'service'}
              onClickStatus={handleChangeStatus}
            />
          </Box>
          <Container
            disableGutters
            maxWidth="lg"
            sx={{
              backgroundColor: 'background.paper',
              boxShadow: '1px 1px 2px #ccc,-1px -1px 2px #ccc',
              minHeight: 350,
            }}
          >
            {status === 'order' ? <SearchOrder /> : <ServiceJanpanShip />}
          </Container>
        </Box>
      </Page>
    </HomeLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { data: activeBanners } = await banner.getActiveBanner().catch(() => {
//     return { data: [] };
//   });

//   return {
//     props: {
//       activeBanners: JSON.parse(JSON.stringify(activeBanners)),
//     },
//   };
// };

export default Home;
