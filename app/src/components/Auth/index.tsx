import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import { AxiosRequestConfig } from 'axios';
import Chat from '../Chat/Chat';
import { Header } from '../HomePage/Header';
import { About } from '../HomePage/About';
import { Team } from '../HomePage/Team';
import { Contact } from '../HomePage/Contact';
import JsonData from '../../data/data.json';
import { useHttpClient } from '../../shared/hooks/http-hook';

import { User } from '../api/configuration/models/users';
const Messaging = React.lazy(() => import('../MyNetwork/Messaging'));

const MyNetwork = React.lazy(() => import('../MyNetwork/MyNetwork'));
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
  const user = auth.user as User;
  const [allUsers, setAllUsers] = useState<User[]|undefined>();
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const featchAllUsers = async () => {
      const params: AxiosRequestConfig = {
        method: 'GET',
        url: '/users'
      };
      try {
        const response = await sendRequest(params);
        console.log(response.data.allUser);
        setAllUsers(response.data.allUser as User[]);
      } catch (err) {
      }
    };
    featchAllUsers();
  }, []);

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
              {user._id && allUsers &&
              <Route path='/mynetwork'>
                <MyNetwork user={user} allUsers={allUsers}/>
              </Route>}
              {user._id &&
              <Route path='/messaging'>
                <Messaging user={user}/>
              </Route>}
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
