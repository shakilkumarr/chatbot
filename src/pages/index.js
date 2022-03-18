import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuthState } from "react-firebase-hooks/auth";
import axios from 'axios';
import { doc, query, where, getDocs, collection, addDoc } from "firebase/firestore"; 

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
    axios.get(`/api/isAdmin?email=${user.email}`)
      .then((res) => {
        setAdminStatus(res.data.data);
      })
    axios.get('/api/getCommands')
      .then(res => setCommands(res.data.data));
    handleSuccess();
  }, [user, loading]);

  const handleSuccess = async () => {
    const q = query(collection(db, "admin_email"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

    // await addDoc(collection(db, "commands"), {
    //   key: ["your name","name","ur name","what is your name?", "who are you?"],
    //   value: "I am a Chatbot! Designed by Kongunadu College of Engineering and Technology",
    //   quest: 'whatis your name?',
    // })
  }

  return (
    <div className="parent">
      <Header user={user} isAdmin={isAdmin} />
      <div className="body">
        <div className="sidebar">
          <Image className="m100" src="/bot.png" width={500} height={500}/>
        </div>
        <div className="main">
          {/* <ChatBot name={user?.displayName || 'Guest'}/> */}
          <AddCommands />
        </div>
      </div>
    </div>
  );
}

export default Home;
