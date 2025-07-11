import React, { useContext, useEffect } from "react";
import landingPage from "../assets/images/landingPage.png";
import Button from "../components/button";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthenticatedUser } from "../types/User";
import { AuthContext } from "../context/AuthContext";




const Landing = () => {
  const useAuth = useContext(AuthContext);
  if (!useAuth) {
    return (
      <div>
        Error: AuthContext not found. Make sure you're inside AuthProvider.
      </div>
    );
  }
  const { user, setUser } = useAuth;

 
  const navigate = useNavigate();

  useEffect(() => {
   
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const validateToken = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };



  return (
    <>
      <Navbar user={user} />
      <div className="h-[100vh] text-white flex flex-col md:flex-row w-full">
        <div className="md:w-[50%] h-[100vh] px-[10%] py-[10%] w-full flex flex-col gap-10 md:pr-6">
          <div>
            <p className="text-black font-bold text-6xl leading-snug">
              Learn
              <br />
              New Concepts
              <br />
              For Each Question
            </p>
            <p className="text-black text-xl">
              We Help you prepare for Exams and Quizzes
            </p>
          </div>

          <div className="flex gap-10">
            <Button title="Start Solving" onClick={validateToken} bgFill />
            <Button title="Learn More" />
          </div>
        </div>

        <div className="hidden mt-1 md:flex aspect-[3/2] bg-white justify-center w-[50%] overflow-hidden rounded-xl h-[100vh]">
          <img
            src={landingPage}
            alt="Landing Page"
            className="w-[80%] h-[80%]"
          />
        </div>
      </div>
    </>
  );
};

export default Landing;
