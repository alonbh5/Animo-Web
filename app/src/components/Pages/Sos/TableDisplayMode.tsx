
import { User } from '../../api/configuration/models/users';

export const TableDisplayMode = (user: User) => {
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
        <td>Gender</td>
        <td>{user.gender}</td>
      </tr>
      <tr>
        <td>About Me</td>
        <td>{user.online ? 'Online' : 'Offline'}</td>
      </tr>
    </tbody>
  );
};

export default TableDisplayMode;
