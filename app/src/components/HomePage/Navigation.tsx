import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import AuthContext from '../../shared/context/auth-context';
import { User } from '../api/configuration/models/users';
import { Role, RoleEnum } from '../api/configuration/models/role';
import { avatarImage } from '../utils';
import { AdminDropdown, PsychologistDropdown, GeneralDropdown } from './Dropdowns';

type NavigationBarProps = {
  isLoggedIn: boolean;
  alreadyDidQuiz?: boolean;
}
const NavigationBar = (props: NavigationBarProps) => {
  const navigateForLoggedIn = <>
    {!props.alreadyDidQuiz &&
     <li><Link to="/personalquiz" style={{ color: 'blue' }}>Personal Quiz</Link></li>}
    <li><Link to="/analyze">Emotional Analysis</Link></li>
  </>;

  return (
    <>
      {props.isLoggedIn && navigateForLoggedIn}
      <li><Link to="/tips">Tips & article</Link></li>
      <li><HashLink to="/sos">SOS</HashLink></li>
      <li><HashLink to="/home-page#contact">Contact</HashLink></li>
      <li><HashLink to="/chat">Chat</HashLink></li>
    </>
  );
};

export const Navigation = (props: any) => {
  const auth = useContext(AuthContext);
  const user = auth.user as User;
  const [dropdownState, changeDropdownState] = useState(false);
  const role = auth.userRole as Role;

  useEffect(() => {
    changeDropdownState(false);
  }, []);

  const Logout = () => {
    auth.updateStatus(false);
    auth.logout();
  };

  return (
    <span>
      <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
        <div className='container'>
          <div className='navbar-header'>
            <img src='img/icons/animo-icon.jpg' height="50px" alt='' />
            <a className='navbar-brand page-scroll' href='#page-top'>
              Animo
            </a>
          </div>
          <div
            className='collapse navbar-collapse'
            id='bs-example-navbar-collapse-1'
          >
            <ul className='nav navbar-nav navbar-right'>
              <NavigationBar
                isLoggedIn={auth.isLoggedIn}
                alreadyDidQuiz={user.personality && user.personality !== ''}
              />
              {!auth.isLoggedIn
                ? <li><Link to="/login">Login</Link></li>
                : <li className={dropdownState ? 'open' : 'dropdown'}>
                  <img style={{
                    height: '50px',
                    width: '50px',
                    borderRadius: user.imageUrl ? '50%' : undefined
                  }}
                  onClick={() =>
                    changeDropdownState(prev => !prev)} alt={user.first_name}
                  src={user.imageUrl || avatarImage} />
                  <i className="fa fa-caret-down"></i>
                  {role.role_type === RoleEnum.Admin &&
                   <AdminDropdown
                     onClickItem={changeDropdownState}
                     Logout={Logout}
                   />}
                  {role.role_type ===
                   RoleEnum.Psychologist &&
                   <PsychologistDropdown
                     onClickItem={changeDropdownState}
                     Logout={Logout}
                   />}
                  {role.role_type === RoleEnum.General &&
                   <GeneralDropdown
                     onClickItem={changeDropdownState}
                     Logout={Logout}
                   />}
                </li>}
            </ul>
          </div>
        </div>
      </nav>
    </span>
  );
};
