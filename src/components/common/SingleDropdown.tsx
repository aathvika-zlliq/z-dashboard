import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface FloatingDropdownProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

const SingleDropdown: React.FC<FloatingDropdownProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== "";

  return (
    <div className="relative w-full">
      {/* Floating Label */}
      <label
        className={`absolute left-3 px-1 transition-all duration-200 ease-in-out pointer-events-none
          ${
            isFocused || hasValue
              ? "top-[-6px] text-xs text-[#0042E4] bg-white dark:bg-gray-900"
              : "top-3.5 text-sm text-gray-500 dark:text-gray-400 bg-transparent"
          }`}
      >
        {label}
      </label>

      {/* Select Box */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 pt-5 pb-2 text-sm 
                   bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                   focus:ring-2 focus:ring-[#0042E4] outline-none appearance-none"
      >
        <option value="" disabled hidden></option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SingleDropdown;
