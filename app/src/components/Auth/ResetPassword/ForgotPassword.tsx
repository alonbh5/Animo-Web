import { useContext, useState } from 'react'
import validator from 'validator';
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AxiosRequestConfig } from "axios";
import LoadingSpinner from '../../../shared/UIElements/LoadingSpinner';
import Input from "../../../shared/FormElements/Input";
import emailjs from 'emailjs-com'
import { useAlert } from 'react-alert';
const serviceId = 'service_03oxvhn';
const userID = 'user_AdbVf7bL75xL6zL117UXr';
const animoMail = '2021Animo@gmail.com'
const templateId = 'template_ojgxluk';


const ForgotPassword = (props: any) => {
  const auth = useContext(AuthContext);
  const alert = useAlert()

  const { isLoading, error, success, sendRequest, clearMessages } = useHttpClient();
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("")
  const [inputDisabled, setinputDisabled] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
    if(!validator.isEmail(e.target.value)) {
      setErrorEmail("Please enter a valid email address");
      setSubmitDisabled(true);
    } else {
      setErrorEmail("");
      setSubmitDisabled(false);
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    clearMessages();
    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/users/forgotPassword',
      data: {
        email
      },
    }
    try {
      setSubmitDisabled(true);
      const response = await sendRequest(params);
      const emailParams = {
        reply_to: animoMail,
        link: response.resetLink,
        send_to: email
      }
      await emailjs.send(serviceId, templateId, emailParams, userID)
      alert.success('Please Check Your Mailbox :)')
      setinputDisabled(true);
    } catch (err) {
      setSubmitDisabled(false);
      alert.error('Error, please try later')
    }
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
            {success && <h5 style={{ color: "blue" }}>{success}</h5>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Input disabled={inputDisabled} required={true} type="email" label="Email Address" value={email}
                  onChange={handleEmailChange} className="form-control" placeholder="Enter email" errorMessage={errorEmail} />
              </div>
              <button type="submit" disabled={submitDisabled} className="btn btn-primary btn-block">Forgot Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ForgotPassword;
