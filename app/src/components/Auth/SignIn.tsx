import { useContext, useState } from 'react'
import validator from 'validator';
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AxiosRequestConfig } from "axios";
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import Input from "../../shared/FormElements/Input";
import { Link } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
}

const SignIn = (props: any) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearMessages } = useHttpClient();
  const [{ email, password }, setState] = useState(initialState)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const isFormValid = () => {
    return validator.isEmail(email) && !validator.isEmpty(password);
  }

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
    }
    try {
      const response = await sendRequest(params);
      auth.login(response.data.userId, response.data.token);
    } catch (err) { }
  }

  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Sign In</h2>
          <p>
            For using our platform, you should first sign in
          </p>
          <div>
            {isLoading && <LoadingSpinner asOverlay />}
            {error && <h5 style={{ color: "red" }}>{error}</h5>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Input type="email" required={true} name="email" label="Email Address" value={email}
                  onChange={handleChange} className="form-control" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <Input type="password" required={true} label="Password" name="password" value={password}
                  onChange={handleChange} className="form-control" placeholder="Enter password" />
              </div>
              <button type="submit" disabled={!isFormValid()} className="btn btn-primary btn-block">Submit</button>
              <br></br>
              <p >
                <Link to="/forgotPassword" className='page-scroll'>Forgot password?
                </Link>
                {" "} \   <Link to="/signup" className='page-scroll'>Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn;