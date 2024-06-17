import RouteLink from 'components/RouteLink';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'components/Image';

interface OrderShippingCodeTagProps {
  shippingCode: string;
  imgUrl: string | null;
  shippingNote: string | null;
  shippingType: number;
}

const OrderShippingCodeTag = (props: OrderShippingCodeTagProps) => {
  const { shippingCode, shippingNote, shippingType, imgUrl } = props;
  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);

  if(!shippingCode){
    return <></>
  }

  if (shippingType === 1) {
    return (
      <RouteLink
        href={`https://i.ghtk.vn/${shippingCode}`}
        target={'_blank'}
        rel={'external nofollow noopener noreferrer'}
      >
        {shippingCode || ''}
      </RouteLink>
    );
  }

  if (shippingType === 2) {
    return (
      <RouteLink
        href={`http://www.vnpost.vn/vi-vn/dinh-vi/buu-pham?key=${shippingCode}`}
        target={'_blank'}
        rel={'external nofollow noopener noreferrer'}
      >
        {shippingCode || ''}
      </RouteLink>
    );
  }

  const handleClose = () => {
    setOpenViewDetail(false);
  };

  const handleOpen = () => {
    setOpenViewDetail(true);
  };

  if (shippingType === 3) {
    return (
      <Box>
        <Typography
          variant={'caption'}
          sx={{ cursor: 'pointer' }}
          onClick={handleOpen}
        >
          Xem chi tiết
        </Typography>
        <Modal
          open={openViewDetail}
          onClose={handleClose}
        >
          <Paper
            sx={{
              p: 1.5,
              top: '50%',
              position: 'absolute',
              margin: 'auto',
              transform: 'translate(-50%, -50%)',
              left: '50%',
              maxWidth: 500,
              width: 1,
            }}
          >
            {imgUrl && (
              <Box sx={{ mb: 1}}>
                <Image src={imgUrl} alt={'note image'} />
              </Box>
            )}
            <Typography>Ghi chú:</Typography>
            <Typography>{shippingNote || ''}</Typography>
          </Paper>
        </Modal>
      </Box>
    );
  }

  return <></>;
};

export default OrderShippingCodeTag;
