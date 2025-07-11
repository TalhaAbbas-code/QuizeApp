import React, { useState } from "react";
import { useForm } from "react-hook-form";

import signup from "../assets/images/signup2.jpg";

import QuizGrad from "../assets/images/QuizGrad.png";

import InputField from "../components/InputField";

import { useNavigate } from "react-router-dom";
import { Signup } from "../services";
import Button from "../components/button";
import { toast } from "react-toastify";

export default function Sigup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);

  const onSubmit = async (data) => {
    console.log(data,"sigup data");
    try {
      const response = await Signup(data);
    
      if (response.accessToken) {
         toast.success("SignUp  successfully!");
        
        navigate("/login");
      }
      console.log(response);
    } catch (error) {
      toast.error("SignUp Filed!")
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
          Please Sigup/Login to your Account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-4">
            <InputField
              label="Name"
              type="text"
              registerField="name"
              validation={{
                required: "Name is required",
              }}
              error={errors.name}
              register={register}
            />
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

          <Button title="SigUp" className="w-full" bgFill></Button>
        </form>
        <Button
          title="Login"
          onClick={() => navigate("/login")}
          className="w-full mt-14"
        ></Button>
        <Button
          title="LogIn As Admin"
          onClick={() => navigate("/login", { state: { role: "admin" } })}
          className="w-full  "
        ></Button>
      </div>

      <div className="hidden  md:flex lg:aspect-[3/2] bg-[#fafafa] justify-center items-center w-[50%] overflow-hidden rounded-xl h-[100vh]">
        <img
          src={signup}
          alt="Sports Background"
          className="w-[90%] h-[90%] rounded-md"
        />
      </div>
    </div>
  );
}
