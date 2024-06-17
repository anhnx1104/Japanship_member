import type { ReactElement } from 'react';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { NextLinkComposed } from './RouteLink';

interface NavTabProps {
  value: string;
  label: string;
  icon?: ReactElement;
}

const NavTab = (props: NavTabProps) => {
  const { value, label, icon, ...rest } = props;

  return (
    <Tab
      value={value}
      icon={icon}
      iconPosition="start"
      component={NextLinkComposed}
      to={value}
      label={
        <Typography variant="subtitle2" sx={{ textTransform: 'none' }}>
          {label}
        </Typography>
      }
      sx={{
        minHeight: 64,
        color: 'common.white',
        '&.Mui-selected': {
          bgcolor: 'common.white',
          color: 'primary.main',
        },
      }}
      {...rest}
    />
  );
};

export default NavTab;
