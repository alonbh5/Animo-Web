import React, { useState, useEffect, useCallback } from 'react'
import { Navigation } from './components/HomePage/Navigation'
import { Header } from './components/HomePage/Header'
import { About } from './components/HomePage/About'
import { Profile } from './components/Auth/Profile'
import { Team } from './components/HomePage/Team'
import { Contact } from './components/HomePage/Contact'
import JsonData from './data/data.json'
import {  ResetPassword } from "./components/Auth/ResetPassword"
import {ForgotPassword} from './components/Auth/ForgotPassword'
import SmoothScroll from 'smooth-scroll'
import { SignIn } from "./components/Auth/SignIn"
import { SignUp } from "./components/Auth/SignUp"
import { EmotionalAnalysis } from './components/Pages/EmotionalAnalysis';
import { TipsAndArticals } from './components/Pages/TipsAndArticals';
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
  const homepage = (<Route path='/home-page'>
    <Header data={landingPageData.Header} />
    <About data={landingPageData.About} />
    <Team data={landingPageData.Team} />
    <Contact data={landingPageData.Contact} />
  </Route>);

  let routes;
  if (!token) {
    routes = (<Switch>
      {homepage}
      <Route path='/analyze'>
        <EmotionalAnalysis data={landingPageData.About} />
      </Route>
      <Route path='/tips'>
        <TipsAndArticals/>
      </Route>
      <Route path="/login">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/forgotPassword">
        <ForgotPassword />
      </Route>
      <Route path="/resetPassword">
        <ResetPassword />
      </Route>
      <Redirect to="/home-page" />
    </Switch>);
  } else {
    routes = (<Switch>
      {homepage}
      <Route path='/analyze'>
        <EmotionalAnalysis data={landingPageData.About} />
      </Route>
      <Route path='/tips'>
        <TipsAndArticals/>
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Redirect to="/home-page" />
    </Switch>);
  }

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
        {routes}
      </div>
    </AuthContext.Provider>
  )
}
export default App