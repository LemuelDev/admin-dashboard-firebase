import {db} from '../config/firebase'
import {deleteDoc, getDocs, collection, doc} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const DeleteUser = () => {

  const userCollection = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedId, setSelectedId] = useState("")

  const getUsers = async () => {
    try {
      const list = await getDocs(userCollection)
      const updatedList = list.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setUsers(updatedList)
    }catch(err) {
      alert(err.code)
    }
  }
  useEffect(() => {
    getUsers()
  }, [])

  const deleteUser = async () => {
  if (selectedId) {
    const userRef = doc(db, "users", selectedId);
    try {
      await deleteDoc(userRef);
      setUsers((prevList) =>
        prevList.filter((user) => user.id !== selectedId)
      );
    } catch (err) {
      alert(err.code);
    }
  }

  // Close the modal
  handleClose();
};

  const handleClose = () => setIsDeleting(false)
  const handleShow = (id) => {
    setIsDeleting(true)
    setSelectedId(id)
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
              <th scope='col' className='title-table width'>Delete</th>
              </tr>
            </thead>  
            <tbody >
          {users.map((user) => {
          return (
              <tr key={user.userId}>
                <td>
                  {user.userName}
                </td>
                <td>{user.userId}</td>
                <td>{user.email}</td>
                <td>
                  <button 
                  className='btn btn-danger'
                  onClick={() => handleShow(user.id)}>Delete</button></td>
              </tr> 
            )
            })}

            </tbody>
        </table>

        {/* modal for deleting */}
        <Modal show={isDeleting}onHide={handleClose}>
            <Modal.Header closeButton style={{ border: 'none' }}>
              <Modal.Title>Delete UserList</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ border: 'none' }}>Are you sure you want to delete this User ? </Modal.Body>
            <Modal.Footer style={{ border: 'none' }}>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={deleteUser}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
              
    </div>
    
  )
}

export default DeleteUser