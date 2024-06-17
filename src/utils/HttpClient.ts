import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import axios from 'axios';
import { baseURL } from './config';
import { Endpoints } from 'constant/endpoints';
import DateTime from './DateTime';
import LocalStorage from './LocalStorage';
import { LOGIN_PATH } from 'constant/route-path';
import { CommonResponse } from 'types/common';

const config: AxiosRequestConfig = {
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    TimeZone: DateTime.TimeZone(),
  },
  timeout: 10 * 60 * 1000, // 10 Minutes
};

class Axios {
  private instance: AxiosInstance;
  private requests: ((accessToken: string) => void)[] = [];
  private isRefreshing: boolean = false;

  constructor() {
    const instance = axios.create(config);

    // Request interceptor
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const accessToken = this.getAccessToken();
        if (config.headers) {
          if (accessToken) {
            // config.headers.Authorization = accessToken;
            config.headers.Authorization = `Bearer ${accessToken}`;
          } else {
            delete config.headers.Authorization;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const { config, response } = error;
        // Replace the entire code below with this line if the refresh token feature is not used.
        // return Promise.reject(error);

        // #region Refresh token
        const isAuthEndpoint = config.url?.startsWith('/auth');
        const isUnauthorized = response?.status === 401;

        // if (!isAuthEndpoint && isUnauthorized) {
        //   if (!this.isRefreshing) {
        //     this.isRefreshing = true;

        //     this.refreshToken()
        //       .then((response) => {
        //         const { accessToken, refreshToken } = response.data.data;
        //         this.setAccessToken(accessToken);
        //         this.setRefreshToken(refreshToken);

        //         this.onAccessTokenChanged(accessToken);
        //       })
        //       .catch((error: AxiosError<CommonResponse>) => {
        //         // Both accessToken and refreshToken are expired or invalid

        //         const isUnauthorized = error.response?.status === 401;
        //         const isInvalidToken = error.response?.status === 400;
        //         const isLogin = error.response?.data.message === 'IEM84';

        //         if (isUnauthorized || isInvalidToken || isLogin) {
        //           this.signOut();
        //         }
        //       })
        //       .finally(() => {
        //         this.isRefreshing = false;
        //       });
        //   }

        //   const request = new Promise((resolve) => {
        //     this.addRequest((accessToken: string | null) => {
        //       // Replace the expired token and retry
        //       if (config.headers) {
        //         if (accessToken) {
        //           config.headers.Authorization = `Bearer ${accessToken}`;
        //         } else {
        //           delete config.headers.Authorization;
        //         }
        //       }
        //       resolve(this.Instance(config));
        //     });
        //   });

        //   return request;
        // }

        // return Promise.reject(error);
        // #endregion
      }
    );

    // Push notification interceptor
    //   instance.interceptors.response.use(
    //     (response: AxiosResponse) => response,
    //     HttpError.unwrap
    //   );

    this.instance = instance;
  }

  public get Instance() {
    return this.instance;
  }

  private getAccessToken() {
    const accessToken: string | null = LocalStorage.get('accessToken');
    return accessToken;
  }

  private setAccessToken(accessToken: string) {
    LocalStorage.set('accessToken', accessToken);
  }

  private getRefreshToken() {
    const refreshToken: string | null = LocalStorage.get('refreshToken');
    return refreshToken;
  }

  private setRefreshToken(refreshToken: string) {
    LocalStorage.set('refreshToken', refreshToken);
  }

  private addRequest(request: (accessToken: string) => void) {
    this.requests.push(request);
  }

  private onAccessTokenChanged(accessToken: string) {
    this.requests = this.requests.filter((request) => request(accessToken));
  }

  private signOut() {
    this.requests = [];
    LocalStorage.clear();
    // Use "href" instead of "navigate" if you need to reload the login page immediately
    window.location.href = LOGIN_PATH;
  }

  private async refreshToken() {
    const refreshToken = this.getRefreshToken();
    return axios.post<{ data: { accessToken: string; refreshToken: string } }>(
      Endpoints.auth.refreshToken,
      { refreshToken },
      config
    );
  }

  // Create
  public post<D = any>(url: string): Promise<D>;
  public post<D = any, R = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  public post<D = any, R = any>(
    url: string,
    data: D,
    config: AxiosRequestConfig<D> & { integrity: true }
  ): Promise<AxiosResponse<R, D>>;
  public post<D, R>(url: string, data?: D, config: any = {}): Promise<unknown> {
    const { integrity, ...rest } = config;
    return new Promise((resolve, reject) => {
      this.Instance.post<D, AxiosResponse<R>>(url, data, rest)
        .then((response) => resolve(integrity ? response : response.data))
        .catch((error: AxiosError) => reject(error));
    });
  }

  // Read
  public get<T = any, R = T, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      this.Instance.get<T, AxiosResponse<R>, D>(url, config)
        .then((response) => resolve(response.data))
        .catch((error: AxiosError) => reject(error));
    });
  }

  // Update
  public put<D = any, R = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      this.Instance.put<D, AxiosResponse<R>>(url, data, config)
        .then((response) => resolve(response.data))
        .catch((error: AxiosError) => reject(error));
    });
  }

  // Delete
  public delete<D = any, R = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      this.Instance.delete<D, AxiosResponse<R>>(url, config)
        .then((response) => resolve(response.data))
        .catch((error: AxiosError) => reject(error));
    });
  }
}

const HttpClient = new Axios();
export default HttpClient;
