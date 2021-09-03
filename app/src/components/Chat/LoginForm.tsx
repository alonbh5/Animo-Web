import { useState } from 'react';
import axios from 'axios';

const projectID = '69cc354e-1763-4e7c-ac5b-8d3ec209e09e';
const privateKey = 'e41f8273-96dc-4034-8242-feee63ed67cb';
const authObject =
{
  'Project-ID': projectID,
  'User-Name': 'yairdana',
  'User-Secret': 'Animo2021!'
};
const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handelSubmit = async (e:any) => {
    e.preventDefault();

    const userData = {
      username: username,
      secret: password,
      first_name: 'Adam',
      last_name: 'La Morre'
    };
    const headers = {
      'Content-Type': 'application/json',
      'PRIVATE-KEY': privateKey
    };

    try {
      const response = await axios.put(
        'https://api.chatengine.io/users', userData, { headers });
      if (response.status === 201) {
        try {
          await axios.post(
            'https://api.chatengine.io/chats/54444/people/',
            { username },
            {
              headers: {
                'Content-Type': 'application/json',
                ...authObject
              }
            });
        } catch (err) {
          throw new Error();
        }
      }
      localStorage.setItem('chatUsername', username);
      localStorage.setItem('chatPassword', password);
      window.location.reload();
      setError('');
    } catch (error) {
      setError('oops, something went wrong');
    }
  };

  return (
    <div className="wrapper">
      <div className="form-login">
        <h1 className="title">Chat Application</h1>
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
            </button></div>
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
