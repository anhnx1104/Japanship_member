import { useState } from 'react';
import { FilterNotification } from 'types/notification';

const useFilterNotification = () => {
  const [filterNotification, setFilterNotification] =
    useState<FilterNotification>({
      userCode: '',
      pageNumber: 1,
      pageSize: 100,
      sortBy: '',
      sortDirection: '',
    });

  const onChangePage = (pageNumber: number) => {
    setFilterNotification((state) => ({
      ...state,
      pageNumber,
    }));
  };

  const onChangeRowsPerPage = (pageSize: number) => {
    setFilterNotification((state) => ({
      ...state,
      pageNumber: 1,
      pageSize,
    }));
  };
  return { filterNotification, onChangePage, onChangeRowsPerPage };
};

export default useFilterNotification;
