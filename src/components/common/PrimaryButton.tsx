import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const PrimaryButton: React.FC<Props> = ({ label, children, ...rest }) => {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 ${
        rest.className ?? ""
      }`}
    >
      {label ?? children}
    </button>
  );
};

export default PrimaryButton;
