import React from 'react'
import { registerUser } from '@/api/queries/auth';
import { useEffect } from 'react';

const Register = () => {

    const data = {
        username: "me21",
        fullName: "me2",
        email: "me23@gmail.com",
        avatar: "sdfiwefserew",
        role: "tenant",
        password: "qwerty123@",
      };
    
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
    <div>Register</div>
  )
}

export default Register