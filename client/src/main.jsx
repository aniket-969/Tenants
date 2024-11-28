
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate} from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path='/' element = {<Layout/>}>
         <Route path='' element={<LandingPage/>}/>
        </Route>
        <Route element={<AuthLayout />}>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Route>
        </>
        
        
    )
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router}/>
     
   
)
 