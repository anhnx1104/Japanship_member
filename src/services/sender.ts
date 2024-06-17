import HttpClient from 'utils/HttpClient';
import type { City, CommonResponse, Districts, Wards } from 'types/common';
import { Endpoints } from 'constant/endpoints';
import { AddressSenderFormParams } from 'types/user';

export interface SenderParams {
  addressDefault: number;
  addressLine: string;
  deleted: string;
  cityId: number;
  districtId: number;
  fullName: string;
  id: number;
  mobile: string;
  wardsId: number;
  specificAddress: string;
  userId: number;
  city: City;
  district: Districts;
  wards: Wards;
}

export const searchSender = (params: { senderName: string } | null = null) => {
  return HttpClient.post<null, CommonResponse<SenderParams[]>>(
    `${Endpoints.sender.search}`,
    null,
    { params }
  );
};

export const createAddressSender = (params: AddressSenderFormParams) => {
  return HttpClient.post<typeof params, CommonResponse>(
    `${Endpoints.sender.create}`,
    params
  );
};

export const deleteSenderAddress = (userAddressId: number) => {
  return HttpClient.delete<number, CommonResponse>(
    `${Endpoints.sender.delete}/${userAddressId}`
  );
};

export const updateSenderAddress = (
  id: number,
  data: AddressSenderFormParams
) => {
  return HttpClient.put<AddressSenderFormParams, CommonResponse>(
    `${Endpoints.sender.update}/${id}`,
    data
  );
};
