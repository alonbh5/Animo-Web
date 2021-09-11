/*eslint-disable*/
import React, { useContext } from 'react';
import IdentityTable from './Sos/IdentityTable';
import MyNetwork from '../MyNetwork/MyNetwork';
import { User } from '../api/configuration/models/users';
import { AuthContext } from '../../shared/context/auth-context';

const SOS = (props: any) => {
  const auth = useContext(AuthContext);
  const user = auth.user as User;
  const content =  
    <p>
    Here you can see our psychologists users
    that are availabe right now to help you.
    <br/>
    You can read the information about them
    and decide if you want to contact them
    by email or phone - what ever makes you more comfortable.
  </p>

  return (
    <>
    {auth.isLoggedIn && user._id ?
      <div id="team" className="text-center">

      <h2>SOS</h2>
        {content}
         <MyNetwork user={user}/> 
         </div>
 :
      <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>SOS</h2>
      {content}
         <IdentityTable /> 
        </div>
      </div>
    </div>}
    </>
  );
};

export default SOS;
