import React from 'react';

import {login} from '@actions/auth';
import {useAppDispatch} from '@hooks';
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';

import styles from './Login.module.scss';

const Login = () => {
  const dispatch = useAppDispatch();

  return (
    <GoogleOAuthProvider clientId={window.TIMESHEET_OAUTH2_CLIENT_ID}>
      <div className={styles.loginContainer}>
        <p className={styles.loginTitle}>T1CG TIMESHEET</p>
        <p className={styles.loginDescription}>Login to your account</p>
        <div id="one-tap-prompt" className={styles.oneTap} />
        <div className={styles.googleLogin}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              dispatch(login(credentialResponse.credential as string));
            }}
            useOneTap
            cancel_on_tap_outside={false}
            prompt_parent_id="one-tap-prompt"
            itp_support={true}
          />
        </div>
        <p className={styles.loginVersion}>Version 2.18.0</p>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
