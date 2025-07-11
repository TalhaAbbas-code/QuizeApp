import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import logo from "../assets/images/Graduate.png";

import QuizGrad from "../assets/images/QuizGrad.png";

import InputField from "../components/InputField";

import { useLocation, useNavigate } from "react-router-dom";
import { AdminLogin, Login } from "../services";
import Button from "../components/button";
import { toast } from "react-toastify";
import {CheckToken} from "../assets/utils/checkToken";
import { AuthContext } from "../context/AuthContext";


export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const location = useLocation();
  const role = location.state?.role || "user";
   const useAuth = useContext(AuthContext);
    if (!useAuth) {
      return (
        <div>
          Error: AuthContext not found. Make sure you're inside AuthProvider.
        </div>
      );
    }
    const { user, setUser } = useAuth;

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = (await (role === "admin"
        ? AdminLogin(data)
        
        : Login(data))) as { accessToken: string,role:string };

      if (response.accessToken) {
        if(response.role==="admin"){
          await CheckToken(setUser);
          toast.success("Login  successfully!");
          navigate("/admin");

        }
       if(response.role==="user"){
        await CheckToken(setUser);
        toast.success("Login  successfully!");
        navigate("/home");

       }
      
      }
      console.log(response);
    } catch (error) {
      toast.error("Login  Failed!");
      console.log(error);
    }
  };

  return (
    <div className=" h-[100vh] text-white   flex  flex-col md:flex-row w-full">
      <div className="lg:w-[50%] h-[100vh] px-[10%]    w-full flex justify-center   flex-col gap-3 md:pr-6">
        <div className="flex justify-center items-center">
          <img
            src={QuizGrad}
            alt="Sports Background"
            className="w-full h-20 "
          />
        </div>

        <p className="text-2xl text-center mt-5 mb-1 text-primary">
          Welcome Back!
          <br />
          {role === "admin"
            ? "LogIn As Admin"
            : "Please Sigup/Login to your Account"}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-4">
            <InputField
              label="Email"
              type="text"
              registerField="email"
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              }}
              error={errors.email}
              register={register}
            />
            <InputField
              label="Password"
              type="password"
              registerField="password"
              validation={{
                required: true,
                minLength: { value: 8, message: "Minimum 8 characters" },
              }}
              error={errors.password}
              register={register}
              showToggle={true}
              showValue={showPassword}
              onToggle={() => setShowPassword((prev) => !prev)}
            />
          </div>

          <Button
            title={role === "admin" ? "Login As Admin" : "Login As User"}
            className="w-full"
            bgFill
          ></Button>
        </form>
        <Button
          title="SigUp"
          onClick={() => navigate("/signup")}
          className="w-full mt-14"
        ></Button>
        <Button
          title={role === "admin" ? "Login As User" : "Login As Admin"}
          onClick={() =>
            navigate("/login", {
              state: { role: role === "admin" ? "" : "admin" },
            })
          }
          className="w-full  "
        ></Button>
      </div>

      <div className="hidden  md:flex lg:aspect-[3/2] bg-[#fafafa] justify-center items-center w-[50%] overflow-hidden rounded-xl h-[100vh]">
        <img src={logo} alt="Sports Background" className="w-[70%] h-[40%]" />
      </div>
    </div>
  );
}
