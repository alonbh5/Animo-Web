import { useEffect, useState, useContext } from "react"
import validator from 'validator';
import { api } from "./api/api";
import { User } from "./api/configuration/models/users";
import { Role } from "./api/configuration/models/role";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import { AxiosRequestConfig } from "axios";
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import Input from '../shared/FormElements/Input'
export const SignUp = (props: any) => {
  const auth = useContext(AuthContext);
  const ageStep = 15;
  const [roleOptions, setRoleOptions] = useState<Role[] | undefined>(undefined)
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<string>("25");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorAge, setErrorAge] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [user, setUser] = useState<User | undefined>(undefined)
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    api.getRoles().then(roles => setRoleOptions(roles));
  }, []);

  const handleFirstNameChange = (event: any) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: any) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
    const errorMsg = !validator.isEmail(event.target.value) ? "Please enter a valid email address" : "";
    setErrorEmail(errorMsg);
  };

  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };

  const handleRoleChange = (event: any) => {
    setRole(event.target.value);
  };

  const handleAgeChange = (event: any) => {
    const newAge = event.target.value;
    setAge(newAge);
    let errorMsg = "";
    if (!validator.isNumeric(newAge)) {
      errorMsg = "Age must be a number";
    } else if (Number(age) > 120 || Number(age) < 1) {
      errorMsg = "Age must be higher then 1 and less then 120";
    }
    setErrorAge(errorMsg)
  };

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
    const userToCreate: User = {
      role_id: Number(role),
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      age: Number(age),
      gender
    }

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/users/createuser',
      data: {
        ...userToCreate
      },
      headers: {}
    }
    try {
      const response = await sendRequest(params);
      auth.login(response.data.userId, response.data.token);
    } catch (err) { }
  };

  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Sign Up</h2>
          <p>
            For using our platform, you should first sign up
          </p>
          <h5 style={{ color: "red" }}>{errorMsg}</h5>
          <div>
            <form onSubmit={handleSubmit}>
              {isLoading && <LoadingSpinner asOverlay />}
              {error && <h5 style={{ color: "red" }}>{error}</h5>}
              <div className="form-group">
                <Input className="form-control" type="text" label="First Name" placeholder="Enter First name"
                  value={firstName} onChange={handleFirstNameChange} />
              </div>
              <div className="form-group">
                <Input className="form-control" type="text" label="Last name" placeholder="Enter Last name"
                  value={lastName} onChange={handleLastNameChange} />
              </div>
              <div className="form-group">
                <Input className="form-control" type="email" label="Email address" placeholder="Enter Email"
                  value={email} onChange={handleEmailChange} errorMessage={errorEmail} />
              </div>
              <div className="form-group">
                <Input className="form-control" type="password" label="Password" placeholder="Enter Password"
                  value={password} onChange={handlePasswordChange} />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select value={gender} onChange={handleGenderChange} className="form-control">
                  <option value="" disabled selected>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={role} onChange={handleRoleChange} className="form-control">
                  <option value="" disabled selected>Select Role</option>
                  {roleOptions?.map((role) => {
                    return <option value={`${role.role_id}`}>{role.role_type}</option>
                  })}
                </select>
              </div>
              <div className="form-group">
                <label>Age</label>
                <input type="age" className="form-control" placeholder="Enter age" value={age} onChange={handleAgeChange} />
                <input
                  onInput={handleAgeChange}
                  type="range"
                  min="1"
                  value={age}
                  max="120"
                  step="1"
                  list="tick-list"
                />
                <div className="error-msg">{errorAge}</div>
              </div>
              <button type="submit" disabled={!isFormValid()} className="btn btn-primary btn-block">Sign Up</button>
              <br></br>
              <p>
                Already registered <a href="/signin">sign in?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}