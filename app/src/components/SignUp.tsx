
export const SignUp = (props:any) => {
    return (
      <div id='team' className='text-center'>
        <div className='container'>
          <div className='col-md-8 col-md-offset-2 section-title'>
            <h2>Sign Up</h2>
            <p>
              For using our platform, you should first sign up
            </p>
<div>
          <form>

          <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
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
// export const SignIn = () => {
//         return (
           
//         );
// }