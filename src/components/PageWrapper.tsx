import Container from '@mui/material/Container';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

interface Props {
  children: [ReactNode, ReactNode];
}

const PageWrapper = (props: Props) => {
  const { children } = props;

  return (
    <Fragment>
      <Container
        maxWidth="xs"
        sx={{
          height: 1,
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          pb: 3,
        }}
      >
        {children}
      </Container>
    </Fragment>
  );
};

export default PageWrapper;
