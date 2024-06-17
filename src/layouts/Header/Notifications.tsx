import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ButtonBase from '@mui/material/ButtonBase';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Badge, { badgeClasses } from '@mui/material/Badge';
import CircularProgress from '@mui/material/CircularProgress';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { Fragment, useState } from 'react';
import { NOTIFICATION_TYPE } from 'constant/common';
import { NOTIFICATION_PATH } from 'constant/route-path';
import { NotificationType } from 'types/notification';
import type { MouseEvent } from 'types/react';
import useSocketNotification from 'hooks/useSocketNotification';
import { useRouter } from 'next/router';
import Notification from 'services/notification';
import RouteLink from 'components/RouteLink';

const Notifications = () => {
  const router = useRouter();
  const [anchorElNotice, setAnchorElNotice] = useState<HTMLElement | null>(
    null
  );

  const { unReadCount, loadingScreen, notifications, refetch, setUnReadCount } =
    useSocketNotification();

  const handleCloseNoticeMenu = () => {
    setAnchorElNotice(null);
  };

  const handleOpenNoticeMenu: MouseEvent = (event) => {
    setAnchorElNotice(event.currentTarget);
  };

  const setViewNotification = (notification: NotificationType) => () => {
    if (unReadCount > 0) {
      Notification.setViewNotification({
        notificationId: notification.id,
      }).then(() => setUnReadCount((unReadCount) => unReadCount - 1));
      refetch();
    }
    router.push(notification.notificationDetailUrl);
  };

  return (
    <Fragment>
      <ButtonBase
        onClick={handleOpenNoticeMenu}
        sx={{
          px: 3,
        }}
      >
        <Badge
          badgeContent={unReadCount}
          sx={{
            [`& .${badgeClasses.badge}`]: {
              bgcolor: 'common.white',
              color: 'primary.main',
              fontSize: 11,
              padding: '0 4px',
              height: 16,
            },
          }}
        >
          <NotificationsIcon fontSize="small" />
        </Badge>
      </ButtonBase>
      <Menu
        anchorEl={anchorElNotice}
        open={Boolean(anchorElNotice)}
        onClose={handleCloseNoticeMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            width: 350,
            mt: 1,
            maxHeight: 600,
            overflowY: 'auto',
          },
        }}
      >
        <MenuItem component="span">
          <Typography variant="body1">Thông báo của tôi</Typography>
        </MenuItem>
        <Divider />
        {!loadingScreen ? (
          <Box>
            {notifications?.length > 0 ? (
              notifications.slice(0, 5).map((item) => (
                <MenuItem
                  key={item.id}
                  onClick={handleCloseNoticeMenu}
                  component="span"
                  sx={{
                    backgroundColor: item.isViewed
                      ? 'vShip.background.white'
                      : 'vShip.background.lightOrange',
                  }}
                >
                  <Tooltip placement="top" title="Xem chi tiết">
                    <Stack
                      direction="row"
                      spacing={2}
                      onClick={setViewNotification(item)}
                    >
                      {item.notificationType ===
                      NOTIFICATION_TYPE.COST_NOTIFICATION ? (
                        <AccountBalanceWalletIcon
                          sx={{
                            color: 'vShip.text.lightBlue',
                            width: 50,
                            height: 50,
                          }}
                        />
                      ) : (
                        <ShoppingCartIcon
                          sx={{
                            color: 'vShip.text.darkOrange',
                            width: { xs: 50 },
                            height: { xs: 50 },
                          }}
                        />
                      )}
                      <Stack direction="column" sx={{ width: 250 }}>
                        <Typography
                          variant="body1"
                          noWrap
                          sx={{ fontWeight: 'bold' }}
                        >
                          {item.notificationType ===
                          NOTIFICATION_TYPE.COST_NOTIFICATION
                            ? 'Thông báo số dư'
                            : 'Thông báo đơn hàng'}
                        </Typography>
                        <Typography variant="body2" noWrap>
                          {item.content}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Tooltip>
                </MenuItem>
              ))
            ) : (
              <Stack sx={{ minHeight: 100 }}>
                <Typography
                  variant="body2"
                  sx={{ margin: 'auto', opacity: 0.5 }}
                >
                  Chưa có thông báo mới
                </Typography>
              </Stack>
            )}
            <Divider />
            <RouteLink
              href={NOTIFICATION_PATH}
              sx={{
                color: 'primary.main',
                display: 'block',
                textAlign: 'center',
                mt: 1,
              }}
            >
              Xem tất cả
            </RouteLink>
          </Box>
        ) : (
          <Stack sx={{ minHeight: 100, alignItems: 'center' }}>
            <CircularProgress size={25} sx={{ margin: 'auto auto' }} />
          </Stack>
        )}
      </Menu>
    </Fragment>
  );
};

export default Notifications;
