import { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from "../../shared/context/auth-context"
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

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
            </Switch>
    } else {
        routers =
            <Switch>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Redirect to="/home-page" />

            </Switch>
    }
    return (
        routers
    )
}
export default AuthrizationRouters;