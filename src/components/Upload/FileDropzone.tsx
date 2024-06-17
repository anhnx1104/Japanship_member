import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ImageIcon from '@mui/icons-material/Image';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ActionButton from 'components/ProButton/ActionButton';
import TypographyWrap from 'components/TypographyWrap';
import useNotification from 'hooks/useNotification';
import { useState } from 'react';
import type { DropzoneOptions } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { uploadPhoto } from 'services/common';
import { ImageURLS } from 'types/common';
import wait from 'utils/wait';

export interface FileDropzoneProps extends DropzoneOptions {
  onUpload: (urls: ImageURLS[]) => void;
  onClose?: () => void;
  value: ImageURLS[];
}

interface Filee {
  origin: File;
  isLoading: boolean;
  isError: boolean;
  isRetry: boolean;
  objImageURL?: {
    dataUrl: string;
    hostUrl: string;
  };
}

const FileDropzone = (props: FileDropzoneProps) => {
  const {
    accept,
    maxFiles = 10,
    maxSize,
    minSize,
    onDrop,
    onUpload,
    onClose,
    value,
    multiple,
    ...rest
  } = props;
  const setNotification = useNotification();

  const [files, setFiles] = useState<Filee[]>([]);
  const handleDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length + value.length > maxFiles && multiple) {
      setNotification({
        error: `Chỉ được chọn tối đa ${maxFiles} ảnh`,
      });
      return;
    }

    const newFiles = acceptedFiles.map((file) => ({
      origin: file,
      isLoading: true,
      isError: false,
      isRetry: false,
    }));

    const isFileSelected = !files.every((file) =>
      acceptedFiles.every(
        (acceptedFile) => acceptedFile.name !== file.origin.name
      )
    );

    if (isFileSelected) {
      setNotification({
        error: 'Ảnh đã được chọn',
      });
      return;
    }

    try {
      setFiles((state) => (multiple ? state.concat(newFiles) : newFiles));

      const responses = await Promise.allSettled(
        acceptedFiles.map((file) => {
          const formData = new FormData();
          formData.append('fileType', '1');
          formData.append('inputFile', file);
          return uploadPhoto(formData);
        })
      );

      setFiles((state) => {
        const anchorIndex = state.length - responses.length;
        const newFiles = state.slice();

        responses.forEach((response, i) => {
          const index = anchorIndex + i;
          newFiles[index].isLoading = false;

          if (response.status === 'fulfilled') {
            const { value } = response;
            const hostUrl = value.data?.hostUrl || '';
            const dataUrl = value.data?.dataUrl || '';
            newFiles[index].objImageURL = {
              dataUrl,
              hostUrl,
            };
          } else {
            newFiles[index].isError = true;
            newFiles[index].isRetry = true;
          }
        });
        return newFiles;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = async () => {
    onClose?.();
    await wait(500);
    setFiles([]);
  };

  const handleRemove = (value: Filee) => () => {
    setFiles((state) =>
      state.filter((file) => file.origin.name !== value.origin.name)
    );
  };

  const handleDelete = (preview: ImageURLS) => () => {
    const urls = value.filter(
      (url) => url.dataUrl !== preview.dataUrl
    ) as any[];
    onUpload(urls);
    setFiles((state) =>
      state.filter((file) => file.objImageURL?.dataUrl !== preview.dataUrl)
    );
  };

  const handleUpload = async () => {
    onClose?.();
    await wait(500);
    const urls = files
      .map((file) => file.objImageURL)
      .filter((url) => Boolean(url)) as ImageURLS[];
    onUpload(multiple ? value.concat(urls) : urls);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxSize,
    minSize,
    onDrop: handleDrop,
    multiple,
    disabled:
      (multiple && maxFiles === files.length) ||
      (multiple && maxFiles === value.length),
    ...rest,
  });

  return (
    <div>
      <Box
        sx={{
          alignItems: 'center',
          border: 1,
          borderRadius: 1,
          borderStyle: 'dashed',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
          outline: 'none',
          ...(isDragActive && {
            backgroundColor: 'action.hover',
            opacity: 0.7,
          }),
          ...(value.length < maxFiles && {
            '&:hover': {
              backgroundColor: 'action.hover',
              cursor: 'pointer',
              opacity: 0.5,
            },
          }),
          ...(!multiple && {
            '&:hover': {
              backgroundColor: 'action.hover',
              cursor: 'pointer',
              opacity: 0.5,
            },
          }),
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            p: 2,
            display: 'grid',
            placeItems: 'center',
            color: 'text.secondary',
          }}
        >
          <AddPhotoAlternateIcon fontSize="medium" color="primary" />
          <Typography variant="body2" sx={{ mt: 2 }} gutterBottom>
            Bấm để tải ảnh lên hoặc kéo và thả ảnh vào đây
          </Typography>
          <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
            (Tối đa {maxFiles} ảnh; định dạng *.jpeg, *jpg, *.png)
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'grid',
          gridTemplateColumns: `repeat(4, 1fr)`,
          gap: 1,
        }}
      >
        {((!multiple && files.length === 0) || multiple) &&
          value.slice(0, 8).map((url, i) => (
            <Box
              key={i}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                '&:hover': {
                  '& .delete': {
                    display: 'grid',
                  },
                },
              }}
            >
              <Avatar
                src={url?.hostUrl + url?.dataUrl}
                variant="square"
                sx={{
                  width: 1,
                  height: 1,
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                }}
              >
                <ImageIcon />
              </Avatar>
              {value.length > 8 && i === 7 && (
                <Box
                  sx={{
                    inset: 0,
                    position: 'absolute',
                    color: 'common.white',
                    bgcolor: 'action.disabled',
                    userSelect: 'none',
                    display: 'grid',
                    placeContent: 'center',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body1">+{value.length - 8}</Typography>
                </Box>
              )}
              <Box
                className="delete"
                sx={{
                  inset: 0,
                  position: 'absolute',
                  bgcolor: 'action.disabled',
                  userSelect: 'none',
                  display: 'none',
                  placeContent: 'center',
                  borderRadius: 1,
                }}
              >
                <IconButton
                  onClick={handleDelete(url)}
                  sx={{ color: 'common.white' }}
                >
                  <DeleteOutlineOutlinedIcon color="inherit" />
                </IconButton>
              </Box>
            </Box>
          ))}
      </Box>
      <Box sx={{ mt: 2 }}>
        {files.length > 0 && (
          <List dense>
            {files.map((file, i) => {
              const { isLoading, objImageURL } = file;
              return (
                <ListItem
                  key={i}
                  disableGutters
                  sx={{
                    p: 1.5,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    '& + &': {
                      mt: 1,
                    },
                  }}
                >
                  <Avatar
                    src={`${objImageURL?.hostUrl}${objImageURL?.dataUrl}`}
                  >
                    <ImageIcon />
                  </Avatar>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                      px: 2,
                    }}
                  >
                    <TypographyWrap variant="subtitle2" gutterBottom noWrap>
                      {file.origin.name}
                    </TypographyWrap>
                    {isLoading && <LinearProgress />}
                  </Box>
                  <IconButton onClick={handleRemove(file)}>
                    <ClearIcon />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Stack>
            <ActionButton
              onClick={handleClose}
              actionType="cancel"
              variant="outlined"
            >
              Đóng
            </ActionButton>
            <ActionButton actionType="save" onClick={handleUpload}>
              Lưu
            </ActionButton>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default FileDropzone;
