import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useCallback } from 'react';

interface ApiError {
  success: false;
  data: {
    message: string;
  };
}

const useApi = () => {
  const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://your-api-url.com', 
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ApiError>) => {
      if (
        error.response &&
        error.response.data &&
        error.response.data.data.message === 'این درخواست نیاز به ورود به سایت دارد.'
      ) {
        console.error('Error: Token invalid or login required');
        // در صورت نیاز می‌توانید کاربر را به صفحه لاگین هدایت کنید
        // window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  const sendRequest = useCallback(
    async <T = any>(config: AxiosRequestConfig): Promise<T> => {
      try {
        const response = await apiClient(config);
        return response.data as T;
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    [apiClient]
  );

  return { sendRequest };
};

export default useApi;
