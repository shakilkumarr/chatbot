import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, signInWithGoogle } from "../auth/firebase";

const Login = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      console.log('LOADING');
      return;
    }
    if (user) router.push('/');
  }, [user, loading]);

  return (
    <div>
      <div onClick={signInWithGoogle}>Login With google</div>
    </div>
  )
}

export default Login;
