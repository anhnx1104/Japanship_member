import Container from '@mui/material/Container';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Image from 'components/Image';

interface NoResultProps {
  message?: ReactNode;
  imageWidth?: number;
  imageHeight?: number;
}

const NoResult = (props: NoResultProps) => {
  const { message, imageWidth, imageHeight } = props;
  const { t } = useTranslation();

  return (
    <Container sx={{ textAlign: 'center' }}>
      <Image
        src={'/static/imgs/no_result.png'}
        alt={'No result'}
        sx={{ width: imageWidth, height: imageHeight, margin: 'auto' }}
      />
      <Typography>{message ?? t('title.noResult')}</Typography>
    </Container>
  );
};

export default NoResult;
