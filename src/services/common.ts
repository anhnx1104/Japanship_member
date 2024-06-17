import { API_UPLOAD_IMAGE } from 'constant/api-path';
import { Endpoints } from 'constant/endpoints';
import {
  CommonResponse,
  City,
  Districts,
  ImageUrlParams,
  AddressSender,
} from 'types/common';
import HttpClient from 'utils/HttpClient';

export const uploadPhoto = async (params: FormData) => {
  return HttpClient.post<FormData, CommonResponse<ImageUrlParams>>(
    API_UPLOAD_IMAGE,
    params,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
};

export const getCity = (countryId: number) => {
  return HttpClient.get<number, CommonResponse<City[]>>(
    `${Endpoints.address.city}/${countryId}`
  );
};

export const getListAddressData = () => {
  return HttpClient.get<null, CommonResponse<AddressSender[]>>(
    `${Endpoints.address.addressList}`
  );
};

export const getDistrict = (cityId: number) => {
  return HttpClient.get<number, CommonResponse<Districts[]>>(
    `${Endpoints.address.district}/${cityId}`
  );
};

export const getWards = (districtId: any) => {
  return HttpClient.get<null, CommonResponse<any>>(
    `${Endpoints.address.wards}/${districtId}`
  );
};
