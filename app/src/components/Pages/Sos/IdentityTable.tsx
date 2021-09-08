
import { TableDisplayMode } from './TableDisplayMode';
import axios, { AxiosRequestConfig } from 'axios';
import { User } from '../../api/configuration/models/users';
import React, { useState, useEffect } from 'react';

const IdentityTable = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);

  const fetchUsers = async () => {
    const params: AxiosRequestConfig = {
      baseURL: process.env.REACT_APP_BACKEND_URL,
      method: 'GET',
      url: '/users/sos'
    };

    try {
      const response = await axios.request(params);
      setUsers(response.data.data.psycUsers as User[]);
    } catch (err) {
      setUsers(undefined);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const itemRows = [];
  if (users && users.length > 0) {
    for (const user of users) {
      const row = (
        <div className="card">
          <div className="card-body">
            <table>
              <TableDisplayMode {...user} />
            </table>
          </div>
        </div>
      );
      itemRows.push(row);
    }
  }

  return (
    <div className="total-cards">
      {itemRows}
    </div>
  );
};

export default IdentityTable;
