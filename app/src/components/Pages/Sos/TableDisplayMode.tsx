
import { User } from '../../api/configuration/models/users';

export const TableDisplayMode = (user: User) => {
  return (
    <tbody>
      <tr>
        <td>Name</td>
        <td>{user.first_name} {user.last_name}</td>
      </tr>
      <tr>
        <td>Gender</td>
        <td>{user.gender}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{user.email}</td>
      </tr>
      <tr>
        <td>Phone</td>
        <td>{user.phone}</td>
      </tr>
      <tr>
        <td>About Me</td>
        <td>{user.aboutMe}</td>
      </tr>
    </tbody>
  );
};

export default TableDisplayMode;
