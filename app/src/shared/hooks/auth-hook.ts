import { useState, useCallback, useEffect } from 'react';
import { User } from '../../components/api/configuration/models/users';
import { Role } from '../../components/api/configuration/models/role';
import { AxiosRequestConfig } from 'axios';
import { useHttpClient } from "./http-hook";

let logoutTimer: NodeJS.Timeout;

const initalUser = {
  id: undefined,
  role_id: undefined,
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  password: undefined,
  age: undefined,
  gender: undefined,
}

const initRole = {
  role_id: undefined,
  Permissions: undefined,
  role_type: undefined,
}

export const useAuth = () => {
  const [token, setToken] = useState(undefined);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | undefined>(undefined);
  const [userId, setUserId] = useState(undefined);
  const [user, setUser] = useState<User>(initalUser);
  const [userRoleType, setUserRoleType] = useState<Role>(initRole);

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

  const fetchUser = async () => {
    try {
      const params: AxiosRequestConfig = {
        method: 'GET',
        url: `/users/getuser/${userId}`,
        headers: {
          Authorization: 'Bearer ' + token
        }
      }

      const responseUser = await sendRequest(params);
      const data = responseUser.data;

      setUser({
        id: data._id,
        role_id: data.role_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        age: data.age,
        gender: data.gender,
        persQuiz: data.persQuiz,
        personality: data.personality
      });

      const paramsRole: AxiosRequestConfig = {
        method: 'GET',
        url: `/roles/${data.role_id}`,
      }
      const responseRole = await sendRequest(paramsRole);
      setUserRoleType(responseRole.data.role);
    } catch (err) { }
  }
  useEffect(() => {
    if (userId) {
      fetchUser();
    } 
  }, [userId]);



  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
    setUser(initalUser);
    setUserRoleType(initRole);
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

  return { token, login, logout, userId, user, userRole: userRoleType, fetchUser };
};