/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { DateRangePicker, Range, createStaticRanges } from "react-date-range";
import { format, subDays, subWeeks, subMonths } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface TimeRangeDropdownProps {
  onRangeChange: (
    startDate: Date | null,
    endDate: Date | null,
    label: string
  ) => void;
  className?: string;
  align?: "left" | "right";
}

const inputRanges = [
  {
    label: "Past 24 hours",
    range: () => ({ startDate: subDays(new Date(), 1), endDate: new Date() }),
  },
  {
    label: "Last 2 days",
    range: () => ({ startDate: subDays(new Date(), 2), endDate: new Date() }),
  },
  {
    label: "Last week",
    range: () => ({ startDate: subWeeks(new Date(), 1), endDate: new Date() }),
  },
  {
    label: "Last month",
    range: () => ({ startDate: subMonths(new Date(), 1), endDate: new Date() }),
  },
];

const staticRangeDefinitions = createStaticRanges(inputRanges);

const TimeRangeDropdown: React.FC<TimeRangeDropdownProps> = ({
  onRangeChange,
  className = "",
  align = "left",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Default range (Last week)
  const defaultRange = staticRangeDefinitions
    .find((r) => r.label === "Last week")!
    .range();
  const [rangeState, setRangeState] = useState<Range[]>([
    {
      startDate: defaultRange.startDate,
      endDate: defaultRange.endDate,
      key: "selection",
    },
  ]);
  const [displayLabel, setDisplayLabel] = useState("Last week");
  const [isCleared, setIsCleared] = useState(false);

  // Update on range change
  useEffect(() => {
    const { startDate, endDate } = rangeState[0];
    if (isCleared) return;

    if (startDate && endDate) {
      const matchingStaticRange = inputRanges.find(
        (r) =>
          r.range().startDate.toDateString() === startDate.toDateString() &&
          r.range().endDate.toDateString() === endDate.toDateString()
      );
      const label = matchingStaticRange
        ? matchingStaticRange.label
        : "Custom Range";
      setDisplayLabel(label);
      onRangeChange(startDate, endDate, label);
    }
  }, [rangeState]);

  const getButtonLabel = () => {
    if (isCleared) return "Select Date Range";
    if (
      displayLabel === "Custom Range" &&
      rangeState[0].startDate &&
      rangeState[0].endDate
    ) {
      const start = format(rangeState[0].startDate, "MMM d");
      const end = format(rangeState[0].endDate, "MMM d");
      return `${start} - ${end}`;
    }
    return displayLabel;
  };

  const handleRangePickerChange = (item: any) => {
    setIsCleared(false);
    setRangeState([item.selection]);
  };

  const handleClear = () => {
    setIsCleared(true);
    setRangeState([
      { startDate: undefined, endDate: undefined, key: "selection" },
    ]);
    setDisplayLabel("Select Date Range");
    onRangeChange(null, null, "Clear");
    setIsOpen(false);
  };

  const alignmentClass =
    align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex w-60 items-center justify-between
          w-full
          rounded-lg border border-gray-200 bg-white py-[13.4px] px-4 
          text-sm font-medium text-gray-700 shadow-sm 
          transition-all duration-150 hover:bg-gray-50 
          dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700
        "
      >
        <div className="flex items-center gap-2 truncate">
          <svg
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <span
            className={`truncate ${
              isCleared ? "text-gray-400 dark:text-gray-500" : ""
            }`}
          >
            {getButtonLabel()}
          </span>
        </div>

        <svg
          className={`h-4 w-4 ml-2 transform transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`
            absolute ${alignmentClass} top-full z-50 mt-2 
            w-[90vw] max-w-[360px] sm:w-auto sm:max-w-none
            rounded-xl border border-gray-200 bg-white shadow-xl 
            dark:border-gray-700 dark:bg-gray-800
          `}
          style={{ position: "absolute" }}
        >
          <div className="max-h-[70vh] overflow-auto p-2 sm:p-4">
            <DateRangePicker
              onChange={handleRangePickerChange}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={rangeState}
              direction="vertical"
              staticRanges={staticRangeDefinitions}
              inputRanges={[]}
              rangeColors={["#4F46E5"]}
              editableDateInputs={true}
              className="dark:bg-gray-800"
            />

            {/* Placeholder when cleared */}
            {isCleared && (
              <div className="flex flex-col items-center justify-center text-gray-400 text-sm py-6">
                <p>No date selected</p>
                <p className="text-xs">(Choose a range to apply)</p>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <button
              onClick={handleClear}
              className="rounded-lg border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Clear
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-indigo-600 px-4 py-1 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Apply & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeRangeDropdown;
