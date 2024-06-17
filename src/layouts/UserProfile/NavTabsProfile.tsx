import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Tabs from '@mui/material/Tabs';
import { tabClasses } from '@mui/material/Tab';
import { useRouter } from 'next/router';
import type { FC, ReactElement } from 'react';
import { useLayoutEffect, useMemo, useState } from 'react';
import {
  PROFILE_PATH,
  CHANGE_PASSWORD_PROFILE_PATH,
  NOTIFICATION_PATH,
  INFO_SENDER,
} from 'constant/route-path';
import NavTab from 'components/NavTab';

interface TabItem {
  label: string;
  value: string;
  icon: ReactElement;
  changeStepProfile1?: () => void;
}

interface Props {
  changeStepProfile1?: () => void;
}

const NavTabsProfile: FC<Props> = (props) => {
  const { changeStepProfile1 } = props;
  const { pathname } = useRouter();
  const [tab, setTab] = useState<string>(PROFILE_PATH);
  const tabs: TabItem[] = useMemo(
    () => [
      {
        label: 'Thông tin tài khoản',
        value: PROFILE_PATH,
        icon: <PersonIcon />,
      },
      {
        label: 'Đổi mật khẩu',
        value: CHANGE_PASSWORD_PROFILE_PATH,
        icon: <LockIcon />,
      },
      {
        label: 'Cài đặt thông tin người gửi',
        value: INFO_SENDER,
        icon: <ManageAccountsIcon />,
      },
      {
        label: 'Thông báo',
        value: NOTIFICATION_PATH,
        icon: <NotificationsIcon />,
      },
    ],
    []
  );

  useLayoutEffect(() => {
    tabs.forEach((tab) => {
      if (tab.value !== '/' && pathname.includes(tab.value)) {
        setTab(tab.value);
      }
    });
  }, [pathname, tabs]);

  return (
    <Tabs
      value={tab}
      TabIndicatorProps={{ style: { display: 'none' } }}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        minHeight: 'auto',
        [`& .${tabClasses.root}.${tabClasses.selected} `]: {
          color: 'primary.dark',
          bgcolor: '#C5C5C5',
        },
        [`& .${tabClasses.root}`]: {
          color: 'primary.dark',
        },
        [`& .${tabClasses.iconWrapper}`]: {
          color: 'primary.main',
        },
      }}
    >
      {tabs.map((tab, i) => (
        <NavTab key={i} changeStepProfile1={changeStepProfile1} {...tab} />
      ))}
    </Tabs>
  );
};

export default NavTabsProfile;
