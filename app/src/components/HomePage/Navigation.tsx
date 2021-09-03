import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { AuthContext } from '../../shared/context/auth-context';
import { User } from '../api/configuration/models/users';
import { Role, RoleEnum } from '../api/configuration/models/role';

type clickItemProp = {
  onClickItem: (value:boolean) => void;
  Logout: () => void;
}
const AdminDropdown = (props:clickItemProp) => {
  const _onClickItem = () => {
    props.onClickItem(false);
  };
  return (<div className="dropdown-menu">
    <li>
      <Link to="/profile" onClick={_onClickItem}>Profile</Link>
    </li>
    <li>
      <Link to="/manageUsers" onClick={_onClickItem}>Manage Users</Link>
    </li>
    <li>
      <Link to="/invitePsycoligist"
        onClick={_onClickItem}>Invite Psycoligist</Link>
    </li>
    <li>
      <Link to="/uploadTipsArticals"
        onClick={_onClickItem}>{'Upload Tips & Articals'}</Link>
    </li>
    <li>
      <Link to="/confirmTipsArticals"
        onClick={_onClickItem}>{'Confirm Tips & Articals'}</Link>
    </li>
    <li>
      <a onClick={() => props.Logout()}>Logout</a>
    </li>
  </div>
  );
};

const PsychologistDropdown = (props:clickItemProp) => {
  const _onClickItem = () => {
    props.onClickItem(false);
  };

  return (<div className="dropdown-menu">
    <li>
      <Link to="/profile" onClick={_onClickItem}>Profile</Link>
    </li>
    <li>
      <Link to="/aboutMePsycoligist"
        onClick={_onClickItem}>About Me</Link>
    </li>
    <li>
      <Link to="/uploadTipsArticals"
        onClick={_onClickItem}>{'Upload Tips & Articals'}</Link>
    </li>
    <li>
      <a onClick={() => props.Logout()}>Logout</a>
    </li>
  </div>
  );
};

const GeneralDropdown = (props:clickItemProp) => {
  const _onClickItem = () => {
    props.onClickItem(false);
  };

  return (
    <div className="dropdown-menu">
      <li>
        <Link to="/profile" onClick={_onClickItem}>Profile</Link>
      </li>
      <li>
        <a onClick={() => props.Logout()}>Logout</a>
      </li>
    </div>

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
              {auth.isLoggedIn &&
                <>
                  {(!user.personality || user.personality === '') &&
                    <li>
                      <Link
                        to="/personalquiz"
                        style={{ color: 'blue' }}>
                        Personal Quiz
                      </Link>
                    </li>}
                  <li>
                    <Link to="/analyze">Emotional Analysis
                    </Link>
                  </li>

                </>
              }
              <li>
                <Link to="/tips">Tips & article
                </Link>
              </li>
              <li>
                <HashLink to="/sos">SOS</HashLink>
              </li>
              <li>
                <HashLink to="/home-page#about">About</HashLink>
              </li>
              <li>
                <HashLink to="/home-page#contact">Contact</HashLink>
              </li>
              <li>
                <HashLink to="/chat">Chat</HashLink>
              </li>
              {!auth.isLoggedIn
                ? <li>
                  <Link to="/login">Login</Link>
                </li>
                : <li className={dropdownState ? 'open' : 'dropdown'}>
                  <a className="dropdown-toggle"
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      background: 'light grey'
                    }}
                    onClick={() => changeDropdownState(prev => !prev)}
                    id="dropdownMenuButton1">
                    {user.first_name + ' ' + user.last_name}
                    <i className="fa fa-caret-down"></i>
                  </a>
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
