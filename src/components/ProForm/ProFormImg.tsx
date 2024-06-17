import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import ProDialog from 'components/ProDialog';
import DialogContent from 'components/ProDialog/DialogContent';
import type { FileDropzoneProps } from 'components/Upload/FileDropzone';
import FileDropzone from 'components/Upload/FileDropzone';
import { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { DialogRef } from 'types/refs';
import Validation from 'utils/Validation';
import type { AnySchema } from 'yup';
import { Box } from '@mui/material';
import { ImageURLS } from 'types/common';

export interface FormImgProps extends Partial<FileDropzoneProps> {
  name: string;
  validate?: AnySchema;
  width?: number;
  height?: number;
}

const ProFormImg = (props: FormImgProps) => {
  const { name, validate, width = 50, height = 50, ...rest } = props;
  const dialogRef = useRef<DialogRef>(null);

  const { control } = useFormContext();
  const { t } = useTranslation();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: validate?.getDefault(),
    rules: {
      validate: Validation.validate(validate),
    },
  });

  const handleUpload = (urls: ImageURLS[]) => {
    onChange(urls);
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  return (
    <ProDialog
      ref={dialogRef}
      DialogProps={{ maxWidth: 'xs' }}
      target={
        <Box>
          <ButtonBase component="label">
            <Avatar
              src={value?.[0]?.hostUrl + value?.[0]?.dataUrl}
              sx={{ width: width, height: height }}
            >
              <AddPhotoAlternateIcon />
            </Avatar>
          </ButtonBase>
          <Typography component="div" variant="caption" color="primary.main">
            {error?.message && t(error.message)}
          </Typography>
        </Box>
      }
    >
      <DialogContent>
        <FileDropzone
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
          }}
          onUpload={handleUpload}
          onClose={handleClose}
          value={value}
          {...rest}
        />
      </DialogContent>
    </ProDialog>
  );
};

export default ProFormImg;
