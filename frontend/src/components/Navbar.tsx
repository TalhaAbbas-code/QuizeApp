import React, { useState } from 'react'
import QuizGrad from "../assets/images/QuizGrad.png"
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import Button from './button';
import {NavbarProps} from "../types/Navbar";

const Navbar = ({ user }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" text-black shadow-md px-[2%] md:px-[10%] py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center -mt-3 space-x-3">
          <img
            src={QuizGrad}
            alt="Sports365 Logo"
            className=" w-[70%] h-[15%] z-10 "
          />
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <RxHamburgerMenu className="text-2xl" />
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center text-[#E0E0E0] space-x-20 text-sm font-medium">
          <li>
            <Link to="/features" className="hover:text-secondary">
              How It Works?
            </Link>
          </li>
          <li>
            <Link to="/explore" className="hover:text-secondary">
              Features
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="hover:text-secondary">
              About Us
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex space-x-3 justify-center items-center">
          {user ? (
            <span className="text-black font-medium">Hi, {user.name}</span>
          ) : (
            <Link to="/login">
              <Button title="Login" className="w-24"></Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden py-5 flex flex-col text-[#E0E0E0] mt-4 space-y-3 text-center text-sm font-medium">
          <Link
            to="/features"
            className="active:text-primary  hover:text-secondary "
          >
            FEATURES
          </Link>
          <Link to="/explore" className="hover:text-secondary">
            EXPLORE
          </Link>
          <Link to="/pricing" className="hover:text-secondary">
            PRICING
          </Link>
          <Link to="/contact" className="hover:text-secondary">
            CONTACT
          </Link>
          <div className="flex flex-col items-center gap-2 mt-2">
            <Link to="/login">
              <Button title="Login"></Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar