import { styled } from '@mui/material/styles';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const ProTableScrollbar = styled(SimpleBar)({
  '& .simplebar-content': {
    height: '100%',
  },
});

export default ProTableScrollbar;
