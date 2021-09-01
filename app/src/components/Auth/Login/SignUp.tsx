import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { useRoles } from '../../../shared/hooks/roles-hook';
import { AxiosRequestConfig } from 'axios';
import { User } from '../../api/configuration/models/users';
import validator from 'validator';
import LoadingSpinner from '../../../shared/UIElements/LoadingSpinner';
import Input from '../../../shared/FormElements/Input';
import { Link } from 'react-router-dom';
import { Role } from '../../api/configuration/models/role';

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
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorAge, setErrorAge] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { isLoading, error, sendRequest, clearMessages } = useHttpClient();
  const { rolesOptions } = useRoles();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    console.log(email);
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    clearMessages();
    const userToCreate: User = {
      role_id: Number(role),
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      age: Number(age),
      gender
    };

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/users/createuser',
      data: {
        ...userToCreate
      },
      headers: {}
    };
    try {
      const response = await sendRequest(params);
      auth.login(response.data.userId, response.data.token);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Sign Up</h2>
          <p>
            For using our platform, you should first sign up
          </p>
          <h5 style={{ color: 'red' }}>{errorMsg}</h5>
          <div>
            <form onSubmit={handleSubmit}>
              {isLoading && <LoadingSpinner asOverlay />}
              {error && <h5 style={{ color: 'red' }}>{error}</h5>}
              <div className="form-group">

                <Input
                  className="form-control"
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
                  placeholder="Enter age"
                  name="age"
                  value={age}
                  onChange={handleChange}
                />
                <input
                  name="age"
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
              <button
                type="submit"
                disabled={!isFormValid()}
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
        </div>
      </div>
    </div>
  );
};
export default SignUp;
