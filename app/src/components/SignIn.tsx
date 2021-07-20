// import React, { Component } from "react";

export const SignIn = (props:any) => {
    return (
      <div id='team' className='text-center'>
        <div className='container'>
          <div className='col-md-8 col-md-offset-2 section-title'>
            <h2>Sign In</h2>
            <p>
              For using our platform, you should first sign in
            </p>
<div>
          <form>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
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