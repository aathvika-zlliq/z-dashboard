import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  placeholder: string;
  options: Option[];
  onChange?: (selected: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  placeholder,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    setSelectedValues((prev) => {
      const updated = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      onChange?.(updated);
      return updated;
    });
  };

  const handleClear = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedValues([]);
    onChange?.([]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOptions = options.filter((opt) =>
    selectedValues.includes(opt.value)
  );

  return (
    <div className="relative w-full " ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={`relative w-full min-h-[48px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-left shadow-sm transition-all duration-200 dark:bg-gray-900 dark:border-gray-700 ${
          isOpen ? "ring-2 ring-indigo-500" : ""
        }`}
      >
        {/* Floating Placeholder */}
        <label
          className={`absolute left-3 text-gray-500 transition-all duration-200 pointer-events-none bg-white dark:bg-gray-900 px-1 ${
            isOpen || selectedValues.length > 0
              ? "-top-4 text-[13px] font-medium text-indigo-600"
              : "top-1/2 -translate-y-1/2 text-[15px] text-gray-400"
          }`}
        >
          {placeholder}
        </label>

        {/* Selected chips */}
        <div
          className={`flex flex-wrap gap-1 pr-8 ${
            selectedValues.length > 0 ? "pt-2" : ""
          }`}
        >
          {selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className="flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span className="truncate">{opt.label}</span>
                <X
                  size={12}
                  className="cursor-pointer hover:text-indigo-900 dark:hover:text-indigo-400 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(opt.value);
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm truncate">
              {placeholder}
            </span>
          )}
        </div>

        {/* Chevron */}
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />

        {/* Clear icon */}
        {selectedValues.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
          >
            <X size={14} />
          </button>
        )}
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 z-50"
          >
            <div className="max-h-56 overflow-auto p-2 space-y-1">
              {options.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(opt.value)}
                    onChange={() => handleSelect(opt.value)}
                    className="accent-indigo-600"
                  />
                  <span className="text-sm text-gray-800 dark:text-gray-200 truncate">
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-2 flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-medium text-white hover:bg-indigo-700"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiSelectDropdown;
