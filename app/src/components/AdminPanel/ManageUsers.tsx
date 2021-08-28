/*eslint-disable*/
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import validator from 'validator';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import { AxiosRequestConfig } from 'axios';
import { User } from '../api/configuration/models/users';
import { userID } from '../api/configuration/config';
import { ManageUserRow } from './MangeUserRow'
import { AuthContext } from '../../shared/context/auth-context';

const ManageUsers = (props: any) => {
  const { isLoading, error, success, sendRequest, clearMessages } = useHttpClient();
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const auth = useContext(AuthContext);

  const fetchUsers = async () => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/users',
    };

    try {
      const response = await sendRequest(params);
      setUsers(response.data.allUser as User[]);
      console.log(response.data.allUser as User[])
    } catch (err) {
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [])

  const timeout = (delay: number) => {
    return new Promise(res => setTimeout(res, delay));
  }
  
  const deleteUser = async (userId: string) => {
    console.log(userId)
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
              <th>Created At</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User, index: number) =>
              <ManageUserRow rowNumber={index} user={user} deleteUser={deleteUser} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageUsers;
