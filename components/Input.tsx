import React from "react";

interface InputProps {
  label: string;
  inputType: string;
  inputName: string;
  errorMessage: string;
  isRequired?: boolean;
  isTextArea?: boolean;
  rows?: number;
}
export const Input = ({
  label,
  inputType,
  inputName,
  errorMessage,
  isRequired,
  isTextArea,
  rows = 10,
}: InputProps) => {
  return (
    <>
      <label className="uppercase text-sm py-2">{`${label}${
        isRequired ? " *" : ""
      }`}</label>
      {!isTextArea ? (
        <input
          className="border-2 rounded-lg p-3 flex border-gray-300"
          type={inputType}
          name={inputName}
        />
      ) : (
        <textarea
          className="border-2 rounded-lg p-3 border-gray-300"
          rows={rows}
          name={inputName}
        ></textarea>
      )}
      <span className="text-red-600 pt-2">{errorMessage}</span>
    </>
  );
};


