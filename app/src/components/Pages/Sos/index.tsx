import React, { useContext, useState } from 'react';
import IdentityTable from './IdentityTable';
import MyNetwork from '../../MyNetwork/MyNetwork';
import { User } from '../../api/configuration/models/users';
import AuthContext from '../../../shared/context/auth-context';
import PageLayout from '../../../shared/UIElements/PageLayout';
import HelpCenter from './HelpCenters';

const PageState = {
  HelpCenter: 'HelpCenter',
  Psychologists: 'Psychologists'
};

const SOS = (props: any) => {
  const auth = useContext(AuthContext);
  const user = auth.user as User;
  const [showType, setType] = useState(PageState.HelpCenter);
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
    <PageLayout cols={true} title='SOS'>
      <button
        className="btn btn-primary"
        style={{ width: '120px' }}
        onClick={() => setType(PageState.HelpCenter)}
      >
            Help Centers
      </button>
      <button
        className="btn btn-primary"
        style={{ width: '120px', marginLeft: '20px' }}
        onClick={() => setType(PageState.Psychologists)}
      >
            Psychologists
      </button>
      {auth.isLoggedIn && user._id
        ? <div id="team" className="text-center">
          <h2>SOS</h2>
          {content}
          <HelpCenter />
          <MyNetwork user={user}/>
        </div>
        : <>
          {showType === PageState.HelpCenter && <HelpCenter />}
          {showType === PageState.Psychologists && (
            <>
              <br/>
              <br/>
              {content}
              <br/>
              <IdentityTable />
            </>)}
        </> }
    </PageLayout>
  );
};

export default SOS;
