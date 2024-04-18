import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../firebase/fireBaseConfig"
import { useState } from "react"

import { useContext } from "react"
import {GlobalContext} from "../context/useGlobalContext"

function useSignup() {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const {dispatch} = useContext(GlobalContext)
    const signUpWithGoogle = ()=>{
        const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
     setUser(user);
     dispatch({type:"SIGN_IN", payload: user})
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
      
      }
  return {signUpWithGoogle, user, error}
}

export  {useSignup}