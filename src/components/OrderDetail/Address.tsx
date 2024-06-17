import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogContent from 'components/Dialog/DialogContent';
import AddressForm, {
  AddressFormValue,
  validationAddressSchema,
} from 'components/Profile/AddressForm';
import { TYPE_FORM } from 'constant/common';
import useAddress from 'hooks/useAddress';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Address } from 'types/user';

interface Props {
  showAddAddress: boolean;
  setShowAddAddress: Dispatch<SetStateAction<boolean>>;
  orderStatus: number;
  orderAddressId: number;
  onChangeAddress: (addressId: number) => void;
}

const CartAddress = (props: Props) => {
  const {
    showAddAddress,
    setShowAddAddress,
    orderStatus,
    orderAddressId,
    onChangeAddress,
  } = props;
  const { listAddress, refetch } = useAddress();
  const [openAddressDialog, setOpenAddressDialog] = useState<boolean>(false);
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
  const [openCreateForm, setOpenCreateForm] = useState<boolean>(false);
  const [updateItem, setUpdateItem] = useState<Address | null>(null);
  const theme = useTheme();
  const up465 = useMediaQuery(theme.breakpoints.up('s465'));
  const [selectAddress, setSelectAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (orderAddressId) {
      setSelectAddress(
        listAddress.find((address) => address.id === orderAddressId) || null
      );
    }
  }, [orderAddressId, listAddress]);

  useEffect(() => {
    if (showAddAddress) {
      setOpenCreateForm(true);
    }
  }, [showAddAddress]);

  const {
    control: createControl,
    handleSubmit: handleSubmitCreateModal,
    reset: resetCreateForm,
  } = useForm<AddressFormValue>({
    mode: 'onChange',
    resolver: yupResolver(validationAddressSchema),
    defaultValues: validationAddressSchema.getDefault(),
  });

  const {
    control: updateControl,
    handleSubmit: handleSubmitUpdateModal,
    reset: resetUpdateForm,
    getValues,
  } = useForm<AddressFormValue>({
    mode: 'onChange',
    resolver: yupResolver(validationAddressSchema),
    defaultValues: validationAddressSchema.getDefault(),
  });

  const handleSetSelectAddress = (values: Address) => () => {
    // setSelectAddress(values);
    onChangeAddress(values.id);
    onCloseAddressDialog();
  };

  const onCloseAddressDialog = () => {
    setOpenAddressDialog(false);
  };

  const handleOpenAddressDialog = () => {
    setOpenAddressDialog(true);
  };

  const onClickUpdateAddress = (updateItem: Address) => () => {
    setOpenUpdateForm(true);
    setUpdateItem(updateItem);
  };

  const onClickCreateAddress = () => {
    setOpenCreateForm(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateForm(false);
    setShowAddAddress(false);
    resetCreateForm(validationAddressSchema.getDefault());
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateForm(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <LocationOnIcon sx={{ color: 'error.main' }} />
        <Typography variant="h6" sx={{ ml: 1, color: 'error.main' }}>
          Địa chỉ nhận hàng:
        </Typography>
      </Box>
      {selectAddress ? (
        <Box
          sx={{
            ml: 4,
            mt: 1,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              maxWidth: { xs: 1, sm: 0.7, md: 0.8 },
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography variant="body1" noWrap sx={{ fontWeight: 'bold' }}>
                {selectAddress?.fullName}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', ml: 1 }}>
                (+84) {selectAddress?.mobile}
              </Typography>
            </Box>
            <Box sx={{ ml: 1 }}>
              <Typography variant="body1">
                {selectAddress?.addressLine}
              </Typography>
            </Box>
          </Box>
          {(orderStatus === 0 || orderStatus === 1) && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                minWidth: 160,
                mt: { xs: 1.5, sm: 0 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  '&:hover': { opacity: 0.5 },
                  cursor: 'pointer',
                  mx: 2,
                  fontWeight: 'bold',
                  color: 'vShip.text.lightBlue',
                }}
                onClick={handleOpenAddressDialog}
              >
                Thay đổi
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        <Button
          variant="outlined"
          size="small"
          sx={{ display: 'flex', alignItem: 'center', mt: 2, ml: 4 }}
          onClick={handleOpenAddressDialog}
        >
          <AddIcon fontSize="small" />
          <Typography variant="body2">Thêm địa chỉ</Typography>
        </Button>
      )}

      <Dialog
        open={openAddressDialog}
        onClose={onCloseAddressDialog}
        fullWidth={true}
        maxWidth="sm"
        PaperProps={{ sx: { width: 1, m: 1 } }}
      >
        <DialogTitle variant="h5" sx={{ borderBottom: 1, py: 1.5, px: 2.5 }}>
          Địa chỉ của tôi
        </DialogTitle>
        <DialogContent sx={{ p: 2.5, maxHeight: 600, overflowY: 'auto' }}>
          {listAddress.map((item, index) => (
            <Box key={index}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: { xs: 0, s465: 1 },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ maxWidth: 200 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        borderRight: { xs: 0, s465: 1 },
                        mr: 1,
                        pr: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.fullName}
                    </Typography>
                  </Box>
                  {up465 && (
                    <Typography variant="body1">{item.mobile}</Typography>
                  )}
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    '&:hover': { opacity: 0.5 },
                    cursor: 'pointer',
                    mx: 2,
                    fontWeight: 'bold',
                    color: 'vShip.text.lightBlue',
                  }}
                  onClick={onClickUpdateAddress(item)}
                >
                  Thay đổi
                </Typography>
              </Box>
              {!up465 && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {item.mobile}
                </Typography>
              )}
              <Box
                sx={{
                  maxWidth: 500,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.addressLine}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                {item.id !== orderAddressId ? (
                  <Typography
                    variant="body2"
                    sx={{
                      border: 1,
                      px: 0.5,
                      lineHeight: 2,
                      borderColor: 'vShip.text.lightBlue',
                      color: 'vShip.text.lightBlue',
                      mb: 2,
                      mr: 1,
                      width: 90,
                      '&:hover': { opacity: 0.5, cursor: 'pointer' },
                    }}
                    onClick={handleSetSelectAddress(item)}
                  >
                    Chọn địa chỉ
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      border: 1,
                      px: 0.5,
                      lineHeight: 2,
                      borderColor: 'vShip.text.disabled',
                      color: 'vShip.text.disabled',
                      mb: 2,
                      mr: 1,
                      width: 110,
                    }}
                  >
                    Địa chỉ hiện tại
                  </Typography>
                )}
              </Box>
              <Divider variant="fullWidth" sx={{ mb: 2 }} />
            </Box>
          ))}

          <Button
            variant="outlined"
            size="medium"
            sx={{ display: 'flex', alignItem: 'center', mt: 2 }}
            onClick={onClickCreateAddress}
          >
            <AddIcon />
            <Typography variant="body1">Thêm địa chỉ mới</Typography>
          </Button>
        </DialogContent>
      </Dialog>

      <AddressForm
        open={openCreateForm}
        typeForm={TYPE_FORM.CREATE}
        control={createControl}
        handleSubmit={handleSubmitCreateModal}
        reset={resetCreateForm}
        handleClose={handleCloseCreateModal}
        refetch={refetch}
      />
      <AddressForm
        getUpdateFormValues={getValues}
        open={openUpdateForm}
        typeForm={TYPE_FORM.UPDATE}
        control={updateControl}
        handleSubmit={handleSubmitUpdateModal}
        reset={resetUpdateForm}
        updateItem={updateItem}
        handleClose={handleCloseUpdateModal}
        refetch={refetch}
      />
    </Box>
  );
};

export default CartAddress;
