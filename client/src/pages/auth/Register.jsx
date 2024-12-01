import React from 'react'
import { registerUser } from '@/api/queries/auth';
import { useEffect } from 'react';
import { Bounce, toast } from 'react-toastify';

const Register = () => {

    const data = {
        username: "me21",
        fullName: "me2",
        email: "me23@gmail.com",
        avatar: "sdfiwefserew",
        role: "tenant",
        password: "qwerty123@",
      };
      const notify = () => toast('Wow so easy!');
      useEffect(() => {
        const register = async () => {
          try {
            const response = await registerUser(data);
            console.log("Registration successful:", response);
          } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
          }
        };
    
    //    register()
      }, []);
    

  return (
    <>
    <div>Register</div>
    <button onClick={notify}>Notify !</button>
    </>
    
  )
}

export default Register