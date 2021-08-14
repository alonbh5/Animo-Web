import { useState } from 'react'
import { Navigation } from './components/HomePage/Navigation'
import { Header } from './components/HomePage/Header'
import { About } from './components/HomePage/About'
import { Team } from './components/HomePage/Team'
import { Contact } from './components/HomePage/Contact'
import JsonData from './data/data.json'
import SmoothScroll from 'smooth-scroll'
import { EmotionalAnalysis } from './components/Pages/EmotionalAnalysis';
import { TipsAndArticals } from './components/Pages/TipsAndArticals';
import { Switch, Route } from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context'
import { UserContext } from './shared/context/user-context'
import { useAuth } from './shared/hooks/auth-hook';
import AuthrizationRouters from './components/Auth'
import { useUser } from './shared/hooks/user-hook'

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
})

const App = () => {
  const [landingPageData, setLandingPageData] = useState(JsonData)
  const { token, login, logout, userId, user, userRole } = useAuth();
  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout,
      user: user,
      userRole: userRole,
    }}>
        <Navigation />
        <Switch>
          <Route path='/home-page'>
            <Header data={landingPageData.Header} />
            <About data={landingPageData.About} />
            <Team data={landingPageData.Team} />
            <Contact data={landingPageData.Contact} />
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
  )
}
export default App