import Box from '@mui/material/Box';
import type { FCC } from 'types/react';
import Header from '../Header';

const AuthLayout: FCC = (props) => {
  const { children } = props;

  return (
    <Box sx={{ bgcolor: 'background.paper', flexGrow: 1 }}>
      <Header />
      <Box
        sx={{
          pt: { xs: 8, sm: 16 },
          height: 1,
          width: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
