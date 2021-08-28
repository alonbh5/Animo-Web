/*eslint-disable*/
import React from 'react';
import { User } from '../api/configuration/models/users';
import { RoleEnum } from '../api/configuration/models/role';
type ManageUserRowProp = {
    user: User;
    rowNumber: number;
    deleteUser: (userId: string) => void
}
export const ManageUserRow = (props :ManageUserRowProp) => {
  const { user, rowNumber, deleteUser } = props;
  return (
    <tr>
      <td>{rowNumber}</td>
      <td>{user.first_name + ' ' + user.last_name}</td>
      <td>27/1/2014</td>
      <td>{Object.values(RoleEnum)[user.role_id! -1]}</td>
      <td><span className="status text-success">&bull;</span> Active</td>
      <td>
        <a  className="confirm" title="Confrim" data-toggle="tooltip">
          <i className="material-icons">&#xe876;</i></a>
        <a href="#" className="settings" title="Settings" data-toggle="tooltip">
          <i className="material-icons">&#xE8B8;</i></a>
        <a onClick={()=> deleteUser(user._id!)} className="delete" title="Delete" data-toggle="tooltip">
          <i className="material-icons">&#xE5C9;</i></a>
      </td>
    </tr>
  );
};
