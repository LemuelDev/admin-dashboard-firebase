import {db} from '../config/firebase'
import {updateDoc, getDocs, collection, doc} from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import '../styles/update.css'


const UpdateUser = () => {

  const editRef = useRef(null)
  const userCollectionRef = collection(db, "users")
  const [users, setUsers] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [newUserName, setNewUserName] = useState("")
  const [currentTable, setCurrentTable] = useState("")

  
  const getUsers = async () => {
    try {
      const userList = await getDocs(userCollectionRef)
      const finalData = userList.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setUsers(finalData)
    }catch(err) {
      alert(err.code)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  

  
  const updateName = async (id) => {
    const userNameRef = doc(db, "users", id)
    if (newUserName){
      try{
        await updateDoc(userNameRef, {userName: newUserName})
        setUsers((prevList) => 
          prevList.map((user) => {
            if(user.userId === id){
              return {...user, userName: newUserName}
            }else {
              return user
            }
          })
        )
        getUsers()
        setIsEditing(false)
        setCurrentTable('')
      }catch(err) {
        console.log(err);
      }
    }else{
      alert('Please input the updated username')
    }
  }
  const inputFocus = () => {
    editRef.current.focus()
  }
  const enableEditName = (username) => {
    setCurrentTable(username)
    setIsEditing(true)
    if (editRef.current) {
      inputFocus()
    }
  }

  return (
    <div className="user-wrapper">
    <h4 className="title">Update UserName</h4>
    <table className="table">
        <thead>
          <tr>
          <th scope="col" className='title-table'>Username</th>
          <th scope="col" className='title-table'>UserId</th>
          <th scope="col" className='title-table'>Email</th>
          <th scope='col' className='title-table width'>Update UserName</th>
          </tr>
        </thead>  
        <tbody >
      {users.map((user) => {
      return (
          <tr key={user.userId}>
            <td>
              {isEditing && currentTable === user.userName ? 
              <input 
              type='text' 
              onChange={(e) => setNewUserName(e.target.value)}
              value={newUserName}
              ref={editRef}
              required/> 
              : user.userName}
            </td>
            <td>{user.userId}</td>
            <td>{user.email}</td>
            <td>
              <button 
              className={isEditing && currentTable === user.userName? 'btn btn-primary' : 'btn btn-success'} 
              onClick={isEditing && currentTable === user.userName? () => updateName(user.id) : () => enableEditName(user.userName)}>
              {isEditing && currentTable === user.userName? 'Save' : 'Update' }</button></td>
          </tr>
        )
        })}
        
        </tbody>
    </table>
    </div>
  )
}

export default UpdateUser