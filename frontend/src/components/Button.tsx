import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  bgFill?: boolean;
  width?: string;
  bgColor?: "primary" | "secondary" | "red" | "blue";
  
}

const Button: React.FC<ButtonProps> = ({
  title,
  bgFill = false,
  width = "",
  bgColor = "secondary", 
  className = "",
  ...rest
}) => {
  const baseClasses =
    "px-4 py-2 hover:scale-105 rounded-md text-sm font-semibold transition duration-200 ease-in-out ";

  const bgStyles = {
    primary: {
      filled: "bg-primary text-black hover:bg-primary/90 border border-primary",
      outline:
        "text-primary border border-primary hover:bg-primary hover:text-black",
    },
    secondary: {
      filled:
        "bg-secondary text-white hover:bg-secondary/90  border border-secondary",
      outline:
        "text-secondary border border-secondary hover:bg-secondary hover:text-white",
    },
   
  };

  const fillStyle = bgStyles[bgColor][bgFill ? "filled" : "outline"];

  return (
    <button
      className={`${baseClasses} ${fillStyle} ${width} ${className}`}
      {...rest}
    >
      {title}
    </button>
  );
};

export default Button;
