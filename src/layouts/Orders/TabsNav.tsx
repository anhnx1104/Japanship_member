import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useLayoutEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import { useRouter } from 'next/router';
import { tabClasses } from '@mui/material/Tab';
import NavTab from 'components/NavTab';
import { CREATE_ORDER_BULK, CREATE_SINGLE_ORDER } from 'constant/route-path';

const NavTabsOrder = () => {
  const { pathname } = useRouter();
  const [tab, setTab] = useState<string>(CREATE_SINGLE_ORDER);

  useLayoutEffect(() => {
    setTab(pathname);
  }, [pathname]);

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
      <NavTab
        label="Tạo đơn lẻ"
        value={CREATE_SINGLE_ORDER}
        icon={<LibraryAddIcon />}
      />
      <NavTab
        label="Tạo đơn excel"
        value={CREATE_ORDER_BULK}
        icon={<LibraryBooksIcon />}
      />
    </Tabs>
  );
};

export default NavTabsOrder;
