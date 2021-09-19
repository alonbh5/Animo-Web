import axios from 'axios';
import { useState, useContext } from 'react';
import { User } from '../../api/configuration/models/users';
import { UserAdmin, UserAdminSecret } from '../../api/configuration/config';
import AuthContext from '../../../shared/context/auth-context';

const projectID = '69cc354e-1763-4e7c-ac5b-8d3ec209e09e';
const privateKey = 'e41f8273-96dc-4034-8242-feee63ed67cb';
const authObject =
{
  'Project-ID': projectID,
  'User-Name': UserAdmin,
  'User-Secret': UserAdminSecret
};

const Modal = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as User;
  const [username, setUsername] =
  useState(auth.isLoggedIn ? user.first_name + '_' + user.last_name : '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const storedData = JSON.parse(localStorage.getItem('chatData'));
  const expirationDate =
  storedData?.expiration || new Date(new Date().getTime() + 1000 * 60 * 60);

  const handelSubmit = async (e:any) => {
    e.preventDefault();
    const userData = {
      username: username,
      secret: password,
      first_name: auth.isLoggedIn ? user.first_name : '',
      last_name: auth.isLoggedIn ? user.last_name : ''
    };
    const headers = {
      'Content-Type': 'application/json',
      'PRIVATE-KEY': privateKey
    };

    try {
      await axios.get('https://api.chatengine.io/chats', {
        headers: {
          'Project-ID': projectID,
          'User-Name': username,
          'User-Secret': password
        }
      });

      localStorage.setItem(
        'chatData',
        JSON.stringify({
          username: username,
          password: password,
          expiration: expirationDate.toISOString()
        }));
      window.location.reload();
    } catch {

    }

    try {
      await axios.post(
        'https://api.chatengine.io/users/', userData, { headers });

      try {
        await axios.post(
          'https://api.chatengine.io/chats/55660/people/',
          { username },
          {
            headers: {
              'Content-Type': 'application/json',
              ...authObject
            }
          });
      } catch (err) {
        setError('oops, something went wrong');
      }
      localStorage.setItem(
        'chatData',
        JSON.stringify({
          username: username,
          password: password,
          expiration: expirationDate.toISOString()
        }));
      window.location.reload();
      setError('');
    } catch (error) {
      setError('Oops, incorrect credentials.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form-login">
        <h1 className="title">Animo Forum</h1>
        <form onSubmit={handelSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required />
          <div>
            <button style={{ marginLeft: '20px' }}
              type="submit" className="button-form">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <p style={{
          fontSize: '20px',
          color: 'white',
          marginLeft: '70px'
        }}>{error}</p>
      </div>
    </div>
  );
};

export default Modal;
