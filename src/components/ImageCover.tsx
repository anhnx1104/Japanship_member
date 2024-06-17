import Box from '@mui/material/Box';

interface ImgProps {
  src: string;
  children: React.ReactElement;
}

const ImageBackgroundCover = (props: ImgProps) => {
  const { children, src } = props;
  return (
    <Box
      sx={{
        backgroundImage: `url(${src})`,
        height: '100%',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {children}
    </Box>
  );
};

export default ImageBackgroundCover;
