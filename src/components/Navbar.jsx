import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useContext } from "react";
import { GlobalContext } from "../context/useGlobalContext";
import { useState, useEffect } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

import { signOut } from "firebase/auth";
import {auth} from "../firebase/fireBaseConfig"
function Navbar() {
  const { dispatch, navbarBgColor, user } = useContext(GlobalContext);
  const [theme, setTheme] = useState(darkModeLocalstorage())



const signOutFunc = ()=>{
signOut(auth)
.then(()=>{
  console.log("sign out");
})
.catch((error)=>{
  console.log(error);
})
}
  function darkModeLocalstorage(){
    return localStorage.getItem("mode") || themes.light;
    
  }
  
  const themes = {
    dark:"dark",
    light:"light"
  }

const handleClick = () =>{
const newTheme = theme == themes.light ? themes.dark : themes.light
setTheme(newTheme)
localStorage.setItem("mode", newTheme)

}

useEffect(() =>{
  document.documentElement.setAttribute("data-theme", theme)
  },[theme])

  return (
    <div 
    className="" style={{ backgroundColor: navbarBgColor }}>
      <div className="navbar align-element">
        <div className="navbar-start">

          <Link to="/" className="btn btn-primary lg:btn-lg hidden lg:flex">
            MyKitchen
          </Link>
          <div tabIndex={0} role="button" className="dropdown  lg:hidden">
            <button className="btn btn-primary lg:btn-lg ">MK</button>
            <div
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 mt-3 rounded-box w-52"
            >
              <NavLinks />
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <NavLinks />
        </div>
        <div className="navbar-end">
        {user && <p className="mr-3"> {user.displayName}</p>}
          <div className="dropdown dropdown-end flex items-center">
          
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt={`${user.displayName ?? "user"}image`}
                  src={user.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={signOutFunc} className="btn btn-sm">Logout</button>
              </li>
            </ul>
          </div>
          
        </div>

      </div>
     

    
    <div className="flex relative justify-between items-center cursor-pointer">
    <div className="absolute px-5 top-8 rounded-md bg-transparent left-10">
<ul className="menu menu-horizontal bg-base-300 rounded ml-5">
  <li><a onClick={()=> dispatch({type: "CHANGE_COLOR", payload:"grey"})}> 🔘</a></li>
  <li><a onClick={()=> dispatch({type: "CHANGE_COLOR", payload:"red"})}> 🔴</a></li>
  <li><a onClick={()=> dispatch({type: "CHANGE_COLOR", payload:"blue"})}> 🔵</a></li>
</ul>
    </div>

<div className="absolute px-5 right-20  top-8">
<label className="swap swap-rotate" >

{/* this hidden checkbox controls the state */}
<input onClick={handleClick} type="checkbox"
defaultChecked={theme == "dark" ? false : true}/>

{/* sun icon */}
<IoSunnyOutline  className="swap-off fill-current w-8 h-8" />

{/* moon icon */}
<IoMoonOutline className="swap-on fill-current w-8 h-8" />

</label>
</div>
 
</div>


    </div>

  
  );
}

export default Navbar;
