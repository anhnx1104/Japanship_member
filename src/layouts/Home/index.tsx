import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Header from 'layouts/Header';
import React from 'react';
import Footer from '../Footer';

interface Props {
  children: React.ReactNode;
  changeStepProfile1?: () => void;
}

const HomeLayout = (props: Props) => {
  const { children, changeStepProfile1 } = props;

  return (
    <HomeLayoutRoot>
      <Header changeStepProfile1={changeStepProfile1} />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </HomeLayoutRoot>
  );
};

const HomeLayoutRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export default HomeLayout;
