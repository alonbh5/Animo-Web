import { useContext, useState } from 'react';
import IdentityTable from './IdentityTable';
import { AuthContext } from '../../../shared/context/auth-context';

const Profile = (props: any) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const auth = useContext(AuthContext);

  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>My Profile</h2>
          <div className="card">
            <div className="card-body">
              <div
                className='edit-icon'
                onClick={() => setIsEditMode(prevMode => !prevMode)}
              >
                <i
                  className={!isEditMode ? 'far fa-edit' : 'fas fa-trash-alt'}
                  style={{ fontSize: '20px' }
                  } /></div>
              <IdentityTable
                isEditMode={isEditMode} />
            </div>
          </div>
          <button className="btn btn-info" onClick={auth.logout}>LOGOUT</button>
        </div>
      </div>
    </div>);
};

export default Profile;
