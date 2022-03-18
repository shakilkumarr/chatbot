import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../auth/firebase";
import Header from '../components/Header';

const Home = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setAdminStatus] = useState(true);
  useEffect(() => {
    if (loading) return;
    if (!user) return router.push("/login");
    console.log(user);
  }, [user, loading]);

  return (
    <div className="parent">
      <Header user={user} isAdmin={isAdmin} />
      <div className="body">
        <div>
          Logged in as
          <div>{user?.displayName}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
