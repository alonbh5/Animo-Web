import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AxiosRequestConfig } from 'axios';
import validator from 'validator';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import Input from '../../shared/FormElements/Input';
import { User } from '../api/configuration/models/users';

const AboutMe = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as User;

  console.log(user.phone);
  console.log(user.aboutMe);

  const [{
    phone,
    aboutMe
  }, setState] = useState({
    phone: user.phone as string,
    aboutMe: user.aboutMe as string
  });
  const [errorPhone, setErrorPhone] = useState<string>('');
  const [errorAboutMe, setErrorAboutMe] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [disabled, setDisabled] = useState(false);
  const {
    isLoading, error, sendRequest,
    clearMessages, success
  } = useHttpClient();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (validator.isMobilePhone(phone, 'he-IL') || validator.isEmpty(phone)) {
      setErrorPhone('');
    } else {
      setErrorPhone('Please enter a valid phone number');
    }
    let aboutMeError = '';
    if (validator.isEmpty(aboutMe)) {
      aboutMeError = 'You must write something about yourself.';
    } else if (aboutMe.length < 75) {
      aboutMeError = 'You must write at least 50 words about yourself';
    }
    setErrorAboutMe(aboutMeError);
  }, [phone, aboutMe]);

  const isFormValid = () => {
    return (
      validator.isMobilePhone(phone, 'he-IL') &&
      !validator.isEmpty(aboutMe) &&
      (aboutMe.length >= 75));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    clearMessages();
    const data = {
      userId: auth.userId,
      phone,
      aboutMe
    };

    console.log(auth.userId);
    console.log(data);

    const params: AxiosRequestConfig = {
      method: 'PATCH',
      url: `/users/updateUserAboutMe/${auth.userId}`,
      data: {
        ...data
      },
      headers: {
        Authorization: 'Bearer ' + auth.token
      }
    };
    try {
      const response = await sendRequest(params);
      if (response.data.status === 'login') {
        auth.login(response.data.userId, response.data.token);
      } else {
        setDisabled(true);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>About Me</h2>
          <p>
            Here you can write information for general users to know you better.
            <br/>
            They can see this information
            as long as you are connected to the app.
          </p>
          <h5 style={{ color: 'red' }}>{errorMsg}</h5>
          <div>
            <form onSubmit={handleSubmit}>
              {isLoading && <LoadingSpinner asOverlay />}
              {error && <h5 style={{ color: 'red' }}>{error}</h5>}
              {success && <h5 style={{ color: 'blue' }}>{success}</h5>}
              <div className="form-group">
                <Input
                  className="form-control"
                  disabled={disabled}
                  required={true}
                  type="phone"
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={handleChange} />
              </div>
              <div className="error-msg">{errorPhone}</div>

              <div className="form-group">
                <label htmlFor="aboutMe">About Me</label>
                <textarea
                  style={{ height: '100px' }}
                  className="form-control"
                  required={true}
                  name="aboutMe"
                  placeholder="Write 50 words about yourself"
                  value={aboutMe}
                  onChange={handleChange}
                />
              </div>

              <div className="error-msg">{errorAboutMe}</div>
              <button
                type="submit"
                disabled={!isFormValid() || disabled}
                className="btn btn-primary btn-block">
                  Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutMe;
