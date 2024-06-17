import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  onSubmit?: () => void;
  onClear?: () => void;
  onExpanded?: () => void;
  openMoreFilter?: boolean;
}

const ProFormFilterAction = (props: Props) => {
  const { onSubmit, onExpanded, openMoreFilter } = props;

  return (
    <ButtonGroup variant="contained">
      <Button onClick={onSubmit}>Lọc</Button>
      {typeof onExpanded === 'function' && (
        <Tooltip title="Bộ lọc nâng cao">
          <Button onClick={onExpanded}>
            <ExpandMoreIcon
              sx={openMoreFilter ? { transform: 'rotate(180deg)' } : null}
            />
          </Button>
        </Tooltip>
      )}
    </ButtonGroup>
  );
};

export default ProFormFilterAction;
