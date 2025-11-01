import { useState } from "react";

interface FloatingTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const FloatingTextarea: React.FC<FloatingTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.trim() !== "";

  return (
    <div className="relative w-full">
      {/* Floating Label */}
      <label
        className={`absolute left-3 px-1 transition-all duration-200 ease-in-out pointer-events-none
          ${
            isFocused || hasValue
              ? "top-[-6px] text-xs text-[#0042E4] bg-white dark:bg-gray-900"
              : "top-4 text-sm text-gray-500 dark:text-gray-400 bg-transparent"
          }`}
      >
        {label}
      </label>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={3}
        placeholder={isFocused ? placeholder : ""}
        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 pt-6 pb-2 text-sm resize-none 
                   bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                   focus:ring-2 focus:ring-[#0042E4] outline-none transition-all"
      />
    </div>
  );
};

export default FloatingTextarea;
