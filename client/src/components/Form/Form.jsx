import { useState } from 'react';
import styles from './Form.module.css';

const Form = ({ submitHandler, submitButtonText }) => {
  const [isError, setIsError] = useState(false);
  const [inputsValue, setInputsValue] = useState({
    email: '',
    password: ''
  });

  const onInputsChange = (e) => {
    const { name, value } = e.target;
    setInputsValue({ ...inputsValue, [name]: value })
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputsValue.email.length < 5 || inputsValue.password.length < 5) {
      setIsError(true);
      return;
    };

    submitHandler(inputsValue.email, inputsValue.password);
    setInputsValue({ email: '', password: '' });
    setIsError(false);
  };

  return (
    <form className={styles.form_wrap} onSubmit={onSubmit}>
      <input
        className={styles.input}
        type='email'
        name='email'
        placeholder='Email...'
        value={inputsValue.email}
        onChange={onInputsChange}
      />
      <input
        className={styles.input}
        type='password'
        name='password'
        placeholder='Password...'
        value={inputsValue.password}
        onChange={onInputsChange}
      />

      {isError && <p className={styles.error_text}>Uncorrect email or password</p>}

      <button className={styles.button} type="submit">
        {submitButtonText.toUpperCase()}
      </button>
    </form>
  );
};

export default Form;