import React, { useState, Suspense } from 'react';
import JsonData from './data/data.json';
import SmoothScroll from 'smooth-scroll';
import { Navigation } from './components/HomePage/Navigation';
import { Header } from './components/HomePage/Header';
import { About } from './components/HomePage/About';
import { Team } from './components/HomePage/Team';
import { Contact } from './components/HomePage/Contact';
import { Switch, Route } from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import AuthrizationRouters from './components/Auth';
import { ModalProvider } from 'react-simple-hook-modal';
import LoadingSpinner from './shared/UIElements/LoadingSpinner';

const EmotionalAnalysis = React.lazy(() =>
  import('./components/Pages/EmotionalAnalysis'));

const TipsAndArticles = React.lazy(() =>
  import('./components/Pages/TipsAndArticles'));

const PersonalQuiz = React.lazy(() =>
  import('./components/Pages/PersonalityQuiz'));

const SOS = React.lazy(() =>
  import('./components/Pages/SOS'));

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true
});

const App = () => {
  const [landingPageData] = useState(JsonData);
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
        <Switch>

          <Suspense fallback={<LoadingSpinner/>}>
            <Route path='/home-page'>
              <Header data={landingPageData.Header} />
              <About data={landingPageData.About} />
              <Team data={landingPageData.Team} />
              <Contact data={landingPageData.Contact} />
            </Route>
            <Route path='/personalquiz'>
              <PersonalQuiz />
            </Route>
            <Route path='/analyze'>
              <EmotionalAnalysis data={landingPageData.About} />
            </Route>
            <Route path='/tips'>
              <TipsAndArticles />
            </Route>
            <Route path='/sos'>
              <SOS data={landingPageData.About} />
            </Route>
            <AuthrizationRouters />
          </Suspense>
        </Switch>
      </ModalProvider>
    </AuthContext.Provider>
  );
};
export default App;
