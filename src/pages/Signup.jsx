import { useSignup } from "../hooks/useSignup"
import { FcGoogle } from "react-icons/fc";

function Signup() {
const {signUpWithGoogle, user, error} = useSignup()
console.log(user);
  return (
    <div className="mt-40 grid place-items-center">
            <h1 className="text-5xl mb-10 ">Sign up</h1>
      <button onClick={signUpWithGoogle} className="btn to-base-300 border-slate-500"> <FcGoogle className="w-7 h-7" />  Google</button>
    </div>
  )
}

export default Signup