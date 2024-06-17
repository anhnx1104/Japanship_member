import { Box } from '@mui/material';
import ActionButton from 'components/ProButton/ActionButton';
import ProTable from 'components/ProTable';
import useRefresh from 'hooks/useRefresh';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListOrder } from 'types/order';
import type { DialogRef, FiltersRef } from 'types/refs';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import order from 'services/order';
import Dialog from './Modal/Dialog';

const ProductTable = () => {
  const { t } = useTranslation();
  const [refresh, refetch] = useRefresh();
  const [orders, setOrders] = useState<ListOrder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const filtersRef = useRef<FiltersRef>(null);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } =
    useFilters();
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogId, setDialogId] = useState<number | null>(null);

  const dialogRef = useRef<DialogRef>(null);

  const handleOpenDialog = (id: number) => {
    dialogRef.current?.open();
    setDialogId(id);
  };

  const handleResetFilters = () => {
    filtersRef.current?.reset();
  };

  const handleSubmitFilters = () => {
    filtersRef.current?.submit();
  };

  useEffect(() => {
    setLoading(true);
    order
      .getOrderListTest1({
        filter: {
          text: '',
          orderStatus: 1,
        },
        sortByParam: 'string',
        sortOrderBy: 'string',
        pageSize: 10,
        pageNumber: 0,
      })
      .then((response) => {
        const { data, total } = response;
        setTotal(total || 0);
        setOrders(data || []);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filters, refresh]);

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    open: handleOpenDialog,
  });

  return (
    <Box sx={{ height: 650 }}>
      <ProTable<ListOrder>
        title="Danh sách đơn hàng"
        loading={loading}
        columns={columns}
        data={orders}
        refetch={refetch}
        onSortingChange={onSortingChange}
        pagination={{
          page: filters.pageNumber,
          total,
          pageSize: filters.pageSize,
          onPageChange,
          onPageSizeChange,
        }}
        filter={
          <FiltersForm
            ref={filtersRef}
            onSearch={onSearch}
            onSubmit={handleSubmitFilters}
            onClear={handleResetFilters}
          />
        }
        toolBar={
          <Fragment>
            <Box>
              <ActionButton variant="text" onClick={filtersRef.current?.reset}>
                {t(' Xóa bộ lọc')}
              </ActionButton>
              {'  '}
              <ActionButton
                actionType="search"
                onClick={filtersRef.current?.submit}
              >
                {t('Tìm kiếm')}
              </ActionButton>
              {'  '}
              <ActionButton actionType="download">
                {t('Xuất Excel')}
              </ActionButton>
              {'  '}
              <ActionButton actionType="print">{t('In đơn hàng')}</ActionButton>
            </Box>

            <Dialog refetch={refetch} id={dialogId} ref={dialogRef} />
          </Fragment>
        }
      />
    </Box>
  );
};

export default ProductTable;
