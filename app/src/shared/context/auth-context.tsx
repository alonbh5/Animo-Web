import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false, userId: undefined, user: {}, token: undefined, login: (uid: string, token: string, expirationDate?: any) => { }, logout: () => {
    }
})