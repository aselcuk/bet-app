import axios, { type InternalAxiosRequestConfig } from 'axios';

const Request = (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  config.params = {
    ...config.params,
    apiKey: import.meta.env.VITE_ODDS_API_KEY
  };

  return new Promise((resolve) => {
    resolve(config);
  });
};

/**
 *
 */
const axiosInstance = axios.create({
  baseURL: 'https://api.the-odds-api.com/v4',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(Request, null);

export default axiosInstance;
