import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../auth/firebase";

const Home = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (!user) return router.push("/login");
    console.log(user);
  }, [user, loading]);

  return (
    <div>
       <div>
        Logged in as
         <div>{user?.displayName}</div>
       </div>
     </div>
  );
}

export default Home;
