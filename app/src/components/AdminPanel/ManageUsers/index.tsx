/*eslint-disable*/
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import validator from 'validator';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import LoadingSpinner from '../../../shared/UIElements/LoadingSpinner';
import { AxiosRequestConfig } from 'axios';
import { User } from '../../api/configuration/models/users';
import { userID } from '../../api/configuration/config';
import { ManageUserRow } from './MangeUserRow'
import { AuthContext } from '../../../shared/context/auth-context';
import { useAlert } from 'react-alert';

const ManageUsers = (props: any) => {
  const { isLoading, error, success, sendRequest, clearMessages } = useHttpClient();
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const auth = useContext(AuthContext);
  const alert = useAlert();

  const fetchUsers = async () => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/users',
    };

    try {
      const response = await sendRequest(params);
      setUsers(response.data.allUser as User[]);
    } catch (err) {
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [])

  const timeout = (delay: number) => {
    return new Promise(res => setTimeout(res, delay));
  }

  const onUpdateUser = async (user: User) => {
    clearMessages();
    const params: AxiosRequestConfig = {
      method: 'PATCH',
      url: `/users/updateUserByAdmin/${user._id}`,
      data: {
        ...user
      },
      headers: {
        Authorization: 'Bearer ' + auth.token
      }
    };

    try {
      await sendRequest(params);
      alert.success('Update Successfuly!');
      await timeout(1000);
      fetchUsers();
    } catch (err) {
      alert.error('Error, please try later');
    }
  };
  
  const deleteUser = async (userId: string) => {
    const params: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/users/deleteUser/${userId}`,
      headers: {
        Authorization: 'Bearer ' + auth.token
      }
    };
    await sendRequest(params);
    await timeout(1000);
    fetchUsers();
  };

  const confirmUser = async (userId: string) => {
    const params: AxiosRequestConfig = {
      method: 'PATCH',
      url: `/users/confirmUser/${userId}`,
      headers: {
        Authorization: 'Bearer ' + auth.token
      }
    };
    await sendRequest(params);
    await timeout(1000);
    fetchUsers();
  };
  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <h2>Manage Users</h2>
        <br>
        </br>
        <br>
        </br>
        {isLoading && <LoadingSpinner asOverlay />}
        {error && <h5 style={{ color: 'red' }}>{error}</h5>}
        {success && <h5 style={{ color: 'blue' }}>{success}</h5>}
               <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Created At</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User, index: number) =>
              <ManageUserRow rowNumber={index} user={user} deleteUser={deleteUser} confirmUser={confirmUser} updateUser={onUpdateUser}/>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageUsers;
