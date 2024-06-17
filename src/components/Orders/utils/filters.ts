import type { ProTableSortingState } from 'components/ProTable/types';
import { SORT_DIRECTION } from 'constant/common';
import { useState } from 'react';
import type { PaginationParams } from 'types/common';
import { STATUS } from './constants';

export interface FilterParams extends PaginationParams {
  orderSearch: string;
  orderStatusId: number | null;
  dateFrom: string | null;
  dateTo: string | null;
}

const useFilters = () => {
  const [filters, setFilters] = useState<FilterParams>({
    pageNumber: 1,
    pageSize: 10,
    orderStatusId: STATUS.orderAll,
    orderSearch: '',
    dateFrom: null,
    dateTo: null,
  });

  const onSortingChange = (sorting?: ProTableSortingState) => {
    if (!sorting || !sorting.length) {
      setFilters((state) => ({
        ...state,
        sortBy: '',
        sortDirection: '',
      }));

      return;
    }

    const column = sorting[0];

    setFilters((state) => ({
      ...state,
      sortBy: column.id,
      sortDirection: column.desc ? SORT_DIRECTION.desc : SORT_DIRECTION.asc,
    }));
  };

  const onPageChange = (pageNumber: number) => {
    setFilters((state) => ({
      ...state,
      pageNumber,
    }));
  };

  const onPageSizeChange = (pageSize: number) => {
    setFilters((state) => ({
      ...state,
      pageSize,
    }));
  };

  const onSearch = (params: Partial<FilterParams>) => {
    setFilters((state) => ({
      ...state,
      ...params,
      pageNumber: 1,
    }));
  };

  const onChangeStatus = (status: number) => {
    setFilters((state) => ({
      ...state,
      pageNumber: 1,
      status,
    }));
  };

  return {
    filters,
    onSortingChange,
    onPageChange,
    onPageSizeChange,
    onSearch,
    onChangeStatus,
  };
};

export default useFilters;
