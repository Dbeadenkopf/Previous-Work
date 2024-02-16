import React, {ChangeEvent, FormEvent, useState} from 'react';

import {login} from '@actions/auth';
import {useAppDispatch} from '@hooks';

import styles from './DevLogin.module.scss';

const DevLogin = () => {
  const dispatch = useAppDispatch();
  const [usernameInput, setUsernameInput] = useState<string>('');

  const loginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(usernameInput));
  };

  const usernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(event.target.value);
  };

  return (
    <div style={{margin: '5px'}}>
      <form className={styles.loginForm} onSubmit={loginSubmit}>
        <label>Username:</label>
        <input onChange={usernameChange} />
        <button type="submit">Login</button>
      </form>
      <br />
      {'Or login as: '}
      <button onClick={() => dispatch(login('emily.employee@t1cg.com'))}>Employee</button>
      <button onClick={() => dispatch(login('manny.manager@t1cg.com'))}>Manager</button>
      <button onClick={() => dispatch(login('adam.admin@t1cg.com'))}>Admin</button>
    </div>
  );
};

export default DevLogin;
