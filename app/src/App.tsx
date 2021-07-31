import React, { useState, useEffect, useCallback } from 'react'
import { Navigation } from './components/Navigation'
import { Header } from './components/Header'
import { Features } from './components/Features'
import { About } from './components/About'
import { Profile } from './components/Profile'
import { Gallery } from './components/Gallery'
import { Testimonials } from './components/Testimonials'
import { Team } from './components/Team'
import { Contact } from './components/Contact'
import JsonData from './data/data.json'
import SmoothScroll from 'smooth-scroll'
import { SignIn } from "./components/SignIn"
import { SignUp } from "./components/SignUp"
import { EmotionalAnalysis } from './components/EmotionalAnalysis'
import { Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hook';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
})

const App = () => {

  const [landingPageData, setLandingPageData] = useState(JsonData)
  const { token, login, logout, userId } = useAuth();


  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout
    }}>
      <div>
        <Navigation />
        <Switch>
          <React.Fragment>
            <Route path='/home-page'>
              <Header data={landingPageData.Header} />
              <About data={landingPageData.About} />
              <Team data={landingPageData.Team} />
              <Contact data={landingPageData.Contact} />
            </Route>
            <Route path='/analyze'>
              <EmotionalAnalysis data={landingPageData.About} />
            </Route>
            {!token && <Route path="/login">
              <SignIn />
            </Route>}
            {!token && <Route path="/login">
              <SignIn />
            </Route>}
            {token && <Route exact path="/login" render={() =>
              <Redirect to="/home-page" />
            }
            />}
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </React.Fragment >
        </Switch>
        <Route exact path="/" render={() =>
          <Redirect to="/home-page" />
        }
        />
      </div>
    </AuthContext.Provider>
  )
}

export default App