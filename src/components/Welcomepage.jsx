import { useEffect, useState } from 'react';
import '../styles/welcome.css';
import { auth, db } from '../config/firebase';
import {getDocs, collection} from 'firebase/firestore'

const Welcomepage = () => {

  const [users, setUsers] = useState([])
  const [recentUser, setRecentUser] = useState("");

  const userCollectionRef = collection(db, "users")

  const getUsers = async () => {
    try {
      const list = await getDocs(userCollectionRef);
      const finalList = list.docs.map((user) => ({...user.data(), id: user.id}))
      setUsers(finalList)
     
    }catch(err){
      console.log(err.code);
    }

  }
  const currentUser = () => {
    return users.map((user) => {
      if (user.userId === auth?.currentUser?.uid){
        const userName = user.userName.charAt(0).toUpperCase() + user.userName.slice(1)
        setRecentUser(userName)
      }
    })
  }
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    currentUser()
  }, [users])

  return (
    <div className="welcome-wrapper">
      <h4>Welcome, Admin</h4>
      <h4>{recentUser ? recentUser : 'Gathering data from db....'}</h4>
    </div>
  );
};

export default Welcomepage;
