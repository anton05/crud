import { useState } from 'react';
import Form from '../../components/Form/Form';
import { signUp } from '../../services/API/apiService';
import styles from './SignUp.module.css';
import { NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

const SignUp = () => {
  const [isUserCreated, setIsUserCreated] = useState(false);
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" />
  };

  const createUser = async (email, password) => {
    try {
      const response = await signUp(email, password);
      debugger;
      if (response.status > 200 && response.status < 300) {
        setIsUserCreated(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_wrap}>
        {!isUserCreated && (
          <>
            <h1 className={styles.main_text}>SIGN UP</h1><Form
              submitHandler={createUser}
              submitButtonText="register" /><p className={styles.text}>
              Already have an account? <NavLink to='/signin'>Sign in</NavLink>
            </p>
          </>
        )}
        {isUserCreated && (
          <div className={styles.succesful_content}>
            <div>
              <span>&#128075;</span>
              <span>Registration is successful!</span>
              <span>Go to <NavLink to="/signin">login page</NavLink></span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default SignUp;