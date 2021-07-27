// import React, { Component } from "react";
import {createApiClient} from "./api/api";
import React, {useEffect, useState} from 'react'
import { User } from "./api/configuration/models/users";
import validator from 'validator';

const api = createApiClient();

export const SignIn = (props:any) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [user, setUser] = useState<User|undefined>(undefined)

    const handleEmailChanged = (event: any) => {
        setEmail(event.target.value)
    };
    
    const handlePasswordChanged = (event: any) => {
      setPassword(event.target.value)
    };

    const cleanForm = () => {
        setPassword("");
        setEmail("");
    }

    const isFormValid =() =>{
      return validator.isEmail(email) && !validator.isEmpty(password);
    }

    const handleSubmit = async(event: any) => {
      event.preventDefault();
      try {
        const user:User = await api.getUser(email, password);
        setUser(user);
        cleanForm()

      } catch {
        setErrorMsg("Wrong email or password!");
      }
    }
    
if(user) {
  return (
    <div id='team' className='text-center'>
     <div className='container'>
      <div className='col-md-8 col-md-offset-2 section-title'>
        <h2>Sign In</h2>
        <p>{user.email}</p>
      <p>{user.age}</p>
      <p>{user.password}</p>
      <p>{user.permissions_to_app}</p>
      </div>
     </div>
    </div>
);
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
        {errorMsg &&<h5 style={{color: "red"}}>{errorMsg}</h5>}
          <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={email} onChange={handleEmailChanged} className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password}  onChange={handlePasswordChanged} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" disabled={!isFormValid()} className="btn btn-primary btn-block">Submit</button>
                <br></br>
                <p >
                    Forgot <a href="#">password?</a> \ <a href="/signup" >register</a>
                </p>
            </form>
            </div>
            </div>

        </div>
      </div>
    )
  }
// export const SignIn = () => {
//         return (
           
//         );
// }