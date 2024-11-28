
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate} from 'react-router-dom'
import Layout from '@/layouts/Layout.jsx'
import LandingPage from '../LandingPage.jsx'
import AuthLayout from '@/layouts/AuthLayout.jsx'
import Register from '../auth/Register.jsx'
import Login from '../auth/Login.jsx'

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

export const AppRouter = ()=>{
    return <RouterProvider router = {router}/>
}