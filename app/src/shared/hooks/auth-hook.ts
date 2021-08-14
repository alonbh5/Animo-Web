import { useState, useCallback, useEffect } from 'react';
import { User } from '../../components/api/configuration/models/users';
import { AxiosRequestConfig } from 'axios';
import { useHttpClient } from "./http-hook";

let logoutTimer: NodeJS.Timeout;

export const useAuth = () => {
  const [token, setToken] = useState(undefined);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date|undefined>(undefined);
  const [userId, setUserId] = useState(undefined);
  const [user, setUser] = useState<User>({          id: "",
    role_id: undefined,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: undefined,
    gender: "",})
  const { isLoading, error, sendRequest, clearMessages } = useHttpClient();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(undefined);
    setTokenExpirationDate(undefined);
    setUserId(undefined);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const params: AxiosRequestConfig = {
          method: 'GET',
          url: `/users/getuser/${userId}`,
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      
        const response = await sendRequest(params);
        const data = response.data;
        setUser({
          id: data._id,
          role_id: data.role_id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
          age: data.age,
          gender: data.gender,
        });
      } catch (err) { }
    }

    if (userId) {
      fetchUser();
    } 

  }, [userId]);


  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer  = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
    setUser({})
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
  
    //@ts-ignore
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {

      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, login, logout, userId, user };
};