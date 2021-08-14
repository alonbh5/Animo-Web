import { useContext } from "react"
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { AuthContext } from "../../shared/context/auth-context"
export const Navigation = (props: any) => {
  const auth = useContext(AuthContext);

  return (
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
              <li>
                <Link to="/analyze" className='page-scroll'>Emotional Analysis
                </Link>
              </li>}
            <li>
              <Link to="/tips" className='page-scroll'>Tips & article
              </Link>
            </li>
            <li>
              <HashLink to="/sos" className='page-scroll'>SOS</HashLink>
            </li>
            <li>
              <HashLink to="/home-page#about" className='page-scroll'>About</HashLink>
            </li>
            <li>
              <HashLink to="/home-page#contact" className='page-scroll'>Contact</HashLink>
            </li>
            {!auth.isLoggedIn ? <li>
              <Link to="/login" className='page-scroll'>Login</Link>
             </li> : <li>
              <Link to="/profile" className='page-scroll'>Profile</Link>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  )
}