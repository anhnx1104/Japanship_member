const API_LOGIN_PATH = '/shared/auth/login';
const API_REGISTER_PATH = '/shared/user/register';
const API_VERIFY_PATH = '/auth/verify';
const API_LOGOUT_PATH = '/shared/auth/logout';
const API_FORGOT_PASSWORD_PATH = '/usersV2/forgot-password/';
const API_FORGOT_CHANGE_PASSWORD_PATH = '/auth/password/forgot/change';
const API_SEND_OTP_AGAIN_PATH = '/auth/otp';
const API_BANNER_PATH = 'banner';
const API_GET_USER_PROFILE_PATH = '/shared/user/details';
const API_UPDATE_USER_PROFILE_PATH = '/usersV2/profile';
const API_CHANGE_PASSWORD_PATH = '/usersV2/change-password';
const API_UPLOAD_IMAGE = '/file/upload-file';
const API_CHECK_EXIST_EMAIL_PHONE = 'usersV2/email/mobile/exist';
const API_GET_LIST_CITY = '/address/city/list';
const API_GET_LIST_DISTRICT = '/address/district/list';
const API_GET_LIST_WARD = '/address/wards/list';
const API_GET_LIST_ADDRESS = '/address/get';
const API_REMOVE_ADDRESS = '/address/';
const API_GET_ADDRESS = '/address/';
const API_CREATE_ADDRESS = '/address/create';
const API_UPDATE_ADDRESS = '/address/update';
const API_PRODUCT_CATEGORY = '/product/categories';
const API_PRODUCT_SEARCH = '/product/search';
const API_GET_PRODUCT_OUTSTANDING = '/product/outstanding';
const API_GET_PRODUCT_DETAIL = '/product/';
const API_UPDATE_NEWEST_PRODUCT_DETAIL = '/product/';
const API_GET_WATCHED_PRODUCT = '/product/watched_product';
const API_GET_RELATED_PRODUCT = '/product/related_product';
const API_ADD_WATCHED_PRODUCT = '/product/watched_product';
const API_ADD_TO_CART = '/product/cart';
const API_REMOVE_FROM_CART = '/product/cart/';
const API_GET_CART_ITEMS = '/product/cart';
const API_TRANSACTION_SEARCH = '/transaction/search';
const API_PRODUCT_CATEGORY_ROOT = '/product/categories/root';
const API_PRODUCT_RECOMMENDED = '/product/recommended';
const API_ESTIMATE_PRICE = '/price/estimate';
const API_PRICE_RATE = '/price/rate';
const API_ORDER_DETAIL = '/order/view_detail_order';
const API_SEARCH_ORDER_BILLCODE = '/shared/order/seach-by-bill-code';
const API_calculate_shipping_fee = '/shared/order/calculate-shipping-fee';
const API_ORDER_DETAIL_UPDATE_ADDRESS = '/order-detail/update-address';
const API_GET_ALL_NOTIFICATIONS = '/notification/search';
const API_GET_UNREAD_NOTIFICATIONS = '/notification/count-unread';
const API_SET_VIEWED_NOTIFICATIONS = '/notification/change-to-viewed';
const API_ORDER_VIEW = '/order/search-order';
const API_ORDER_LIST = '/shared/order/get-all';
const API_ORDER_SENDER_CONFIRM = '/order/update_order';
const API_GET_LIST_ADDRESS_SENDER = '/shared/user/get-all';
const API_ADDRESS_LIST_SENDER = '/address/list';
const API_PROFILE_CITY_SENDER = '/address/city/';
const API_PROFILE_DISTRICT_SENDER = '/address/district/';
const API_PROFILE_WARDS_SENDER = '/address/wards/';
const API_CREATE_SENDER_ADDRESS = '/sender/create';

export {
  API_LOGIN_PATH,
  API_REGISTER_PATH,
  API_VERIFY_PATH,
  API_LOGOUT_PATH,
  API_FORGOT_PASSWORD_PATH,
  API_FORGOT_CHANGE_PASSWORD_PATH,
  API_SEND_OTP_AGAIN_PATH,
  API_BANNER_PATH,
  API_GET_USER_PROFILE_PATH,
  API_UPDATE_USER_PROFILE_PATH,
  API_CHANGE_PASSWORD_PATH,
  API_UPLOAD_IMAGE,
  API_CHECK_EXIST_EMAIL_PHONE,
  API_GET_LIST_CITY,
  API_GET_LIST_DISTRICT,
  API_GET_LIST_WARD,
  API_GET_LIST_ADDRESS,
  API_REMOVE_ADDRESS,
  API_CREATE_ADDRESS,
  API_UPDATE_ADDRESS,
  API_GET_ADDRESS,
  API_PRODUCT_CATEGORY,
  API_PRODUCT_SEARCH,
  API_GET_PRODUCT_OUTSTANDING,
  API_GET_PRODUCT_DETAIL,
  API_UPDATE_NEWEST_PRODUCT_DETAIL,
  API_GET_WATCHED_PRODUCT,
  API_GET_RELATED_PRODUCT,
  API_ADD_WATCHED_PRODUCT,
  API_ADD_TO_CART,
  API_REMOVE_FROM_CART,
  API_GET_CART_ITEMS,
  API_TRANSACTION_SEARCH,
  API_PRODUCT_CATEGORY_ROOT,
  API_PRODUCT_RECOMMENDED,
  API_ESTIMATE_PRICE,
  API_PRICE_RATE,
  API_SEARCH_ORDER_BILLCODE,
  API_calculate_shipping_fee,
  API_ORDER_DETAIL,
  API_ORDER_DETAIL_UPDATE_ADDRESS,
  API_SET_VIEWED_NOTIFICATIONS,
  API_ORDER_VIEW,
  API_GET_ALL_NOTIFICATIONS,
  API_GET_UNREAD_NOTIFICATIONS,
  API_GET_LIST_ADDRESS_SENDER,
  API_ORDER_LIST,
  API_ORDER_SENDER_CONFIRM,
  API_ADDRESS_LIST_SENDER,
  API_PROFILE_CITY_SENDER,
  API_PROFILE_DISTRICT_SENDER,
  API_PROFILE_WARDS_SENDER,
  API_CREATE_SENDER_ADDRESS,
};
