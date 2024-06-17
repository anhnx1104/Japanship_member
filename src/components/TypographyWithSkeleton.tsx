import Skeleton from '@mui/material/Skeleton';
import Typography, { TypographyProps } from '@mui/material/Typography';
import React, { ReactNode } from 'react';

interface Props {
  isLoadingScreen: boolean;
  children: ReactNode;
  typographyProps?: TypographyProps;
}

const TypographyWithSkeleton = (props: Props) => {
  const { isLoadingScreen, children, typographyProps } = props;
  return (
    <Typography sx={{ width: 1 }} {...typographyProps}>
      {isLoadingScreen ? <Skeleton variant="rectangular" /> : <>{children}</>}
    </Typography>
  );
};

export default TypographyWithSkeleton;
