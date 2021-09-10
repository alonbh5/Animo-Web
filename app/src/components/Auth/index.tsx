import React, { useContext, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import Chat from '../Chat/Chat';
import { Header } from '../HomePage/Header';
import { About } from '../HomePage/About';
import { Team } from '../HomePage/Team';
import { Contact } from '../HomePage/Contact';
import JsonData from '../../data/data.json';

const ManageUsers = React.lazy(() =>
  import('../AdminPanel/ManageUsers'));
const ResetPassword = React.lazy(() =>
  import('./ResetPassword/ResetPassword'));
const ForgotPassword = React.lazy(() =>
  import('./ResetPassword/ForgotPassword'));
const InvitePsychologist =
React.lazy(() => import('../AdminPanel/InvitePsychologist'));
const Profile = React.lazy(() => import('./Profile/Profile'));
const SignIn = React.lazy(() => import('./Login/SignIn'));
const SignUp = React.lazy(() => import('./Login/SignUp'));
const AboutMe = React.lazy(() => import('../PsycPanel/AbouMe'));
const EmotionalAnalysis = React.lazy(() =>
  import('../Pages/EmotionalAnalysis'));
const TipsAndArticles = React.lazy(() =>
  import('../Pages/TipsAndArticles'));
const PersonalQuiz = React.lazy(() =>
  import('../Pages/PersonalityQuiz'));
const Sos = React.lazy(() =>
  import('../Pages/SOS'));

const AuthrizationRouters = () => {
  const auth = useContext(AuthContext);
  let routers;
  const [landingPageData] = useState(JsonData);

  if (!auth.isLoggedIn) {
    routers =
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
              <Route path='/chat'>
                <Chat/>
              </Route>
              <Route path='/analyze'>
                <EmotionalAnalysis data={landingPageData.About} />
              </Route>
              <Route path='/tips'>
                <TipsAndArticles />
              </Route>
              <Route path='/sos'>
                <Sos />
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
            </Switch>;
  } else {
    routers =
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
              <Route path='/chat'>
                <Chat/>
              </Route>
              <Route path='/analyze'>
                <EmotionalAnalysis data={landingPageData.About} />
              </Route>
              <Route path='/tips'>
                <TipsAndArticles />
              </Route>
              <Route path='/sos'>
                <Sos />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path='/manageUsers'>
                <ManageUsers/>
              </Route>
              <Route path='/aboutMePsycoligist'>
                <AboutMe/>
              </Route>
              <Route path='/invitePsychologist'>
                <InvitePsychologist/>
              </Route>
              <Redirect to="/home-page" />
            </Switch>;
  }
  return (
    routers
  );
};

export default AuthrizationRouters;
