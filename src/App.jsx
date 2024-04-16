import { BrowserRouter, RouterProvider, Router, createBrowserRouter } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import ProtectedRoutes from "./components/ProtectedRoutes"
import About from "./pages/About"
import Contact from "./pages/Contact"


function App() {
const routes = createBrowserRouter([
  {
    path:"/",
    element: <ProtectedRoutes user={true}>
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
    element:<Signin/>
  },
  {
    path:"/signup",
    element:<Signup/> 
  }
])

  return (
    <>
     <RouterProvider router={routes}/>
    </>
  )
}

export default App
