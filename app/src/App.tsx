import JsonData from './data/data.json';
import SmoothScroll from 'smooth-scroll';
import { useState } from 'react';
import { Navigation } from './components/HomePage/Navigation';
import { Header } from './components/HomePage/Header';
import { About } from './components/HomePage/About';
import { Team } from './components/HomePage/Team';
import { Contact } from './components/HomePage/Contact';
import { EmotionalAnalysis } from './components/Pages/EmotionalAnalysis';
import { TipsAndArticals } from './components/Pages/TipsAndArticals';
import { Switch, Route } from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import PersonalQuiz from './components/Pages/PersonalityQuiz';
import AuthrizationRouters from './components/Auth';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true
});

const App = () => {
  const [landingPageData] = useState(JsonData);
  const { token, login, logout, userId, user, userRole, fetchUser } = useAuth();
  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout,
      user: user,
      userRole: userRole,
      fetchUser: fetchUser
    }}>
      <Navigation />
      <Switch>
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
          <TipsAndArticals />
        </Route>
        <AuthrizationRouters />
      </Switch>
    </AuthContext.Provider>
  );
};
export default App;
