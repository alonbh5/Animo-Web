import { useContext, useState, useEffect } from 'react';
import validator from 'validator';
import AuthContext from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AxiosRequestConfig } from 'axios';
import Status from '../../../shared/UIElements/Status';
import Input from '../../../shared/FormElements/Input';
import queryString from 'query-string';
import PageLayout from '../../../shared/UIElements/PageLayout';

const initialState = {
  Password: '',
  ConfirmPassword: ''
};

const ResetPassword = (props: any) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearMessages } = useHttpClient();
  const [{ Password, ConfirmPassword }, setState] = useState(initialState);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  useEffect(() => {
    if (!validator.isEmpty(Password) && Password === ConfirmPassword) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  }, [Password, ConfirmPassword]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    clearMessages();
    const parsedQuery = queryString.parse(window.location.search);
    const params: AxiosRequestConfig = {
      method: 'PATCH',
      url: '/users/resetPassword',
      params: {
        token: parsedQuery.token,
        userId: parsedQuery.userId,
        password: Password
      }
    };
    try {
      const response = await sendRequest(params);
      auth.login(response.data.userId, response.data.token);
    } catch (err) { }
  };

  return (
    <PageLayout title='Reset Password' cols={true}>
      <p>
            For reset your password, please type your email address
      </p>
      <div>
        <Status isLoading={isLoading} error={error} />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              type="password"
              name="Password"
              label="New Password"
              value={Password}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <Input
              type="password"
              name="ConfirmPassword"
              label="Confirm Password"
              value={ConfirmPassword}
              onChange={handleChange}
              className="form-control"
              errorMessage={
                !isPasswordMatch &&
                    !validator.isEmpty(ConfirmPassword)
                  ? 'Those passwords didn\'t match. Try again'
                  : ''} />
          </div>
          <button
            type="submit"
            disabled={!isPasswordMatch}
            className="btn btn-primary btn-block"
          >
                  Reset Password
          </button>
        </form>
      </div>
    </PageLayout>
  );
};

export default ResetPassword;
