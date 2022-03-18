import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuthState } from "react-firebase-hooks/auth";
import axios from 'axios';

import { auth } from "../auth/firebase";
import Header from '../components/Header';

const Home = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setAdminStatus] = useState(true);
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user) return router.push("/login");
    axios.get(`/api/isAdmin?email=${user.email}`)
      .then((res) => {
        setAdminStatus(res.data.data);
      })
    axios.get('/api/getCommands')
      .then(res => setCommands(res.data.data))
  }, [user, loading]);

  console.log(commands);

  return (
    <div className="parent">
      <Header user={user} isAdmin={isAdmin} />
      <div className="body"></div>
    </div>
  );
}

export default Home;
