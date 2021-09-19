import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../../../shared/context/auth-context';
import { User } from '../../../api/configuration/models/users';
import { TableDisplayMode } from './TableDisplayMode';
import { TableEditMode } from './TableEditMode';
import { AxiosRequestConfig } from 'axios';
import { useHttpClient } from '../../../../shared/hooks/http-hook';
import Status from '../../../../shared/UIElements/Status';
import { useAlert } from 'react-alert';

type IdentityTableProps = {
    isEditMode?: boolean;
    onUpdate?: () => void;
}

const IdentityTable = (props: IdentityTableProps) => {
  const auth = useContext(AuthContext);
  const alert = useAlert();

  const { isEditMode } = props;
  const [errorAge, setErrorMessageAge] = useState('');
  const [errorEmail, setErrorMessageEmail] = useState('');
  const [errorPassword, setErrorMessagePassword] = useState('');
  const { isLoading, error, sendRequest, clearMessages } = useHttpClient();

  useEffect(() => {
    setErrorMessageAge('');
    setErrorMessageEmail('');
    setErrorMessagePassword('');
    clearMessages();
  }, [isEditMode]);

  const onUpdateUser = async (user: User) => {
    clearMessages();
    const params: AxiosRequestConfig = {
      method: 'PATCH',
      url: `/users/updateUser/${auth.userId}`,
      data: {
        ...user
      },
      headers: {
        Authorization: 'Bearer ' + auth.token
      }
    };

    try {
      const response = await sendRequest(params);
      alert.success('Update Successfuly!');
      auth.logout();
      auth.login(response.data.userId, response.data.token);
    } catch (err) {
      alert.error('Error, please try later');
    }
  };
  return (<>
    <div className="error-msg">{errorEmail}</div>
    <div className="error-msg">{errorAge}</div>
    <div className="error-msg">{errorPassword}</div>
    <Status isLoading={isLoading} error={error} />
    <table>
      {!isEditMode
        ? <TableDisplayMode />
        : <TableEditMode
          onErrorEmail={setErrorMessageEmail}
          onErrorAge={setErrorMessageAge}
          onErrorPassword={setErrorMessagePassword}
          onUpdate={onUpdateUser} />}
    </table></>);
};

export default IdentityTable;
