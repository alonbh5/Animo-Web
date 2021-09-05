/* eslint-disable */
import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);

  const sendRequest = useCallback(async (params: AxiosRequestConfig) => {
    params.baseURL = process.env.REACT_APP_BACKEND_URL;
    setIsLoading(true);
    clearMessages();
    try {
      const result = await axios.request(params);
      setSuccess(result.data.message);
      return result.data;
    } catch (error) {
      setError(error?.response?.data?.message || "We have some internal issue, please try later");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = () => {
    setError(undefined);
    setSuccess(undefined);
  };

  return { isLoading: isLoading, error, success, sendRequest, clearMessages };
};
