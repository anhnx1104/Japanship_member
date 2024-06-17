import SearchIcon from '@mui/icons-material/Search';
import CurrencyYenTwoToneIcon from '@mui/icons-material/CurrencyYenTwoTone';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import Tab, { tabClasses } from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Typography from '@mui/material/Typography';
import type { ReactElement, ReactNode, SyntheticEvent } from 'react';
import { useState } from 'react';
import OrderLookup from './OrderLookup';
import EstimatFee from './EstimatFee';

interface TabItem {
  label: string;
  value: string;
  icon: ReactElement;
  component: ReactNode;
}

const tabs: TabItem[] = [
  {
    icon: <SearchIcon />,
    label: 'Tra cứu vận đơn',
    value: 'OrderLookup',
    component: <OrderLookup />,
  },
  {
    icon: <CurrencyYenTwoToneIcon />,
    label: 'Ước tính cước phí',
    value: 'EstimatFee',
    component: <EstimatFee />,
  },
];

const SearchOrder = () => {
  const [tab, setTab] = useState<string>('OrderLookup');
  const handleChangeTab = (_event: SyntheticEvent, tab: string) => {
    setTab(tab);
  };
  return (
    <TabContext value={tab}>
      <Tabs
        value={tab}
        onChange={handleChangeTab}
        TabIndicatorProps={{ style: { display: 'none' } }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab, i) => (
          <Tab
            key={i}
            label={
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {tab.label}
              </Typography>
            }
            icon={tab.icon}
            value={tab.value}
            sx={{
              maxWidth: 'none',
              width: '50%',
              bgcolor: 'neutral.100',
              borderBottom: '1px solid #ececec',
              '&.Mui-selected': {
                bgcolor: 'secondary.main',
              },
              [`& .${tabClasses.iconWrapper}`]: {
                color: 'primary.main',
              },
            }}
          />
        ))}
      </Tabs>
      {tabs.map(({ value, component, label }, i) => (
        <TabPanel
          key={value}
          value={value}
          sx={{ p: { xs: 2, sm: 3 }, height: 1 }}
        >
          {component || label}
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default SearchOrder;
