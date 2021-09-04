import { useState, useCallback, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';
import { useHttpClient } from './http-hook';

export const useRoles = () => {
  const { sendRequest } = useHttpClient();
  const [rolesOptions, setRolesOptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      const params: AxiosRequestConfig = {
        method: 'GET',
        url: '/roles'
      };
      try {
        const response = await sendRequest(params);
        setRolesOptions(response.data.allRoles);
      } catch (err) {
        setRolesOptions([]);
        setError('Could not fetch roles');
      }
    };
    fetchRoles();
  }, []);

  const getRoleById = useCallback(async (roleId: number) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/roles/${roleId}`
    };
    try {
      const response = await sendRequest(params);
      return response.data.role;
    } catch {
      setError('Could not fetch roles');
    }
  }, []);

  return { rolesOptions, getRoleById, error };
};
