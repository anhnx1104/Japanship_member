import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { NOTIFICATION_TYPE } from 'constant/common';
import useSocketNotification from 'hooks/useSocketNotification';
import UserProfileLayout from 'layouts/UserProfile';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { NotificationType } from 'types/notification';
import DateFns from 'utils/DateFns';
import Notification from 'services/notification';

const NotificationPage = () => {
  const theme = useTheme();
  const down700px = useMediaQuery(theme.breakpoints.down('s700'));
  const router = useRouter();
  const { loadingScreen, notifications, refetch, setUnReadCount, unReadCount } =
    useSocketNotification();

  const SkeletonListTemp = () => {
    const items: ReactNode[] = [];
    for (let i = 0; i < 4; i++) {
      items.push(
        <Stack direction="row" spacing={2} key={i}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center',
              width: 0.95,
            }}
          >
            <Skeleton variant="rectangular" height={80} width={100} />
            <Stack spacing={1} sx={{ width: 1 }}>
              <Skeleton variant="rectangular" height={20} />
              <Skeleton variant="rectangular" height={20} />
            </Stack>
          </Stack>
        </Stack>
      );
    }
    return <Stack spacing={2}>{items}</Stack>;
  };

  const viewDetailNotification = (notification: NotificationType) => () => {
    if (unReadCount > 0) {
      Notification.setViewNotification({
        notificationId: notification.id,
      }).then(() => setUnReadCount((unReadCount) => unReadCount - 1));
      refetch();
    }
    router.push(notification.notificationDetailUrl);
  };

  return (
    <UserProfileLayout>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: 'background.paper',
          p: 2.5,
          boxShadow: '1px 1px 3px #ccc,-1px -1px 3px #ccc',
          minHeight: 505,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'inherit' }}>
            Thông báo của tôi
          </Typography>
        </Box>
        <Divider variant="fullWidth" sx={{ my: 2.5 }} />
        {!loadingScreen ? (
          <Stack spacing={2} direction="column" sx={{ minHeight: 400 }}>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Stack
                  key={notification.id}
                  direction="row"
                  spacing={2}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'vShip.background.gray',
                      cursor: 'pointer',
                    },
                    justifyContent: 'space-between',
                    backgroundColor: notification.isViewed
                      ? 'vShip.background.white'
                      : 'vShip.background.lightOrange',
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      alignItems: 'center',
                      width: { xs: 0.9, s700: 0.6 },
                    }}
                  >
                    {notification.notificationType ===
                    NOTIFICATION_TYPE.COST_NOTIFICATION ? (
                      <AccountBalanceWalletIcon
                        sx={{
                          color: 'vShip.text.lightBlue',
                          width: { xs: 50, sm: 80 },
                          height: { xs: 50, sm: 80 },
                        }}
                      />
                    ) : (
                      <ShoppingCartIcon
                        sx={{
                          color: 'vShip.text.darkOrange',
                          width: { xs: 50, sm: 80 },
                          height: { xs: 50, sm: 80 },
                        }}
                      />
                    )}
                    <Box sx={{ width: 0.9 }}>
                      <Typography
                        variant={down700px ? 'body2' : 'body1'}
                        noWrap
                        onClick={viewDetailNotification(notification)}
                        sx={{
                          fontWeight: 'bold',
                          '&:hover': {
                            color: 'vShip.text.darkOrange',
                          },
                        }}
                      >
                        {notification.content}
                      </Typography>
                      <Typography variant="body2" noWrap>
                        {DateFns.format(
                          new Date(notification.createdAt),
                          'HH:mm dd-MM-yyyy'
                        )}
                      </Typography>
                    </Box>
                  </Stack>
                  {!down700px && (
                    <Box sx={{ mt: '2' }}>
                      <TypographyButton
                        variant="caption"
                        onClick={viewDetailNotification(notification)}
                      >
                        {notification.notificationType ===
                        NOTIFICATION_TYPE.COST_NOTIFICATION
                          ? 'Xem số dư'
                          : 'Xem chi tiết đơn hàng'}
                      </TypographyButton>
                    </Box>
                  )}
                </Stack>
              ))
            ) : (
              <Typography variant="body1" sx={{ margin: 'auto', opacity: 0.5 }}>
                Chưa có thông báo mới
              </Typography>
            )}
          </Stack>
        ) : (
          <SkeletonListTemp />
        )}
      </Container>
    </UserProfileLayout>
  );
};

const TypographyButton = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.vShip.background.white,
  border: '1px solid ',
  borderColor: theme.palette.vShip.border.main,
  cursor: 'pointer',
  padding: '4px 8px',
  margin: '16px',
  lineHeight: 1,
  display: 'block',
  '&:hover': {
    color: theme.palette.vShip.text.darkOrange,
    borderColor: theme.palette.vShip.border.darkOrange,
  },
}));

export default NotificationPage;
