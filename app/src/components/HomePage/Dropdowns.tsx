import { Link } from 'react-router-dom';
// import { HashLink } from 'react-router-hash-link';

type DropdownProps = {
    onClickItem: (value:boolean) => void;
    Logout: () => void;
  }

export const AdminDropdown = (props:DropdownProps) => {
  const _onClickItem = () => {
    props.onClickItem(false);
  };

  return (
    <div className="dropdown-menu">
      <li><Link to="/profile" onClick={_onClickItem}>Profile</Link></li>
      <li><Link to="/messaging">Messanger</Link></li>
      <li><Link to="/manageUsers" onClick={_onClickItem}>Manage Users</Link></li>
      <li><Link to="/invitePsychologist" onClick={_onClickItem}>Invite Psycoligist</Link></li>
      <li><Link to="/uploadTipsArticals" onClick={_onClickItem}>{'Upload Tips & Articals'}</Link></li>
      <li><Link to="/confirmTips"onClick={_onClickItem}>{'Confirm Tips & Articals'}</Link></li>
      <li><a onClick={() => props.Logout()}>Logout</a></li>
    </div>
  );
};

export const PsychologistDropdown = (props:DropdownProps) => {
  const _onClickItem = () => {
    props.onClickItem(false);
  };

  return (<div className="dropdown-menu">
    <li><Link to="/profile" onClick={_onClickItem}>Profile</Link></li>
    <li><Link to="/messaging">Messanger</Link></li>
    <li><Link to="/aboutMePsycoligist" onClick={_onClickItem}>About Me</Link></li>
    <li><Link to="/uploadTipsArticals" onClick={_onClickItem}>{'Upload Tips & Articals'}</Link></li>
    <li><a onClick={() => props.Logout()}>Logout</a></li>
  </div>
  );
};

export const GeneralDropdown = (props:DropdownProps) => {
  const _onClickItem = () => {
    props.onClickItem(false);
  };

  return (
    <div className="dropdown-menu">
      <li><Link to="/profile" onClick={_onClickItem}>Profile</Link></li>
      <li><Link to="/messaging">Messanger</Link></li>
      <li><a onClick={() => props.Logout()}>Logout</a></li>
    </div>

  );
};
