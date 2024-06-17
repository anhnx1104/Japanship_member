import {
  AddressDefaultParams,
  AddressSender,
  AddressSenderFormParams,
  ListAddressSender,
} from './../types/user';
import {
  API_CHANGE_PASSWORD_PATH,
  API_CREATE_ADDRESS,
  API_CREATE_SENDER_ADDRESS,
  API_GET_ADDRESS,
  API_GET_LIST_ADDRESS,
  API_GET_LIST_ADDRESS_SENDER,
  API_GET_LIST_CITY,
  API_GET_LIST_DISTRICT,
  API_GET_LIST_WARD,
  API_GET_USER_PROFILE_PATH,
  API_PROFILE_CITY_SENDER,
  API_PROFILE_DISTRICT_SENDER,
  API_PROFILE_WARDS_SENDER,
  API_REMOVE_ADDRESS,
  API_UPDATE_ADDRESS,
  API_UPDATE_USER_PROFILE_PATH,
  API_UPLOAD_IMAGE,
} from 'constant/api-path';
import { CommonResponse, ImageUrlParams } from 'types/common';
import type {
  Address,
  AddressFormParams,
  ChangePasswordParams,
  UpdateUserParams,
  User,
} from 'types/user';
import HttpClient from 'utils/HttpClient';

class Users {
  public getUser() {
    return HttpClient.get<null, CommonResponse<User>>(
      API_GET_USER_PROFILE_PATH
    );
  }

  public updateUser(params: UpdateUserParams) {
    return HttpClient.put<typeof params, CommonResponse<User>>(
      API_UPDATE_USER_PROFILE_PATH,
      params
    );
  }

  public changePassword(params: ChangePasswordParams) {
    return HttpClient.put<typeof params, CommonResponse<User>>(
      API_CHANGE_PASSWORD_PATH,
      params
    );
  }

  public getAvatarUrl(params: FormData) {
    return HttpClient.post<FormData, CommonResponse<ImageUrlParams>>(
      API_UPLOAD_IMAGE,
      params,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  }

  public getListCity() {
    return HttpClient.get<null, CommonResponse>(API_GET_LIST_CITY);
  }

  public getListDistrict(cityId: number) {
    return HttpClient.get<null, CommonResponse>(API_GET_LIST_DISTRICT, {
      params: {
        id: cityId,
      },
    });
  }

  public getListWard(districtId: number) {
    return HttpClient.get<null, CommonResponse>(API_GET_LIST_WARD, {
      params: {
        id: districtId,
      },
    });
  }

  public getListAddress() {
    return HttpClient.get<null, CommonResponse>(API_GET_LIST_ADDRESS);
  }

  public getAddress(addressId: number) {
    const url = API_GET_ADDRESS + addressId;
    return HttpClient.get<number, CommonResponse>(url);
  }

  public removeAddress(addressId: number) {
    const url = API_REMOVE_ADDRESS + addressId;
    return HttpClient.put<number, CommonResponse<Address>>(url);
  }

  public updateAddress(params: AddressFormParams) {
    return HttpClient.post<typeof params, CommonResponse>(
      API_UPDATE_ADDRESS,
      params
    );
  }

  public createAddress(params: AddressFormParams) {
    return HttpClient.post<typeof params, CommonResponse>(
      API_CREATE_ADDRESS,
      params
    );
  }
  public searchAddressSenderTest(params: any) {
    return HttpClient.post<typeof params, CommonResponse>(
      API_GET_LIST_ADDRESS_SENDER,
      params
    );
  }

  public searchAddressSender(searchName: string) {
    const url = API_GET_LIST_ADDRESS_SENDER;
    const form = new FormData();
    form.append('senderName', searchName);
    return HttpClient.post<FormData, CommonResponse<ListAddressSender[]>>(
      url,
      form
    );
  }

  public getAddressCitySender(countryId: number) {
    const url = API_PROFILE_CITY_SENDER + countryId;
    return HttpClient.get<number, CommonResponse<AddressSender[]>>(url);
  }

  public getAddressDistrictSender(cityId: number) {
    const url = API_PROFILE_DISTRICT_SENDER + cityId;
    return HttpClient.get<number, CommonResponse<AddressSender[]>>(url);
  }

  public getAddressWardsSender(wardsId: number) {
    const url = API_PROFILE_WARDS_SENDER + wardsId;
    return HttpClient.get<number, CommonResponse<AddressSender[]>>(url);
  }

  public createAdressSender(params: AddressSenderFormParams) {
    return HttpClient.post<typeof params, CommonResponse>(
      API_CREATE_SENDER_ADDRESS,
      params
    );
  }

  public setAddressDefault(params: AddressDefaultParams) {
    return HttpClient.put<AddressDefaultParams, CommonResponse>(
      `/sender/set-address-default?userAddressId=${params.userAddressId}&isDefault=${params.isDefault}`
    );
  }
}
export default new Users();
