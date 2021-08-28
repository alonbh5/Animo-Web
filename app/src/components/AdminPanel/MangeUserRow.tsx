/*eslint-disable*/
import React from 'react';
import { User } from '../api/configuration/models/users';
import { RoleEnum } from '../api/configuration/models/role';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

type ManageUserRowProp = {
    user: User;
    rowNumber: number;
    deleteUser: (userId: string) => void
}
export const ManageUserRow = (props :ManageUserRowProp) => {
  const { user, rowNumber, deleteUser } = props;

  const clickDeleteUser = () => {
    confirmAlert({
        title: 'Delete User',
        message: `Are you sure to delter user ${user.first_name + ' ' + user.last_name}?`,
        buttons: [
          {
            label: 'Yes',
            onClick: ()=> deleteUser(user._id!)
          },
          {
            label: 'No',
            onClick: () => close()
          }
        ]
      });
  };
const date= user.created_at ? new Date(user.created_at).toLocaleDateString() : undefined
  return (
    <tr>
      <td>{rowNumber}</td>
      <td>{user.first_name + ' ' + user.last_name}</td>
      <td>{user.gender}</td>
      <td>{date}</td>
      <td>{Object.values(RoleEnum)[user.role_id! -1]}</td>
      <td><span className={user.online ? "status text-success": "status text-danger"}>&bull;</span>{user.online ? "Online":  "Offline"}</td>
      <td>
        <a  className="confirm" title="Confrim" data-toggle="tooltip">
          <i className="material-icons">&#xe876;</i></a>
        <a href="#" className="settings" title="Settings" data-toggle="tooltip">
          <i className="material-icons">&#xE8B8;</i></a>
        <a onClick={() => clickDeleteUser()} className="delete" title="Delete" data-toggle="tooltip">
          <i className="material-icons">&#xE5C9;</i></a>
      </td>
    </tr>
  );
};
