import {
  API_ORDER_DETAIL,
  API_ORDER_DETAIL_UPDATE_ADDRESS,
  API_SEARCH_ORDER_BILLCODE,
  API_calculate_shipping_fee,
} from 'constant/api-path';
import { CommonResponse } from 'types/common';
import {
  EditOrderDetailAddress,
  ListSearchOrder,
  OrderDetail,
  confirmSender,
  ListOrder,
  SearchOrder,
  createOrederBulkParams,
  ShippingType,
  CreateSingleOrderParams,
  GetEstimateShippingFeeParams,
  CountStatus,
} from 'types/order';
import HttpClient from 'utils/HttpClient';
import {
  API_ORDER_VIEW,
  API_ORDER_LIST,
  API_ORDER_SENDER_CONFIRM,
} from 'constant/api-path';
import { FilterParams } from 'components/Orders/utils/filters';
import { Endpoints } from 'constant/endpoints';

class Order {
  public getOrderList(params: FilterParams) {
    return HttpClient.post<typeof params, CommonResponse<ListOrder[]>>(
      API_ORDER_LIST,
      params
    );
  }
  public getOrderListTest1(params: any) {
    return HttpClient.post<typeof params, CommonResponse<ListOrder[]>>(
      API_ORDER_LIST,
      params
    );
  }
  public confirmSenders(params: confirmSender) {
    return HttpClient.put<typeof params, CommonResponse<ListOrder[]>>(
      API_ORDER_SENDER_CONFIRM,
      params
    );
  }

  public search(params: SearchOrder) {
    return HttpClient.post<typeof params, CommonResponse<ListSearchOrder[]>>(
      API_ORDER_VIEW,
      params
    );
  }

  public searchOrderBillCode(billCode: string) {
    return HttpClient.get<null, CommonResponse>(
      `${API_SEARCH_ORDER_BILLCODE}?billCode=${billCode}`
    );
  }
  public searchCalculateShippingFee(weight: string) {
    return HttpClient.get<null, CommonResponse>(
      `${API_calculate_shipping_fee}?weight=${weight}`
    );
  }
  public getEstimatFee(params: SearchOrder) {
    return HttpClient.post<typeof params, CommonResponse<any>>(
      API_ORDER_VIEW,
      params
    );
  }

  public getOrderDetail(orderDetailId: string) {
    return HttpClient.get<null, CommonResponse<OrderDetail>>(
      `${API_ORDER_DETAIL}?orderDetailId=${orderDetailId}`
    );
  }

  public updateOrderAddress(data: EditOrderDetailAddress) {
    return HttpClient.put<EditOrderDetailAddress, CommonResponse<OrderDetail>>(
      `${API_ORDER_DETAIL_UPDATE_ADDRESS}`,
      data
    );
  }
}

export default new Order();

export const getOrderDetail = (params: { orderId: string }) => {
  return HttpClient.get<typeof params, CommonResponse<OrderDetail>>(
    Endpoints.orders.detail,
    {
      params,
    }
  );
};

export const createOrderBulk = (params: createOrederBulkParams) => {
  return HttpClient.post<typeof params, CommonResponse>(
    Endpoints.orders.createOrderBulk,
    params
  );
};

export const getShippingType = () => {
  return HttpClient.get<null, CommonResponse<ShippingType[]>>(
    '/shared/app-key-config/get-all-children-by-key-name?keyName=DeliveryToJpWarehouseMethod'
  );
};
export const countStatusOrder = () => {
  return HttpClient.get<null, CommonResponse<CountStatus[]>>(
    Endpoints.sender.count
  );
};

export const createSingleOrder = (params: any) => {
  return HttpClient.post<typeof params, CommonResponse>(
    Endpoints.orders.createSingleOrder,
    params
  );
};

export const getEstimateShippingFee = (
  params: GetEstimateShippingFeeParams
) => {
  return HttpClient.post<typeof params, CommonResponse>(
    Endpoints.orders.getEstimateShippingFee,
    params
  );
};
