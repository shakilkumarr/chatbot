import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuthState } from "react-firebase-hooks/auth";
import _filter from 'lodash/filter';
import { query, getDocs, collection } from "firebase/firestore"; 

import { auth, db } from "../auth/firebase";
import Header from '../components/Header';
import ChatBot from "../components/ChatBot";
import AddCommands from '../components/AddCommands';

const Home = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setAdminStatus] = useState(true);
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user) return router.push("/login");
    handleLoginSuccess();
  }, [user, loading]);

  const updateAdminStatus = async () => {
    const emailStatement = query(collection(db, "admin_email"));
    const querySnapshot = await getDocs(emailStatement);
    let isCurrUserAdmin = false;

    querySnapshot.forEach((doc) => {
      const currUser = doc.data();
      if (currUser[user.email]) isCurrUserAdmin = true;
    })
    setAdminStatus(isCurrUserAdmin);
  }

  const updateCommands = async () => {
    const cmdStatement = query(collection(db, "commands"));
    const querySnapshot = await getDocs(cmdStatement);
    const updatedCommands = [];

    querySnapshot.forEach((doc) => {
      const currData = doc.data();
      Object.keys(currData).length && updatedCommands.push(currData);
    });
    setCommands(updatedCommands)
  }

  const handleLoginSuccess = () => {
    updateAdminStatus();
    updateCommands();
  }

  console.log(commands);

  return (
    <div className="parent">
      <Header user={user} isAdmin={isAdmin} />
      <div className="body">
        <div className="sidebar">
          <Image className="m100" src="/bot.png" width={500} height={500}/>
        </div>
        <div className="main">
          {isAdmin && <div className="adminBtn"><AddCommands /></div>}
          <ChatBot name={user?.displayName || 'Guest'} commands={commands}/>
        </div>
      </div>
    </div>
  );
}

export default Home;
