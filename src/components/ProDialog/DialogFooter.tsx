import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { StackProps } from '@mui/material/Stack';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import type { FCC } from 'types/react';

interface Props {
  BoxProps?: BoxProps;
  StackProps?: StackProps;
}

const DialogFooter: FCC<Props> = (props) => {
  const { children, BoxProps, StackProps } = props;
  return (
    <Wrapper {...BoxProps}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        {...StackProps}
      >
        {children}
      </Stack>
    </Wrapper>
  );
};

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2),
  borderTop: '1px solid',
  borderColor: theme.palette.divider,
}));

export default DialogFooter;
