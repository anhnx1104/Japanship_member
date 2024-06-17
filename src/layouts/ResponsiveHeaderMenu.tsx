import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import KeyIcon from '@mui/icons-material/Key';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import RouteLink, { NextLinkComposed } from 'components/RouteLink';
import {
  CHANGE_PASSWORD_PROFILE_PATH,
  CREATE_SINGLE_ORDER,
  INFO_SENDER,
  NOTIFICATION_PATH,
  ORDER_PATH,
  PROFILE_PATH,
} from 'constant/route-path';
import useAuth from 'hooks/useAuth';
import useSocketNotification from 'hooks/useSocketNotification';
import { Fragment } from 'react';
import { MouseEvent } from 'types/react';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
interface Props {
  responsiveMatch: boolean;
  handleOpenMenu: MouseEvent<HTMLButtonElement>;
  handleCloseMenu: () => void;
  anchor: HTMLElement | null;
  handleChangeToProfilePage: () => void;
  handleOpenLogoutPopup: () => void;
}

const ResponsiveMatchHeaderMenu = (props: Props) => {
  const {
    responsiveMatch,
    anchor,
    handleChangeToProfilePage,
    handleCloseMenu,
    handleOpenLogoutPopup,
    handleOpenMenu,
  } = props;

  const { isAuthenticated } = useAuth();
  const { unReadCount } = useSocketNotification();

  return (
    <Fragment>
      {!responsiveMatch && (
        <Fragment>
          {isAuthenticated && (
            <Fragment>
              <RouteLink
                href={NOTIFICATION_PATH}
                sx={{ color: 'common.white', px: 1 }}
              >
                <Badge badgeContent={unReadCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </RouteLink>
            </Fragment>
          )}
        </Fragment>
      )}
      <IconButton onClick={handleOpenMenu} color="inherit">
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { mt: 1, display: { md: 'none' }, width: 200 } }}
        MenuListProps={{ dense: true }}
      >
        {isAuthenticated ? (
          <Box>
            <MenuItem
              onClick={handleChangeToProfilePage}
              component={NextLinkComposed}
              to={PROFILE_PATH}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>Tài khoản của tôi</ListItemText>
            </MenuItem>

            <MenuItem
              onClick={handleChangeToProfilePage}
              component={NextLinkComposed}
              to={INFO_SENDER}
            >
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText>Thông tin người gửi</ListItemText>
            </MenuItem>

            <MenuItem
              onClick={handleChangeToProfilePage}
              component={NextLinkComposed}
              to={ORDER_PATH}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText>Đơn hàng</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={handleChangeToProfilePage}
              component={NextLinkComposed}
              to={CREATE_SINGLE_ORDER}
            >
              <ListItemIcon>
                <LibraryAddIcon />
              </ListItemIcon>
              <ListItemText>Tạo đơn hàng</ListItemText>
            </MenuItem>

            <MenuItem
              onClick={handleChangeToProfilePage}
              component={NextLinkComposed}
              to={CHANGE_PASSWORD_PROFILE_PATH}
            >
              <ListItemIcon>
                <KeyIcon />
              </ListItemIcon>
              <ListItemText>Đổi mật khẩu</ListItemText>
            </MenuItem>

            <MenuItem
              onClick={handleOpenLogoutPopup}
              component={NextLinkComposed}
              to="#"
            >
              <ListItemIcon>
                <LogoutIcon sx={{ mr: 2.5 }} />
              </ListItemIcon>
              <ListItemText>Đăng xuất</ListItemText>
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem
              onClick={handleCloseMenu}
              component={NextLinkComposed}
              to={NOTIFICATION_PATH}
            >
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText>Thông báo</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={handleCloseMenu}
              component={NextLinkComposed}
              to="/auth/login"
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText>Đăng nhập</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={handleCloseMenu}
              component={NextLinkComposed}
              to="/auth/register"
            >
              <ListItemIcon>
                <HowToRegIcon />
              </ListItemIcon>
              <ListItemText>Đăng ký</ListItemText>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </Fragment>
  );
};

export default ResponsiveMatchHeaderMenu;
