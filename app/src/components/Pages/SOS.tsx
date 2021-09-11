import React, { useContext } from 'react';
import IdentityTable from './Sos/IdentityTable';
import MyNetwork from '../MyNetwork/MyNetwork';
import { User } from '../api/configuration/models/users';
import AuthContext from '../../shared/context/auth-context';
import PageLayout from '../../shared/FormElements/PageLayout';

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
    </p>;

  return (
    <>
      {auth.isLoggedIn && user._id
        ? <div id="page" className="text-center">
          <h2>SOS</h2>
          {content}
          <MyNetwork user={user}/>
        </div>
        : <PageLayout title={'SOS'}>
          {content}
          <IdentityTable />
        </PageLayout>
      }
    </>
  );
};

export default SOS;
