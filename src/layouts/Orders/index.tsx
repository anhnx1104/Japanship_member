import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import type { ReactNode } from 'react';
import NavTabsOrder from './TabsNav';
import Header from 'layouts/Header';

interface OrderLayoutProps {
  children: ReactNode;
}

const OrderLayout = (props: OrderLayoutProps) => {
  const { children } = props;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          mt: { xs: 6, sm: 8 },
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        }}
      >
        <Box sx={{ p: 3, pb: 0 }}>
          <NavTabsOrder />
          <Divider variant="fullWidth" />
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default OrderLayout;
