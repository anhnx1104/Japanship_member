export interface NotificationType {
  id: number;
  customerCode: string;
  content: string;
  notificationType: number;
  notificationDetailUrl: string;
  isViewed: boolean;
  createdAt: Date;
  productId: string;
  billCode: null;
}

export interface FilterNotification {
  userCode: string;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
}
