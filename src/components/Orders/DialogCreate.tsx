import type { ReactNode, FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

interface Props {
  title: ReactNode | string;
  extra?: ReactNode | string;
  children: ReactNode | string;
  footer?: ReactNode | string;
}

const CardWrap: FC<Props> = (props) => {
  const { title, extra } = props;
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Typography
          variant="subtitle2"
          color="#aa0a0a"
          sx={{
            px: 2,
            fontWeight: 'bold',
            flexGrow: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            px: 2,
          }}
        >
          {extra}
        </Typography>
      </Box>
      <Divider />
    </Box>
  );
};

export default CardWrap;
