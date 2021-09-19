import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { useRoles } from '../../../shared/hooks/roles-hook';
import { AxiosRequestConfig } from 'axios';
import { User } from '../../api/configuration/models/users';
import validator from 'validator';
import Input from '../../../shared/FormElements/Input';
import { Link } from 'react-router-dom';
import { Role } from '../../api/configuration/models/role';
import ImageUpload from '../../../shared/FormElements/ImageUpload';
import { uploadImage } from '../../api/endpoints';
import Status from '../../../shared/UIElements/Status';
import PageLayout from '../../../shared/UIElements/PageLayout';

const initialState = {
  firstName: '',
  lastName: '',
  age: '25',
  email: '',
  password: '',
  gender: '',
  role: ''
};

const SignUp = () => {
  const auth = useContext(AuthContext);
  const [{
    firstName,
    lastName,
    age,
    email,
    password,
    gender,
    role
  }, setState] = useState(initialState);
  const [imageFile, setImage] = useState<any>();
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [disabled, setDisabled] = useState(false);
  const [errorAge, setErrorAge] = useState<string>('');
  const [customError, setCustomError] = useState<string>('');
  const {
    isLoading, error, sendRequest,
    clearMessages, success
  } = useHttpClient();
  const { rolesOptions } = useRoles();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (validator.isEmail(email) || validator.isEmpty(email)) {
      setErrorEmail('');
    } else {
      setErrorEmail('Please enter a valid email address');
    }
    let ageError = '';
    if (!validator.isNumeric(age)) {
      ageError = 'Age must be a number';
    } else if (Number(age) > 120 || Number(age) < 1) {
      ageError = 'Age must be higher then 1 and less then 120';
    }
    setErrorAge(ageError);
  }, [email, age]);

  const isFormValid = () => {
    return (
      !validator.isEmpty(firstName) &&
      !validator.isEmpty(lastName) &&
      !validator.isEmpty(password) &&
      validator.isEmail(email) &&
      !validator.isEmpty(gender) &&
      !validator.isEmpty(role) &&
      validator.isNumeric(age));
  };

  const handleFile = (file:any) => {
    setImage(file);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    clearMessages();
    setCustomError('');
    const response = await uploadImage(imageFile);
    if (!response.isValid) {
      setCustomError('We could not upload your image, please try later');
      return;
    };

    const userToCreate: User = {
      role_id: Number(role),
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      age: Number(age),
      gender,
      imageUrl: response.imageUrl
    };

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/users/createuser',
      data: {
        ...userToCreate
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
    }
  };

  return (
    <PageLayout title='Sign Up' cols={true}>
      <p>
            For using our platform, you should first sign up
      </p>
      <div>
        <form onSubmit={handleSubmit}>
          <Status isLoading={isLoading} error={error || customError} success={success} />
          <div className="form-group">
            <Input
              className="form-control"
              disabled={disabled}
              required={true}
              type="text"
              name="firstName"
              label="First Name"
              placeholder="Enter First name"
              value={firstName}
              onChange={handleChange} />
          </div>
          <div
            className="form-group">
            <Input
              className="form-control"
              disabled={disabled}
              required={true}
              type="text-area"
              name="lastName"
              label="Last name"
              placeholder="Enter Last name"
              value={lastName}
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <Input
              className="form-control"
              disabled={disabled}
              required={true}
              type="email"
              name="email"
              label="Email address"
              placeholder="Enter Email"
              value={email}
              onChange={handleChange}
              errorMessage={errorEmail}
            />
          </div>
          <div className="form-group">
            <Input
              className="form-control"
              disabled={disabled}
              required={true}
              type="password"
              name="password"
              label="Password"
              placeholder="Enter Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="required">Gender</label>
            <select
              value={gender}
              disabled={disabled}
              onChange={handleChange}
              name="gender"
              className="form-control"
            >
              <option value="" disabled selected>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label className="required">Role</label>
            <select
              value={role}
              disabled={disabled}
              onChange={handleChange}
              name="role"
              className="form-control">
              <option value="" disabled selected>Select Role</option>
              {rolesOptions?.map((role: Role, index:number) =>
                <option key={role.role_id} value={`${role.role_id}`}>
                  {role.role_type}
                </option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label className="required">Age</label>
            <input
              type="age"
              className="form-control"
              disabled={disabled}
              placeholder="Enter age"
              name="age"
              value={age}
              onChange={handleChange}
            />
            <input
              name="age"
              disabled={disabled}
              onInput={handleChange}
              type="range"
              min="1"
              value={age}
              max="120"
              step="1"
              list="tick-list"
            />
            <div className="error-msg">{errorAge}</div>

          </div>
          <div className="form-group">

            <ImageUpload center={true} id="image" onInput={handleFile} />
          </div>

          <button
            type="submit"
            disabled={!isFormValid() || disabled}
            className="btn btn-primary btn-block">
                  Sign Up
          </button>
          <br></br>
          <p>
                Already registered {' '}
            <Link to="/login">sign in?</Link>
          </p>
        </form>
      </div>
    </PageLayout>
  );
};

export default SignUp;
