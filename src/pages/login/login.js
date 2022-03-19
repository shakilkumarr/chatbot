import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth";

import {Button} from 'antd'

import { auth, signInWithGoogle } from "../../auth/firebase";
import Header from '../../components/Header';

import styles from './login.module.css';

const Login = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  console.log(user, loading, error);
  useEffect(() => {
    if (error) alert('You are not authorised!');
    if (loading) {
      return;
    }
    if (user) router.push('/');
  }, [user, loading, router, error]);

  return (
    <div className="parent">
      <Header user={user} />
      <div className={styles.login}>
        <Button onClick={signInWithGoogle} type="primary">Login With google</Button>
        <div className="adminText">Kindly login to experience the Bot!</div>
      </div>
    </div>
  )
}

export default Login;
