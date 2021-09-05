import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';

const ManageUsers = React.lazy(() =>
  import('../AdminPanel/ManageUsers'));
const ResetPassword = React.lazy(() =>
  import('./ResetPassword/ResetPassword'));
const ForgotPassword = React.lazy(() =>
  import('./ResetPassword/ForgotPassword'));
const Profile = React.lazy(() => import('./Profile/Profile'));
const SignIn = React.lazy(() => import('./Login/SignIn'));
const SignUp = React.lazy(() => import('./Login/SignUp'));
const AboutMe = React.lazy(() => import('../PsycPanel/AbouMe'));

const AuthrizationRouters = () => {
  const auth = useContext(AuthContext);
  let routers;

  if (!auth.isLoggedIn) {
    routers =
            <Switch>
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
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path='/manageUsers'>
                <ManageUsers/>
              </Route>
              <Route path='/aboutMePsycoligist'>
                <AboutMe/>
              </Route>
              <Redirect to="/home-page" />
            </Switch>;
  }
  return (
    routers
  );
};
export default AuthrizationRouters;
