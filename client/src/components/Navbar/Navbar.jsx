import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logo.svg'
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { ACCESS_TOKEN } from '../../constants/constants';
import { removeLocalStorageItem } from '../../services/LocalStorage/localStorageService';

const Navbar = () => {
  const { token, setToken } = useAuth();

  const logout = () => {
    removeLocalStorageItem(ACCESS_TOKEN);
    setToken(null);
  };  

  return (
    <div className={styles.navbar}>
      <ul>
        <div>
          <li>
            <img src={logo} alt="logo" />
          </li>
        </div>
        <div>
          {token &&
            <>
              <li onClick={logout}>Logout</li>
            </>
          }
          {!token &&
            <>
              <li><NavLink to="/signin">Login</NavLink></li>
              <li><NavLink to="/signup">Register</NavLink></li>
            </>
          }
        </div>
      </ul>
    </div>
  );
};

export default Navbar;