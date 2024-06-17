import { styled } from '@mui/material/styles';
import type { TableCellProps } from '@mui/material/TableCell';
import MuiTableCell from '@mui/material/TableCell';

interface Props extends TableCellProps {
  stickyLeft?: boolean;
  collapse?: boolean;
  stickyRight?: boolean;
  header?: boolean;
  selected?: boolean;
}

const TableCellBulk = styled(MuiTableCell, {
  shouldForwardProp: (prop: string) =>
    !['stickyLeft', 'collapse', 'stickyRight', 'header'].includes(prop),
})<Props>(({ theme, collapse, stickyLeft, stickyRight, header, selected }) => ({
  maxWidth: 400,
  wordBreak: 'break-all',
  overflowWrap: 'break-word',
  whiteSpace: 'nowrap',

  ...(collapse && {
    border: `1px solid red`,
    borderCollapse: 'collapse',
  }),
  ...(stickyLeft && {
    position: 'sticky',
    left: 0,
    boxShadow: '2px 0px 4px -2px rgb(0 0 0 / 21%)',
    zIndex: theme.zIndex.appBar + 1,
  }),
  ...(stickyRight && {
    position: 'sticky',
    right: 0,
    boxShadow: '-2px 0px 4px -2px rgb(0 0 0 / 21%)',
    zIndex: theme.zIndex.appBar + 1,
  }),
  ...(!header && {
    backgroundColor: theme.palette.common.white,
    verticalAlign: 'top',
  }),
  ...(selected && {
    backgroundColor: theme.palette.grey[200],
  }),
}));

export default TableCellBulk;
