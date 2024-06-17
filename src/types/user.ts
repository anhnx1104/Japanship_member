export interface User {
  email: string;
  fullName: string;
  id: number;
  mobile: string;
  roles: [];
  username: string;
  dateOfBirth: string;
  gender: number;
  imageUrl: string;
  hostUrl: string;
  status: number;
  cashAmount: number;
  feeRatio: number;
  userCode: string;
  isVip: boolean | null;
}

export interface Address {
  id: number;
  addressDefault: number;
  cityId: number;
  districtId: number;
  fullName: string;
  mobile: string;
  specificAddress: string;
  wardsId: number;
  addressLine: string;
}

export interface Ward {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export interface ListAddress {
  id: number;
  name: string;
}

export interface AddressSender extends City {
  deleted: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  decription: string;
  status: number;
  country: number;
}

export interface UpdateUserParams {
  email: string | null;
  fullName: string;
  id: number;
  mobile: string;
  username: string;
  dateOfBirth: string | null;
  gender: number | null;
  imageUrl: string | null;
}

export interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface AddressDefaultParams {
  userAddressId: number;
  isDefault: number;
}

export interface AddressFormParams {
  id: number | null;
  addressDefault: number;
  cityId: number;
  districtId: number;
  fullName: string;
  mobile: string;
  specificAddress: string;
  wardsId: number;
}
export interface AddressSenderFormParams {
  addressLine: string | null;
  addressDefault: number;
  cityId: number | null;
  districtId: number | null;
  fullName: string;
  mobile: string;
  specificAddress: string;
  wardsId: number | null;
}

export interface ListAddressSender {
  id: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: null;
  updatedBy: null;
  userId: number;
  addressLine: string;
  fullName: string;
  mobile: string;
  addressDefault: number;
  cityId: number;
  districtId: number;
  wardsId: number;
  specificAddress: string;
  city: AddressSender;
  district: AddressSender;
  wards: AddressSender;
}
