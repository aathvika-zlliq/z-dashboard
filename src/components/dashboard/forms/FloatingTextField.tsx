import React, { useState, useEffect, useRef } from "react";

interface FloatingTextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const FloatingTextField: React.FC<FloatingTextFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValue = value && value.trim() !== "";

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div
      className={`relative w-full  ${className}`}
      onClick={() => !disabled && inputRef.current?.focus()}
    >
      {/* Input field */}
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className={`peer w-full rounded-lg border border-gray-200 bg-white px-3 pt-5 pb-2 text-sm text-gray-900 shadow-sm outline-none transition-all duration-200 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 ${
          disabled
            ? "opacity-60 cursor-not-allowed"
            : "focus:ring-2 focus:ring-indigo-500"
        } min-h-[48px]`}
      />

      {/* Floating label */}
      <label
        className={`absolute left-3 text-gray-500 transition-all duration-200 bg-white dark:bg-gray-900 px-1 pointer-events-none ${
          isFocused || hasValue
            ? "-top-3 text-[13px] font-medium text-indigo-600"
            : "top-1/2 -translate-y-1/2 text-[15px] text-gray-400"
        }`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};

export default FloatingTextField;
