import React, { Suspense } from 'react';
import SmoothScroll from 'smooth-scroll';
import { Navigation } from './components/HomePage/Navigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import AuthrizationRouters from './components/Auth';
import { ModalProvider } from 'react-simple-hook-modal';
import LoadingSpinner from './shared/UIElements/LoadingSpinner';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true
});

const App = () => {
  const {
    token, login, logout, userId, user,
    userRole, fetchUser, updateStatus
  } = useAuth();
  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout,
      user: user,
      userRole: userRole,
      fetchUser: fetchUser,
      updateStatus: updateStatus
    }}>
      <ModalProvider>
        <Navigation />
        <Suspense fallback={<LoadingSpinner/>}>
          <AuthrizationRouters />
        </Suspense>
      </ModalProvider>
    </AuthContext.Provider>
  );
};
export default App;
