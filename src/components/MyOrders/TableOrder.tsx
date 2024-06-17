import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DateFns from 'utils/DateFns';
import { Avatar } from '@mui/material';
import useOrders from 'hooks/useOrders';
import NextLink from 'next/link';

const OrderStatus: Record<number, string> = {
  0: 'Chờ nhập kho Nhật',
  1: 'Đã nhập kho Nhật',
  2: 'Chờ nhập kho Việt',
  3: 'Đã nhập kho Việt',
  4: 'Đã xuất kho Việt',
  5: 'Đã giao thành công',
  6: 'Đã hủy',
  7: 'Đang vận chuyển',
};

const TableOrder = () => {
  const { list } = useOrders();

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">STT</TableCell>
            <TableCell align="center" sx={{ whiteSpace: 'pre' }}>
              Ảnh sản phẩm
            </TableCell>
            <TableCell align="center" sx={{ whiteSpace: 'pre' }}>
              Tên sản phẩm
            </TableCell>
            <TableCell align="center" sx={{ whiteSpace: 'pre' }}>
              Người bán
            </TableCell>
            <TableCell align="center" sx={{ whiteSpace: 'pre' }}>
              Tiền hàng (VNĐ)
            </TableCell>
            <TableCell align="center" sx={{ whiteSpace: 'pre' }}>
              Tổng tiền hàng (VNĐ)
            </TableCell>
            <TableCell align="center" sx={{ whiteSpace: 'pre' }}>
              Ngày mua hàng
            </TableCell>
            <TableCell align="center" sx={{ whiteSpace: 'pre' }}>
              Trạng thái
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map((row, idx) => (
            <TableRow key={idx} sx={{ '& td, & th': { borderTop: 0 } }}>
              <TableCell align="center" component="th" scope="row">
                {idx + 1}
              </TableCell>
              <TableCell align="center">
                <Avatar src={row.imageUrls} variant="rounded" />
              </TableCell>
              <TableCell align="center">{row.productUrl}</TableCell>
              <TableCell align="center">{row.sellerName}</TableCell>
              <TableCell align="right">{row.vnTotalAmount}</TableCell>
              <TableCell align="right">{row.totalPrice}</TableCell>
              <TableCell align="right">
                {DateFns.format(new Date(row.purchaseDate), 'dd/MM/yyyy')}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  whiteSpace: 'pre',
                  color: '#0088FF',
                  textDecorationLine: 'none',
                }}
              >
                <NextLink href={`/profile/order/${row.id}`}>
                  {OrderStatus[row.deliveryStatus]}
                </NextLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableOrder;
