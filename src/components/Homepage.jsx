// import {getDocs, addDoc, deleteDoc, updateDoc, doc} from 'firebase/firestore'
import {signOut} from 'firebase/auth'
import {auth, db} from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import '../styles/home.css'
import { createContext, useState } from 'react'
import ReactSwitch from 'react-switch'
import { Link } from 'react-router-dom'
import AllUsers from "./AllUsers";
import UpdateUser from "./UpdateUser"
import Settings from "./Settings"
import DeleteUser from "./DeleteUser"
import WelcomePage from './Welcomepage'
import {getDocs, collection} from 'firebase/firestore'
import { useEffect } from 'react'

const Homepage = () => {

    const history = useNavigate()
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState("")


    const handleLogOut =  () => {
        signOut(auth)
        history('/')
    }

    const ThemeContext = createContext(null)

    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
      setTheme((prev) => prev == 'light' ? 'dark' : 'light')
    }

    const [selectedComponent, setSelectedComponent] = useState(<WelcomePage/>)

    const [isActive, setIsActive] = useState(null)

    const renderComponent = (component, links) => {
        setSelectedComponent(component)
        setIsActive(links)
    }

    const userCollectionRef = collection(db, "users")

    const getUsers = async () => {
      try {
        const list = await getDocs(userCollectionRef)
        const finalList = list.docs.map((user) => ({...user.data(), id: user.id}))
        setUsers(finalList)
      }catch(err) {
        alert(err.code)
      }
    }

    const getUserName = () => {
      return users.map((user) => {
        if (user.userId === auth?.currentUser?.uid) {
          const userName = user.userName.charAt(0).toUpperCase() + user.userName.slice(1)
          return setCurrentUser(userName)
        }
      })
    }

    useEffect(() => {
      getUsers()
    }, [])
    useEffect(() => {
      getUserName()
    }, [users])



  return (
  
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <section className="homepage" id={theme}>
            <div className="sidebar">
              <div className="content">
              <h4 style={{fontWeight: 'bold', paddingBottom: '.5rem'}}>Welcome</h4>
              <h4 style={{fontWeight: 'bold', marginTop: '0'}}>{currentUser ? `${currentUser}` : 'Rendering...'}</h4>
              <Link 
               className={isActive === 'all-users' ? 'links active' : 'links'}
               onClick={() => renderComponent(<AllUsers/>,'all-users')}> All Users </Link>
                
              <Link 
              className={isActive === 'update-users' ? 'links active' : 'links'} 
              onClick={() => renderComponent(<UpdateUser/>, 'update-users')}> Update Users</Link>

              <Link 
              className={isActive === 'delete-users'? 'links active' : 'links'} 
              onClick={() => renderComponent(<DeleteUser/>, 'delete-users')}> Delete Users</Link>

              <Link 
              className={isActive === 'settings'? 'links active' : 'links'} 
              onClick={() => renderComponent(<Settings/>, 'settings')}>Credits</Link>

               <button onClick={handleLogOut} className='btn-signout'>Sign Out</button>
               
              </div>
          </div>

          <div className="main-content">
              <header>
                  <nav>
                    <p>{theme === 'light' ? "Light Mode" : "Dark Mode"}</p>
                    <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'}/>
                  </nav>
              </header>

              <section className='render-section'>
                {selectedComponent}
              </section>

              
          </div>

        </section>
      </ThemeContext.Provider>
    
   
  )
}

export default Homepage