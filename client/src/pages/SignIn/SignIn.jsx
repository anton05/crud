import { useState } from 'react';
import Form from '../../components/Form/Form';
import { logIn } from '../../services/API/apiService';
import styles from './SignIn.module.css';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { setLocalStorageItem } from '../../services/LocalStorage/localStorageService';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/constants';

const SignIn = () => {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  if (token) {
    return <Navigate to="/" replace />
  };

  const loginUser = async (email, password) => {
    const res = await logIn(email, password);

    if (res?.data.accessToken) {
      setLocalStorageItem(ACCESS_TOKEN, res.data.accessToken);
      setLocalStorageItem(REFRESH_TOKEN, res.data.refreshToken);
      setToken(res.data.accessToken);
      navigate('/');
    } else {
      setIsError(true);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.form_wrap}>
        <h1 className={styles.main_text}>SIGN IN &#128075;</h1>
        <Form
          submitHandler={loginUser}
          submitButtonText="login"
        />
        <p className={styles.text}>
          Or <NavLink to='/signup'>Register</NavLink>
        </p>
        {isError && <p className={styles.text}>You are not authorized or passed uncorrect data</p>}
      </div>
    </div>
  )
};

export default SignIn;