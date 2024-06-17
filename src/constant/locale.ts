import type { LocalizationProviderProps } from '@mui/x-date-pickers';

export const DateFormat = 'dd/MM/yyyy';
export const DateTimeFormat = "dd/MM/yyyy',' HH:mm";

export const DateTimeLocaleText: LocalizationProviderProps['localeText'] = {
  previousMonth: 'Tháng trước',
  nextMonth: 'Tháng sau',
  // Action bar
  cancelButtonLabel: 'Hủy bỏ',
  clearButtonLabel: 'Xóa',
  okButtonLabel: 'Đóng',
  todayButtonLabel: 'Hôm nay',
};
