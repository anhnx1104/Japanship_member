import DateRangeIcon from '@mui/icons-material/DateRange';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DateFormat } from 'constant/locale';
import { Fragment, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import DateFns from 'utils/DateFns';

interface Props {
  from: string;
  to: string;
  label: string;
}

const ProDateRange = (props: Props) => {
  const { from, to, label } = props;
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const { control, getValues } = useFormContext();

  const {
    field: { value: fromValue, onChange: fromOnChange },
  } = useController({ name: from, control });

  const {
    field: { value: toValue, onChange: toOnChange },
  } = useController({ name: to, control });

  const fromDate = getValues(from);
  const toDate = getValues(to);

  return (
    <Fragment>
      <Wrapper ref={ref} focused={focused} onClick={handleOpen}>
        <Label
          component="label"
          focused={focused}
          variant="body1"
          htmlFor={from}
          noWrap
        >
          {label}
        </Label>
        <InputBase
          name={from}
          value={DateFns.Format(fromDate) || ''}
          placeholder="dd/mm/yyyy"
          onFocus={handleFocus}
          onBlur={handleBlur}
          sx={{
            zIndex: 1,
            pointerEvents: 'none',
            '& .MuiInputBase-input': {
              py: '8.5px',
              pl: 1.75,
              width: '10.5ch',
            },
          }}
        />
        <Box sx={{ px: 0.5 }}>{'-'}</Box>
        <InputBase
          name={to}
          value={DateFns.Format(toDate) || ''}
          placeholder="dd/mm/yyyy"
          onFocus={handleFocus}
          onBlur={handleBlur}
          sx={{
            zIndex: 1,
            pointerEvents: 'none',
            '& .MuiInputBase-input': {
              py: '8.5px',
              pl: 0.5,
              width: '10.5ch',
            },
          }}
        />
        <IconButton onClick={handleOpen} sx={{ mr: 1, zIndex: 1, ml: 'auto' }}>
          <DateRangeIcon />
        </IconButton>
        <Fieldset focused={focused}>
          <Legend>
            <Span>{label}</Span>
          </Legend>
        </Fieldset>
      </Wrapper>
      <Popover
        open={open}
        anchorEl={ref.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            '& button.MuiPickersDay-root': {
              borderRadius: 1,
            },
          }}
        >
          <StaticDatePicker
            inputFormat={DateFormat}
            displayStaticWrapperAs="desktop"
            onChange={(date: Date | null) => {
              fromOnChange(date);
            }}
            value={fromValue}
            renderInput={(params) => <TextField {...params} />}
            componentsProps={{
              actionBar: { actions: ['clear', 'today'] },
            }}
            dayOfWeekFormatter={(day) => `${day}`}
            onAccept={(value) => {
              if (value && toDate) {
                setOpen(false);
              }
            }}
          />
          <StaticDatePicker
            inputFormat={DateFormat}
            displayStaticWrapperAs="desktop"
            onChange={(date: Date | null) => {
              toOnChange(date);
            }}
            value={toValue}
            renderInput={(params) => <TextField {...params} />}
            componentsProps={{
              actionBar: { actions: ['clear', 'today'] },
            }}
            dayOfWeekFormatter={(day) => `${day}`}
            onAccept={(value) => {
              if (value && fromDate) {
                setOpen(false);
              }
            }}
          />
        </Box>
      </Popover>
    </Fragment>
  );
};

const Wrapper = styled('div', {
  shouldForwardProp: (prop: string) => !['focused'].includes(prop),
})<{ focused: boolean }>(({ theme, focused }) => ({
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 4,
  position: 'relative',
  cursor: 'pointer', // Remove later
  ...(!focused && {
    '&:hover': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
      },
    },
  }),
}));

const Fieldset = styled('fieldset', {
  shouldForwardProp: (prop: string) => !['focused'].includes(prop),
})<{ focused: boolean }>(({ theme, focused }) => ({
  position: 'absolute',
  top: -5,
  left: 0,
  right: 0,
  bottom: 0,
  margin: 0,
  padding: theme.spacing(0, 1),
  pointerEvents: 'none',
  overflow: 'hidden',
  minWidth: '0%',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.divider,
  borderRadius: 'inherit',
  ...(focused && {
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
  }),
}));

const Legend = styled('legend')(({ theme }) => ({
  float: 'unset',
  width: 'auto',
  overflow: 'hidden',
  display: 'block',
  padding: 0,
  height: 11,
  fontSize: '0.75em',
  visibility: 'hidden',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
}));

const Span = styled('span')(({ theme }) => ({
  paddingLeft: 5,
  paddingRight: 5,
  display: 'inline-block',
  opacity: 0,
  visibility: 'visible',
}));

const Label = styled(Typography<'label'>, {
  shouldForwardProp: (prop: string) => !['focused'].includes(prop),
})<{ focused: boolean }>(({ theme, focused }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'translate(14px, -9px) scale(0.75)',
  transformOrigin: 'top left',
  zIndex: 1,
  pointerEvents: 'auto',
  userSelect: 'none',
  maxWidth: 'calc(133% - 24px)',
  color: theme.palette.text.secondary,
  ...(focused && {
    color: theme.palette.primary.main,
  }),
}));

export default ProDateRange;
