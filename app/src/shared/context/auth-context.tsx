import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: undefined,
  token: undefined,
  login: (uid: string, token: string, expirationDate?: any) => { },
  logout: () => {
  },
  user: {},
  userRole: {},
  fetchUser: async () => {}
});
