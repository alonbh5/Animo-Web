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
  const explain =
  <p>
  Here you can see our psychologists users
  that are availabe right now to help you.
  </p>;
  const contentGeneral =
    <p>
    You can read the information about them
    and decide if you want to contact them
    by email or phone - what ever makes you more comfortable.
    </p>;
  const contentUsers =
    <p>
    You can read the information about them
    and decide if you want to contact them
    by direct message or phone - what ever makes you more comfortable.
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
      {showType === PageState.HelpCenter && <HelpCenter />}
      {auth.isLoggedIn && user._id && showType === PageState.Psychologists
        ? (<>
          <br/>
          <br/>
          {explain}
          {contentUsers}
          <MyNetwork user={user}/>
        </>)
        : <>
          {showType === PageState.Psychologists && (
            <>
              <br/>
              <br/>
              {explain}
              {contentGeneral}
              <br/>
              <IdentityTable />
            </>)}
        </> }
    </PageLayout>
  );
};

export default SOS;
