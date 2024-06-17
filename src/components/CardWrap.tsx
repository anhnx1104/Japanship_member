import type { ReactNode, FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  title: ReactNode | string;
  extra?: ReactNode | string;
  children: ReactNode | string;
  footer?: ReactNode | string;
}

const CardWrap: FC<Props> = (props) => {
  const { title, children, extra, footer } = props;
  return (
    <Box
      sx={{
        height: '100%',
        boxShadow: '0px 1px 2px 1px #D9D9D9',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Typography
          color="secondary.contrastText"
          sx={{
            bgcolor: 'secondary.main',
            px: 2,
            py: 1.5,
            fontWeight: 'bold',
            boxShadow: '1px 1px 2px #ccc,-1px -1px 2px #ccc',
            flexGrow: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          color="secondary.contrastText"
          sx={{
            bgcolor: 'secondary.main',
            px: 2,
            py: 1.5,
            fontWeight: 'bold',
            boxShadow: '1px 1px 2px #ccc,-1px -1px 2px #ccc',
          }}
        >
          {extra}
        </Typography>
      </Box>
      <Box
        sx={{
          px: 3,
          py: 1.5,
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          borderTop: footer ? '1px solid #989BA5' : '',
        }}
      >
        {footer}
      </Box>
    </Box>
  );
};

export default CardWrap;
