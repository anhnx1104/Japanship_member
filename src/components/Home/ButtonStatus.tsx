import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
interface Props {
  title: string;
  onClickStatus: (status: string) => void;
  active: boolean;
}
const ButtonStatus = (props: Props) => {
  const { title, active, onClickStatus } = props;
  const status = title === 'Tra cứu' ? 'order' : 'service';
  return (
    <Button
      size="large"
      onClick={() => onClickStatus(status)}
      sx={{
        bgcolor: 'background.paper',
        color: 'primary.dark',
        px: { xs: 5, md: 9 },
        py: { xs: 1.5, md: 2 },
        '&:hover': {
          background: 'none',
        },
        ...(active && {
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': {
            bgcolor: 'primary.main',
          },
        }),
      }}
    >
      <Typography variant="button"> {title}</Typography>
    </Button>
  );
};

export default ButtonStatus;
