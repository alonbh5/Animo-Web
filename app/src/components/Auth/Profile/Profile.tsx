import { useContext, useEffect, useState } from "react";
import LoadingSpinner from '../../../shared/UIElements/LoadingSpinner';
import { RoleEnum } from "../../api/configuration/models/role";
import IdentityTable from './IdentityTable'
import { userID } from "../../api/configuration/config";
import { AuthContext } from "../../../shared/context/auth-context";
import { User } from '../../api/configuration/models/users';

const Profile = (props: any) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const auth = useContext(AuthContext)
  const user = auth.user as User;

  const getRole = (roleid?: number) => {
    if (roleid === 1) {
      return 'Admin';
    } else if (roleid === 2) {
      return 'Psycholigist';
    } else {
      return "General"
    }
  }

  const logoutHandler = () => {
    auth.logout();
  };

  //TODO: change from roleid to role
  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>My Profile</h2>
          <div className="card">
            <div className="card-body">
              <div className='edit-icon' onClick={() => setIsEditMode(prevMode => !prevMode)}>
                <i className={!isEditMode ? 'far fa-edit' : 'fas fa-trash-alt'} style={{ fontSize: '20px' }}></i></div>
              <IdentityTable
                isEditMode={isEditMode} />
            </div>
          </div>
          <button onClick={auth.logout}>LOGOUT</button>
        </div>
      </div>
    </div>);
}

export default Profile;