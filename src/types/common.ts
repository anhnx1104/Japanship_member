export interface Dictionary<T = any> {
  [key: string]: T;
}

export type PickUnion<T> = { [K in keyof T]: Pick<T, K> }[keyof T];

export interface CommonResponse<D = any> {
  data: D | null;
  errors: string[] | null;
  message: string | null;
  messageCode: string | null;
  success?: boolean;
  httpStatusCode?: string | number;
  total: number;
}

export interface Sort {
  sortBy: string;
  sortDirection: string;
}

export interface Paging {
  pageNumber: number;
  pageSize: number;
}

export interface ImageUrlParams {
  dataUrl: string;
  fileExtension: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  hostUrl: string;
  thumbnailUrl: string;
}

export type SortDirection = 'asc' | 'desc';

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  sortBy?: string | null;
  sortDirection?: string | null;
}

export interface City {
  country: number;
  decription: string | null;
  deleted: boolean;
  id: number;
  name: string;
  status: number;
}

export interface AddressSender {
  id: number;
  sellerName: string;
  sellerMobile: number;
  sellerCityName: string;
  sellerWardsName: string;
  sellerDistrictName: string;
}

export interface Districts {
  cityId: number;
  deleted: boolean;
  description: string | null;
  id: number;
  name: string;
  status: number;
}

export interface Wards {
  id: number;
  deleted: boolean;
  districtId: number;
  name: string;
  description: string | null;
  status: number;
}

export interface ImageURLS {
  dataUrl: string;
  hostUrl: string;
}
