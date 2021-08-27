import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import SignIn from './Login/SignIn';
import SignUp from './Login/SignUp';
import Profile from './Profile/Profile';
import ForgotPassword from './ResetPassword/ForgotPassword';
import ResetPassword from './ResetPassword/ResetPassword';

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
              <Redirect to="/home-page" />

            </Switch>;
  }
  return (
    routers
  );
};
export default AuthrizationRouters;
