import { styled } from '@mui/material/styles';
import type { TableCellProps } from '@mui/material/TableCell';
import TableCell from '@mui/material/TableCell';

interface Props extends TableCellProps {
  fixed?: 'left' | 'right' | false;
  header?: boolean;
  selected?: boolean;
  leftOffset: number;
  rightOffset: number;
  verticalTop?: boolean;
}

const ProTableCell = styled(TableCell, {
  shouldForwardProp: (prop: string) =>
    ![
      'fixed',
      'header',
      'selected',
      'leftOffset',
      'rightOffset',
      'verticalTop',
      'verticalAlign',
    ].includes(prop),
})<Props>(
  ({
    theme,
    fixed,
    header,
    selected,
    leftOffset,
    rightOffset,
    verticalTop,
  }) => ({
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    ...(fixed && {
      position: 'sticky',
      ...(fixed === 'left' && {
        left: leftOffset,
        boxShadow: '2px 0px 4px -2px rgb(0 0 0 / 21%)',
        zIndex: theme.zIndex.appBar - 2,
      }),
      ...(fixed === 'right' && {
        right: rightOffset,
        boxShadow: '-2px 0px 4px -2px rgb(0 0 0 / 21%)',
        zIndex: theme.zIndex.appBar - 2,
      }),
      ...(header && {
        zIndex: theme.zIndex.appBar - 1,
      }),
    }),
    ...(header && {
      whiteSpace: 'nowrap',
    }),
    ...(!header && {
      backgroundColor: theme.palette.common.white,
    }),
    ...(selected && {
      backgroundColor: theme.palette.grey[200],
    }),
    ...(verticalTop && {
      verticalAlign: 'top',
    }),
  })
);

export default ProTableCell;
