import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import HomeLayout from 'layouts/Home';
import type { ReactNode } from 'react';
import NavTabsProfile from './NavTabsProfile';

interface Props {
  children: ReactNode;
  changeStepProfile1?: () => void;
}

const UserProfileLayout = (props: Props) => {
  const { children, changeStepProfile1 } = props;

  return (
    <HomeLayout changeStepProfile1={changeStepProfile1}>
      <Container maxWidth="lg" sx={{ mt: 2, pt: { xs: 8, sm: 12 } }}>
        <NavTabsProfile changeStepProfile1={changeStepProfile1} />
        <Divider variant="fullWidth" />
        {children}
      </Container>
    </HomeLayout>
  );
};

export default UserProfileLayout;
