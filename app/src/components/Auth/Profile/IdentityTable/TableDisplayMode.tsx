
import { useContext } from 'react';
import { User } from '../../../api/configuration/models/users';
import { Role } from '../../../api/configuration/models/role';
import AuthContext from '../../../../shared/context/auth-context';
import { Link } from 'react-router-dom';

export const TableDisplayMode = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as User;
  const role = auth.userRole as Role;

  return (
    <tbody>
      <tr>
        <td>First Name</td>
        <td>{user.first_name}</td>
      </tr>
      <tr>
        <td>Last Name</td>
        <td>{user.last_name}</td>
      </tr>
      <tr>
        <td>Email Address</td>
        <td>{user.email}</td>
      </tr>
      <tr>
        <td>Age</td>
        <td>{user.age}</td>
      </tr>
      <tr>
        <td>Gender</td>
        <td>{user.gender}</td>
      </tr>
      <tr>
        <td>Role</td>
        <td>{role.role_type}</td>
      </tr>
      {user.personality && user.personality !== '' &&
                <tr>
                  <td>Personality Type</td>
                  <td>
                    <Link
                      to="/personalquiz"
                      style={{ color: 'blue' }}>
                      {user.personality}
                    </Link>
                  </td>
                </tr>
      }
    </tbody>
  );
};
