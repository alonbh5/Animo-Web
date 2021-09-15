import { useContext, useState } from 'react';
import IdentityTable from './IdentityTable';
import AuthContext from '../../../shared/context/auth-context';
import PageLayout from '../../../shared/UIElements/PageLayout';

const Profile = (props: any) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const auth = useContext(AuthContext);

  return (
    <PageLayout title='My Profile' cols={true}>
      <div className="card">
        <div className="card-body">
          <div
            className='edit-icon'
            onClick={() => setIsEditMode(prevMode => !prevMode)}
          >
            <i
              className={!isEditMode ? 'far fa-edit' : 'fas fa-trash-alt'}
              style={{ fontSize: '20px' }
              } />
            <p style={{ fontSize: '14px' }}>{!isEditMode ? 'Edit' : 'Cancel'}</p>
          </div>
          <IdentityTable
            isEditMode={isEditMode} />
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={auth.logout}
      >
            LOGOUT
      </button>
    </PageLayout>
  );
};

export default Profile;
