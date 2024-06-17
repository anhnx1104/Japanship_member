export interface EditOrderDetailAddress {
  billCode: string;
  addressId: number;
}

export interface confirmSender {
  id?: number;
  userId?: number | null;
  sellerName?: number;
  japanCode?: string;
  isChecked?: boolean;
  buyerName?: string;
  buyerMobile?: string;
  sellerAddress?: string;
  buyerAddress?: string;
  note?: string;
  cityId?: number | null;
  senderName?: string;
  districtId?: number | null;
  wardsId?: number | null;
  staTus?: number;
}

export interface OrderProduct {
  orderDetailId: string;
  productId: string;
  url: string;
  productName: string;
  productUrl: string;
  vnPrice: number;
  jpPrice: number;
}

export interface ListOrder {
  address: string;
  senderName: string;
  receiverName: string;
  buyerName: string;
  dateReceived: string | null;
  displayStatus: string;
  id: number;
  receiverCountry: string;
  receiverAddress: string;
  receiverDistrict: string;
  japanCode: string;
  jpExportDate: string;
  jpShippingAmount: string | null;
  jpShippingTypeId: string | null;
  mobile: number;
  orderCode: string;
  orderId: string;
  orderCreationDate: string | null;
  orderStatusId: number;
  productName: string | null;
  searchStatus: string;
  sellerName: string;
  shippingCompleteDate: string | null;
  shippingDate: string | null;
  userId: number;
  vnExportDate: string | null;
}

export interface CountStatus {
  count: number | null;
  searchStatus: number | null;
}

export interface ListSearchOrder {
  senderName: string;
  orderCode: string;
  orderId: string;
  receiverName: string;
  weight: string;
  orderStatus: string;
  orderStatusId: number;
  createdAt: string | null;
  confirmAt: string | null;
  jpExportDate: string | null;
  shippingCompleteDate: string | null;
  shippingDate: string | null;
  vnExportDate: string | null;
}

export interface OrderDetail {
  buyerAddress: string | null;
  buyerMobile: string | null;
  buyerName: string;
  orderId: string;
  dataUrl: string | null;
  jpBillCode: string | null;
  statusStr: string | null;
  estimatedShippingPrice: number | null;
  productName: string | null;
  estimatedWeight: number | null;
  senderName: string | null;
  receiverCountry: string | null;
  receiverAddress: string | null;
  receiverName: string | null;
  hostUrl: string;
  dateReceived: string | null;
  displayStatus: string;
  goodsName: string | null;
  id: number;
  japanCode: string;
  jpExportDate: string;
  jpShippingName: string;
  orderCode: string;
  orderCreationDate: string;
  orderStatusId: number;
  paymentStatus: number;
  searchStatus: string | null;
  sellerAddress: string;
  sellerMobile: string;
  sellerName: string;
  shippingCompleteDate: string;
  shippingCostFeeToVn: number | null;
  shippingDate: string;
  shippingFeeToVn: number | null;
  userId: number;
  vnExportDate: string;
  weight: number;
  confirmAt: string | null;
  createdAt: string | null;
  sellerWardsName: string;
  sellerDistrictName: string;
  sellerCityName: string;
  buyerWardsName: string;
  buyerDistrictName: string;
  buyerCityName: string;
}

export interface SearchOrder {
  orderIds: string;
  pageNumber: number;
  pageSize: number;
}

export interface Orders {
  senderName: string;
  receiverName: string;
  weight: string;
  orderCode: string;
  orderStatus: string;
  orderStatusId: number;
  createdAt: string | null;
  jpImportDate: string | null;
  jpExportDate: string | null;
  shippingCompleteDate: string | null;
  shippingDate: string | null;
  vnExportDate: string | null;
  vnImportDate: string | null;
}

export interface OrderItem {
  id?: number;
  imageUrls: string;
  productUrl: string;
  sellerName: string;
  vnTotalAmount: number;
  totalPrice: number;
  purchaseDate: Date | string;
  deliveryStatus: number;
}

export interface createOrederBulkParams {
  createSingleOrderRequestList: {
    userAddressId: number;
    japanCode: string;
    estimateWeight: number | null;
    estimateShippingFee: number | null;
    attachedImageUrl: string | null;
    receiverName: string;
    jpShippingTypeId: number | null;
    receiverMobile: string;
    specificAddress: string;
    cityId: number | null;
    districtId: number | null;
    wardsId: number | null;
    goodsName: string;
    pickUpTime: Date | null;
  }[];
}

export interface CreateSingleOrderParams {
  userAddressId: number;
  japanCode: string | null;
  goodsName: string;
  estimateWeight: number;
  estimateShippingFee: number;
  attachedImageUrl: string | null;
  receiverName: string;
  receiverMobile: string;
  specificAddress: string;
  wardsId: number | null;
  districtId: number | null;
  cityId: number | null;
  jpShippingTypeId: number;
  pickUpTime: Date | null;
}

export interface ShippingType {
  description: string;
  id: number;
  messageGuidel: string;
  name: string;
  value: string;
}

export interface GetEstimateShippingFeeParams {
  weight: number;
}
