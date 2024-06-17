import type { SvgIconComponent } from '@mui/icons-material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface Props extends BoxProps {
  title: string;
  icon?: SvgIconComponent;
  description?: string;
}

const DialogHeader = (props: Props) => {
  const { title, icon: Icon, children, description, ...rest } = props;
  return (
    <Wrapper {...rest}>
      {Icon && <Icon sx={{ fontSize: 50, color: 'text.secondary' }} />}
      {children && children}
      <Typography
        sx={{ mt: 1, fontWeight: 'bold' }}
        color="text.primary"
        variant="body1"
        gutterBottom
      >
        {title}
      </Typography>
      {description && (
        <Typography variant="subtitle2">{description}</Typography>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
}));

export default DialogHeader;
