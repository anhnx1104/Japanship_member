import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const PrevButton = () => {
  return (
    <Box
      className="next"
      sx={{
        position: 'absolute',
        right: 10,
        top: '50%',
        zIndex: 2,
        transform: 'translateY(-50%)',
        color: 'primary.main',
        backgroundColor: 'rgb(255 255 255 / 0.5)',
        borderRadius: '50%',
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&:hover': {
          color: 'common.white',
          backgroundColor: 'primary.main',
        },
      }}
    >
      <ArrowForwardIcon fontSize="medium" />
    </Box>
  );
};

export default PrevButton;
