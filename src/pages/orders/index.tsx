import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import ProductTable from 'components/Orders/ProductTable';
import Page from 'components/Page';
// import SplashScreen from 'components/SplashScreen';
import HomeLayout from 'layouts/Home';
import { SyntheticEvent, useEffect } from 'react';
import { useState } from 'react';
import { countStatusOrder } from 'services/order';
import { CountStatus } from 'types/order';

// Tab components
const tabs = [
  {
    label: 'Quản lý đơn hàng',
    value: 'orders',
    component: <ProductTable />,
  },
];

const ProductTab = () => {
  const [value, setValue] = useState<string>('orders');

  const [orders, setOrders] = useState<CountStatus[]>([]);

  const handleChange = (_event: SyntheticEvent, tab: string) => {
    setValue(tab);
  };

  useEffect(() => {
    countStatusOrder()
      .then((response) => {
        const { data } = response;

        setOrders(data || []);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);
  // if (loading) {
  //   return <SplashScreen />;
  // }

  return (
    <HomeLayout>
      <Box
        sx={{
          height: 1,
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          pb: 3,
          mt: 10,
          sm: 6,
          ml: 4,
          mr: 4,
        }}
      >
        <TabContext value={value}>
          <Paper
            sx={{
              display: 'grid',
              gridTemplateRows: 'auto auto 1fr',
              borderRadius: 0,
            }}
          >
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                {tabs.map((tab, i) => (
                  <Tab
                    key={i}
                    label={
                      <Typography
                        variant="subtitle2"
                        sx={{ textTransform: 'none' }}
                      >
                        {tab.label}
                      </Typography>
                    }
                    value={tab.value}
                  />
                ))}
              </Tabs>
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mr: '24px',
                  fontWeight: 'bold',
                }}
              >
                {`Chưa tiếp nhận (${
                  orders[0]?.count ? orders[0]?.count : '0'
                }) >
                 Đã tiếp nhận (${orders[1]?.count ? orders[1]?.count : '0'}) > 
                 Đã xuất kho Nhật (${
                   orders[2]?.count ? orders[2]?.count : '0'
                 }) >
                  Đã xuất kho việt (${
                    orders[3]?.count ? orders[3]?.count : '0'
                  }) > 
                  Đang giao (${orders[4]?.count ? orders[4]?.count : '0'}) > 
                  Giao thành công (${
                    orders[6]?.count ? orders[6]?.count : '0'
                  })`}
              </Typography>
            </Box>
            <Divider />
            {tabs.map((tab, i) => (
              <TabPanel key={i} value={tab.value} sx={{ p: 0 }}>
                <Page title={tab.label}>{tab.component}</Page>
              </TabPanel>
            ))}
          </Paper>
        </TabContext>
      </Box>
    </HomeLayout>
  );
};

export default ProductTab;
