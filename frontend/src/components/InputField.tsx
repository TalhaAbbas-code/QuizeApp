import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  FieldError,
  FieldValues,
  Merge,
  UseFormRegister,
} from "react-hook-form";

type InputFieldProps = {
  label: string,
  type?: string,
  registerField: string,
  validation: Record<string, any>,
  error?: FieldError | Merge<FieldError, any>,
  register: UseFormRegister<FieldValues>,
  showToggle?: boolean,
  showValue?: boolean,
  onToggle?: () => void,
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  registerField,
  validation,
  error,
  register,
  showToggle = false,
  showValue = false,
  onToggle = () => {},
}) => {
  const inputClass =
    "w-full p-2 bg-white border border-secondary rounded-md text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary pr-10";

  const inputType = showToggle ? (showValue ? "text" : "password") : type;

  return (
    <div className="w-full relative">
      <label className="block mb-1 text-primary">{label}</label>
      <input
        type={inputType}
        {...register(registerField, validation)}
        className={inputClass}
      />

      {showToggle && (
        <span
          className="absolute right-3 top-10 text-secondary cursor-pointer"
          onClick={onToggle}
        >
          {showValue ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message || `${label} is required.`}
        </p>
      )}
    </div>
  );
};

export default InputField;
