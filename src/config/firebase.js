// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDpk3VTArRNOouSVK3ER4ISV0syVfuyaHc",
  authDomain: "admin-dashboard-e4029.firebaseapp.com",
  projectId: "admin-dashboard-e4029",
  storageBucket: "admin-dashboard-e4029.appspot.com",
  messagingSenderId: "832912192758",
  appId: "1:832912192758:web:035298a1d592ac9a1928d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)