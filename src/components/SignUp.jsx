import { useState } from "react"
import '../styles/signup.css'
import {auth, db} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import {addDoc, collection} from 'firebase/firestore'

const SignUp = () => {

    const [adminName, setAdminName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignIn, setIsSignIn] = useState(false)
    const [error, setError] = useState('')

    const history = useNavigate()

    const userCollectionRef = collection(db, "users")

    const addUser = async () => {
        try {
            await addDoc(userCollectionRef, 
            {userName: adminName, 
            email: email, 
            userId: auth?.currentUser?.uid})
            
        }catch(err){
            console.log(err)
        }
    }
    
    
    const handleSubmit = async (e, type) => {
        e.preventDefault();
        if (type == 'sign-up'){
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                addUser()
                setEmail('')
                setPassword('')
                setError('')
                history('/home/*')
                
            }catch(err) {
                setError(err.code)
                setIsSignIn(true)
               
            }
        }
        else {
            try {
              await signInWithEmailAndPassword(auth, email, password)
              setEmail('')
              setPassword('')
              history('/home/*')
              setError('')
            }catch(err) {
                setError(err.code)
            }
        }
    }
   

  

  return (
   <section className="body-wrapper">
         <div className="wrapper">
            <h4 className="mini-title"> ADMIN_DASHBOARD</h4>
        <form onSubmit={(e) => handleSubmit(e,isSignIn ? 'sign-in' : 'sign-up')}>
        <div className="input-section">
             <h4>{isSignIn ? 'Sign In' : 'Sign Up'}</h4>
             {isSignIn ? null :
             <input
             type="text"
             placeholder="Enter Admin Name"
             value={adminName}
             onChange={(e) => setAdminName(e.target.value)}
             required
             className="inputs"
             />}
             <input
             type="email" 
             placeholder="Enter Email"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
             required
             className="inputs"
             />
             <input 
             type="password"
             placeholder="Enter Password"
             onChange={(e) => setPassword(e.target.value)} 
             value={password}
             required
             className="inputs"/>
             <input type="submit" value={isSignIn ? 'Sign In' : 'Sign Up'} className="btn-submit"/>
             {error ? <p className="error">{error}</p> : null}
         </div>
        </form>
        <div className="buttons">
             <button 
             className="button focus" 
             onClick={() => setIsSignIn(false)}>Sign Up</button>
             <button 
             className="button focus" 
             onClick={() => setIsSignIn(true)}>Sign In</button>
         </div>

     </div>
   </section>
  )
}

export default SignUp