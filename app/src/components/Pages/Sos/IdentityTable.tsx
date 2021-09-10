
import { TableDisplayMode } from './TableDisplayMode';
import axios, { AxiosRequestConfig } from 'axios';
import { User } from '../../api/configuration/models/users';
import React, { useState, useEffect } from 'react';

export const serverAPIPort = 3000;
export const host = 'http://localhost';
export const APIRootPath = `${host}:${serverAPIPort}`;

const IdentityTable = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);

  const fetchUsers = async () => {
    const params: AxiosRequestConfig = {
      baseURL: `${APIRootPath}`,
      method: 'GET',
      url: '/users/sos'
    };

    try {
      const response = await axios.request(params);
      console.log(response.data.data.allUser);
      setUsers(response.data.data.allUser as User[]);
    } catch (err) {
      console.log(err.nessage);
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
