import { useSignup } from "../hooks/useSignup"
import { FcGoogle } from "react-icons/fc";

function Signin() {
const {signUpWithGoogle, user, error} = useSignup()

  return (
    <div className=" grid place-items-center mt-40 ">
      <h1 className="text-5xl mb-10 ">Sign in</h1>
      <button onClick={signUpWithGoogle} className="btn to-base-300 border-slate-500"> <FcGoogle className="w-7 h-7" />  Google</button>
    </div>
  )
}

export default Signin