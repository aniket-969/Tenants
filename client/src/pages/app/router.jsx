
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import Layout from '@/layouts/Layout.jsx'
import AuthLayout from '@/layouts/AuthLayout.jsx'
import React from 'react';

const LandingPage = React.lazy(() => import('../LandingPage.jsx'));
const Login = React.lazy(() => import('../auth/Login.jsx'));
const Register = React.lazy(() => import('../auth/Register.jsx'));


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