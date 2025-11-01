import React from "react";

interface ToggleProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  disabled = false,
  onChange,
}) => {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onChange}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
        ${
          checked
            ? "bg-green-500 dark:bg-green-600"
            : "bg-gray-300 dark:bg-gray-700"
        }
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
      `}
      aria-pressed={checked}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-200 shadow ring-0 transition duration-200 ease-in-out
          ${checked ? "translate-x-4" : "translate-x-0"}
        `}
      />
    </button>
  );
};

export default Toggle;
