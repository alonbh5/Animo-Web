import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
export const serverAPIPort = 3000;
export const host = 'http://localhost';
export const APIRootPath = `${host}:${serverAPIPort}`;
export const staticsPort = 3001;
export const staticsUrl = `${host}:${staticsPort}/`;

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);

  const sendRequest = useCallback(async (params: AxiosRequestConfig) => {
    params.baseURL = `${APIRootPath}`;
    setIsLoading(true);
    clearMessages();
    try {
      const result = await axios.request(params);
      setSuccess(result.data.message);
      return result.data;
    } catch (error) {
      setError(error.response.data.message);
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
