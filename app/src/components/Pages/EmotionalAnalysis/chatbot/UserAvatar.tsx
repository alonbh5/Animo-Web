import React, { useContext } from 'react';
import AuthContext from '../../../../shared/context/auth-context';
import { User } from '../api/configuration/models/users';
import { avatarImage } from '../../../utils';
import './Avatar.css';

export const UserAvatar = () => {
  const auth = useContext(AuthContext);
  const user = auth.user as User;
  const url = user.imageUrl;

  return (
    <img className="nice-user-avatar"
      src={url || avatarImage}
      alt="User bot"
      width="50"
      height="40"
    ></img>
  );
};

export default UserAvatar;
