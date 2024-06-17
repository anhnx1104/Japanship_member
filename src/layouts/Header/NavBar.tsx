import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import RouteLink from 'components/RouteLink';
import { HEADER_HEIGHT } from 'constant/layout';
const NavBar = () => {
  return (
    <Toolbar
      disableGutters
      sx={{
        backgroundColor: 'background.paper',
        minHeight: HEADER_HEIGHT,
        maxHeight: HEADER_HEIGHT,
        display: { xs: 'none', sm: 'flex' },
      }}
    >
      <Container maxWidth="lg">
        <RouteLink href="/" sx={{ color: 'primary.dark' }}>
          Trang chủ
        </RouteLink>
        <RouteLink href="/pay" sx={{ color: 'primary.dark', mx: 4 }}>
          Dịch vụ
        </RouteLink>
        <RouteLink href="/customerSupport" sx={{ color: 'primary.dark' }}>
          Hỗ trợ khách hàng
        </RouteLink>
      </Container>
    </Toolbar>
  );
};

export default NavBar;
