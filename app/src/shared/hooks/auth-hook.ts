import { useState, useCallback, useEffect } from 'react';

let logoutTimer: NodeJS.Timeout;

export const useAuth = () => {
  const [token, setToken] = useState(undefined);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date|undefined>(undefined);
  const [userId, setUserId] = useState(undefined);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    console.log(uid);
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
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer  = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData') ?? "");
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, login, logout, userId };
};