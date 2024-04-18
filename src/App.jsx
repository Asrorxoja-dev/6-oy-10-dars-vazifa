import { BrowserRouter, RouterProvider, Router, createBrowserRouter, Navigate } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import ProtectedRoutes from "./components/ProtectedRoutes"
import About from "./pages/About"
import Contact from "./pages/Contact"

import { useContext, useEffect } from "react"
import { GlobalContext, GlobalContextProvider } from "./context/useGlobalContext"


import { auth } from "./firebase/fireBaseConfig"
import { onAuthStateChanged } from "firebase/auth"

function App() {
const { user, dispatch, authChange } = useContext(GlobalContext)
const routes = createBrowserRouter([
  {
    path:"/",
    element: <ProtectedRoutes user={user}>
      <MainLayout/>
    </ProtectedRoutes> ,
    children:[
      {
        index:true,
        element:<Home/>
      },

      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contact",
        element:<Contact/>
      }

    ]
  },
  {
    path:"/signin",
    element: user ? <Navigate to="/" /> : <Signin/>
  },
  {
    path:"/signup",
    element: user ? <Navigate to="/" /> : <Signup/> 
  }
])

useEffect(()=>{
  
onAuthStateChanged(auth, (user) => {
 dispatch({
  type:"SIGN_IN",
  payload: user
 });
 dispatch({
  type:"AUTH_CHANGE",
 })
});
},[])

  return <>{authChange && <RouterProvider router={routes}/>}</>
}

export default App
