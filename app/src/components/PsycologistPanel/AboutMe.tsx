import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AxiosRequestConfig } from 'axios';
import { User } from '../api/configuration/models/users';
import validator from 'validator';
import Status from '../../shared/UIElements/Status';
import Input from '../../shared/FormElements/Input';
import PageLayout from '../../shared/UIElements/PageLayout';

const AboutMe = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as User;
  const [phone, setPhone] = useState<string>(user.phone || '');
  const [aboutMe, setAboutMe] = useState<string>(user.aboutMe || '');

  const [errorPhone, setErrorPhone] = useState<string>('');
  const [errorAboutMe, setErrorAboutMe] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [disabled, setDisabled] = useState(false);
  const {
    isLoading, error, sendRequest,
    clearMessages, success
  } = useHttpClient();

  const handleAboutMe = (e: any) => {
    setAboutMe(e.target.value);
  };

  const handlePhone = (e: any) => {
    setPhone(e.target.value);
  };

  useEffect(() => {
    if (validator.isMobilePhone(phone, 'he-IL')) {
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
    } catch (err:any) {
      setErrorMsg(err.message);
    }
  };

  return (
    <PageLayout title='About Me' cols={true}>
      <p>
            Here you can write information for general users to know you better.
        <br/>
            They can see this information
            as long as you are connected to the app.
      </p>
      <h5 style={{ color: 'red' }}>{errorMsg}</h5>
      <div>
        <form onSubmit={handleSubmit}>
          <Status isLoading={isLoading} error={error} success={success} />
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
              onChange={handlePhone} />
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
              onChange={handleAboutMe}
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
    </PageLayout>
  );
};
export default AboutMe;
