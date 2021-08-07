import { useContext, useState } from 'react'
import validator from 'validator';
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AxiosRequestConfig } from "axios";
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import Input from "../../shared/FormElements/Input";


const ForgotPassword = (props: any) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("")

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
    setErrorEmail(!validator.isEmail(email) ? "Please enter a valid email address" : "");
  }

  const isFormValid = () => {
    return validator.isEmail(email);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // const params: AxiosRequestConfig = {
    //   method: 'PATCH',
    //   url: '/users/login',
    //   params: {
    //     email,
    //   }
    // }
    // try {
    //   const response = await sendRequest(params);
    // } catch (err) { }
  }

  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Forgot Password</h2>
          <p>
            Please enter your email address and we’ll send you<br></br> instructions on how to reset your password
          </p>
          <div>
            {isLoading && <LoadingSpinner asOverlay />}
            {error && <h5 style={{ color: "red" }}>{error}</h5>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Input type="email" label="Email Address" value={email}
                  onChange={handleEmailChange} className="form-control" placeholder="Enter email" errorMessage={errorEmail} />
              </div>
              <button type="submit" disabled={!isFormValid()} className="btn btn-primary btn-block">Forgot Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ForgotPassword;
