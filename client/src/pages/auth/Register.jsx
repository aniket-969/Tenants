import React from 'react'
import { registerUser } from '@/api/queries/auth';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { SignUp } from '@/components/form/RegisterForm';

const Register = () => {

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
    <SignUp/>
    </>
    
  )
}

export default Register