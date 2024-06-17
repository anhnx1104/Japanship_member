import {
  API_GET_ALL_NOTIFICATIONS,
  API_GET_UNREAD_NOTIFICATIONS,
  API_SET_VIEWED_NOTIFICATIONS,
} from 'constant/api-path';
import { CommonResponse } from 'types/common';
import { FilterNotification, NotificationType } from 'types/notification';
import HttpClient from 'utils/HttpClient';

class Notification {
  public getAllNotification(params: FilterNotification) {
    return HttpClient.post<typeof params, CommonResponse<NotificationType[]>>(
      API_GET_ALL_NOTIFICATIONS,
      params
    );
  }

  public getUnReadNotification(params: { userCode: string }) {
    return HttpClient.get<typeof params, CommonResponse>(
      API_GET_UNREAD_NOTIFICATIONS,
      { params }
    );
  }

  public setViewNotification(params: { notificationId: number }) {
    return HttpClient.put<typeof params, CommonResponse>(
      API_SET_VIEWED_NOTIFICATIONS,
      params
    );
  }
}

export default new Notification();
