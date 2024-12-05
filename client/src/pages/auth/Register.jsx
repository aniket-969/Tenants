import React from "react";
import { registerUser } from "@/api/queries/auth";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { SignUp } from "@/components/form/RegisterForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Register = () => {
  const notify = () => toast("Wow so easy!");
  useEffect(() => {
    const register = async () => {
      try {
        const response = await registerUser(data);
        console.log("Registration successful:", response);
      } catch (error) {
        console.error(
          "Registration failed:",
          error.response?.data || error.message
        );
      }
    };

    //    register()
  }, []);

  return (
    <>
      <h1>Register</h1>
      <div className="w-full max-w-[20rem] ">
         <SignUp />
      </div>
     
      <div className="flex gap-4 items-center">
        <p>Already have an account?</p>
        <Link to="/login" className="text-muted-foreground text-bold ">
          Login
        </Link>
      </div>
    </>
  );
};

export default Register;
