import '../styles/users.css'
import {db} from '../config/firebase'
import {getDocs, collection} from 'firebase/firestore'
import { useEffect, useState } from 'react'


const AllUsers = () => {

  const userCollectionRef = collection(db, "users")
  const [users, setUsers] = useState([]);

  const getUsers = async () => {

    try {
      const userList = await getDocs(userCollectionRef)
      const finalData = userList.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setUsers(finalData)
    }catch(err){
      alert(err.code)
    }
    
  }

  useEffect(() => {
    getUsers()
  }, [])
  
  return (
    <div className="user-wrapper">
        <h4 className="title">All Users</h4>
        <table className="table">
            <thead>
              <tr>
              <th scope="col">Username</th>
              <th scope="col">UserId</th>
              <th scope="col">Email</th>
              </tr>
            </thead>  
            <tbody >
          {users.map((user) => {
          return (
              <tr key={user.userId}>
                <td>{user.userName}</td>
                <td>{user.userId}</td>
                <td>{user.email}</td>
              </tr>
            )
            })}
            
            </tbody>
        </table>
       
      
    </div>
  )
}

export default AllUsers