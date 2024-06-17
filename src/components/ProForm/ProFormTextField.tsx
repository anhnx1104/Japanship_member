import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Validation from 'utils/Validation';
import type { AnySchema } from 'yup';

export interface FormTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  validate?: AnySchema;
  onChangeValue?: (value: string) => void;
}

const ProFormTextField = (props: FormTextFieldProps) => {
  const {
    name,
    placeholder,
    disabled,
    required,
    validate,
    defaultValue,
    onChangeValue,
    ...rest
  } = props;

  const { t } = useTranslation();

  const { control } = useFormContext();

  const {
    field: { value, ref, onBlur, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: validate ? validate.getDefault() : defaultValue,
    rules: { validate: Validation.validate(validate) },
  });

  return (
    <TextField
      id={name}
      required={required}
      error={Boolean(error)}
      helperText={error?.message && t(error.message)}
      placeholder={disabled ? void 0 : placeholder}
      disabled={disabled}
      onChange={(event) => {
        onChange(event);
        onChangeValue?.(event.target.value);
      }}
      onBlur={onBlur}
      value={value}
      name={name}
      inputRef={ref}
      {...rest}
    />
  );
};

export default ProFormTextField;
