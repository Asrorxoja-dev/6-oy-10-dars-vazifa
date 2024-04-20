import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/fireBaseConfig";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useContext } from "react";
import { GlobalContext } from "../context/useGlobalContext";

function useSignup() {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const { dispatch } = useContext(GlobalContext);
  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        dispatch({ type: "SIGN_IN", payload: user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const signupWithPasswordAndEmail = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        alert("This accaunt already in use !")
      });
  };
  return { signUpWithGoogle, signupWithPasswordAndEmail, user, error };
}

export { useSignup };
