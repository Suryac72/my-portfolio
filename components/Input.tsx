import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface InputProps {
  label: string;
  inputType: string;
  inputName: string;
  isRequired?: boolean;
  isTextArea?: boolean;
  rows?: number;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const Input = ({
  label,
  inputType,
  inputName,
  isRequired,
  isTextArea,
  rows = 10,
  register,
  errors,
}: InputProps) => {

  return (
    <>
      <label className="uppercase text-sm py-2">{`${label}${
        isRequired ? " *" : ""
      }`}</label>
      {!isTextArea ? (
        <input
          className={`border-2 rounded-lg p-3 flex border-gray-300 ${
            errors[inputName] ? "border-red-500" : ""
          }`}
          type={inputType}
          {...register(inputName, { required: isRequired })}
        />
      ) : (
        <textarea
          className={`border-2 rounded-lg p-3 border-gray-300 ${
            errors[inputName] ? "border-red-500" : ""
          }`}
          rows={rows}
          {...register(inputName, { required: isRequired })}
        ></textarea>
      )}
      {errors[inputName] && (
        <span className="text-red-600 pt-2">
          {errors[inputName] && `${label} is required.`}
        </span>
      )}
    </>
  );
};
