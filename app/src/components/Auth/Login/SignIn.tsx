import React, { useContext, useState } from 'react';
import validator from 'validator';
import AuthContext from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AxiosRequestConfig } from 'axios';
import Status from '../../../shared/UIElements/Status';
import Input from '../../../shared/FormElements/Input';
import { Link } from 'react-router-dom';
import PageLayout from '../../../shared/UIElements/PageLayout';

const initialState = {
  email: '',
  password: ''
};

const SignIn = (props: any) => {
  const auth = useContext(AuthContext);
  const {
    isLoading, error, sendRequest,
    clearMessages, success
  } = useHttpClient();
  const [{ email, password }, setState] = useState(initialState);
  const [disabled, setDisabled] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isFormValid = () => {
    return validator.isEmail(email) && !validator.isEmpty(password);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    clearMessages();
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/users/login',
      params: {
        email,
        password
      }
    };
    const response = await sendRequest(params);
    if (response.data.status === 'confirm') {
      setDisabled(true);
    } else if (response.data.status === 'login') {
      auth.login(response.data.userId, response.data.token);
    }
  };

  return (
    <PageLayout title='Sign In' cols={true}>
      <p>
            For using our platform, you should first sign in
      </p>
      <div>
        <Status isLoading={isLoading} error={error} success={success} />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              type="email"
              disabled={disabled}
              required={true}
              name="email"
              label="Email Address"
              value={email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter email" />
          </div>
          <div className="form-group">
            <Input
              type="password"
              disabled={disabled}
              required={true}
              label="Password"
              name="password"
              value={password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password" />
          </div>
          <button
            type="submit"
            disabled={!isFormValid() || disabled}
            className="btn btn-primary btn-block">Submit</button>
          <br></br>
          <p >
            <Link
              to="/forgotPassword"
              className='page-scroll'>
                    Forgot password?
            </Link>
            {' '} \
            <Link
              to="/signup"
              className='page-scroll'>
                      Register
            </Link>
          </p>
        </form>
      </div>
    </PageLayout>
  );
};
export default SignIn;
