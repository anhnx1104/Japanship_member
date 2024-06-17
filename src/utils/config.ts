const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : 'http://localhost:3000';

const adminSocketURL = process.env.NEXT_PUBLIC_SOCKET_ADMIN
  ? process.env.NEXT_PUBLIC_SOCKET_ADMIN
  : 'http://localhost:3000';

const clientSocketURL = process.env.NEXT_PUBLIC_SOCKET_CLIENT
  ? process.env.NEXT_PUBLIC_SOCKET_CLIENT
  : 'http://localhost:3000';

const version = process.env.NEXT_PUBLIC_VERSION;

export { baseURL, version, adminSocketURL, clientSocketURL };
export const __DEV__ = process.env.NODE_ENV === 'development';
