import { useState, useMemo } from "react";
import { Info, ChevronDown } from "lucide-react";
import PageMeta from "../../components/common/PageMeta";
import TimeRangeDropdown from "../../components/dashboard/TimeRangeDropdown";
import MultiSelectDropdown from "../../components/dashboard/forms/MultiSelectDropdown";
import TablePaginationFooter from "../../components/dashboard/TablePaginationFooter";
import ReusableTable from "../../components/dashboard/ReusableTable";
import { EyeIcon } from "../../icons";

// Mock data and options
const options = [
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Finance", value: "finance" },
  { label: "IT Support", value: "it" },
];

const columnOptions = [
  { key: "email", label: "Email ID", default: true },
  { key: "sending_domain", label: "Sending Domain", default: true },
  { key: "sender", label: "From Address", default: true },
  { key: "event_type", label: "Event", default: true },
  { key: "subject", label: "Subject", default: false },
  { key: "status", label: "Status", default: true },
  { key: "bounce_type", label: "Bounce Type", default: false },
  { key: "bounce_text", label: "Bounce Text", default: true },
  { key: "injected_time", label: "Injected Time", default: false },
  { key: "location", label: "Location", default: false },
  { key: "url", label: "Click URL", default: false },
  { key: "source", label: "Source", default: false },
  { key: "bounce_code", label: "Bounce Code", default: false },
  { key: "send_id", label: "Send ID", default: false },
  { key: "click_tracking_id", label: "Click Tracking ID", default: false },
];

// Tailwind utility for fade-in-up animation
const fadeInUp = {
  initial: "opacity-0 translate-y-4",
  animate: "opacity-100 translate-y-0",
  transition: "transition-all duration-700 ease-out",
};

const Export = () => {
  // ✅ State for column visibility
  const [selectedColumns, setSelectedColumns] = useState(() =>
    columnOptions.filter((c) => c.default).map((c) => c.key)
  );

  // ✅ State for Advanced Filters toggle
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // ✅ Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const totalItems = 648758;

  // ✅ Compute total pages safely (no NaN)
  const totalPages = Math.max(
    1,
    Math.ceil(
      (Number.isFinite(totalItems) ? totalItems : 0) /
        (Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 1)
    )
  );

  // ✅ Data (sample row) - Keeping data for ReusableTable
  const data = [
    {
      email: "abharayregroup9@gmail.com",
      sending_domain: "zlliq.com",
      sender: "alerts@k7computing.com",
      event_type: (
        <div className="flex justify-center">
          <span
            className="
              inline-flex justify-center items-center
              bg-blue-100 dark:bg-blue-900/40 
              text-blue-700 dark:text-blue-300 
              rounded-full px-2 py-1 text-xs sm:text-sm font-medium
              min-w-[140px] max-w-[140px] text-center
            "
          >
            Delivery Attempt
          </span>
        </div>
      ),
      subject: "Monthly Security Report",
      status: (
        <div className="flex justify-center">
          <span
            className="
              inline-flex justify-center items-center
              bg-green-100 dark:bg-green-900/40 
              text-green-700 dark:text-green-300 
              rounded-full px-2 py-1 text-xs sm:text-sm font-medium
              min-w-[100px] max-w-[100px] text-center
            "
          >
            Success
          </span>
        </div>
      ),
      bounce_type: "--",
      bounce_text: "--",
      injected_time: "10/29/2025, 9:08:24 PM",
      location: "India",
      url: "https://zlliq.com/click",
      source: "API",
      bounce_code: "250 OK",
      send_id: "SID98233",
      click_tracking_id: (
        <button className="text-gray-700 dark:text-gray-300 hover:text-[#0042E4] transition">
          <EyeIcon size={18} />
        </button>
      ),
    },
  ];

  // ✅ Column visibility logic
  const allColumns = useMemo(
    () => [
      { key: "email", label: "Email ID" },
      { key: "sending_domain", label: "Sending Domain" },
      { key: "sender", label: "From Address" },
      { key: "event_type", label: "Event" },
      { key: "subject", label: "Subject" },
      { key: "status", label: "Status" },
      { key: "bounce_type", label: "Bounce Type" },
      { key: "bounce_text", label: "Bounce Text" },
      { key: "injected_time", label: "Injected Time" },
      { key: "location", label: "Location" },
      { key: "url", label: "Click URL" },
      { key: "source", label: "Source" },
      { key: "bounce_code", label: "Bounce Code" },
      { key: "send_id", label: "Send ID" },
      { key: "click_tracking_id", label: "Click Tracking ID" },
    ],
    []
  );

  const visibleColumns = allColumns.filter((col) =>
    selectedColumns.includes(col.key)
  );

  // ✅ Column toggle handler
  const handleColumnChange = (key) => {
    setSelectedColumns((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  return (
    <>
      <PageMeta
        title="Export | TailAdmin Dashboard"
        description="Export data with customizable columns and filters"
      />

      <div className="grid grid-cols-1 gap-6 md:gap-8 my-6">
        {/* ================= FILTERS CARD (Fade-In Up) ================= */}
        {/* FIX: Set a high z-index on the Filters Card to ensure the calendar dropdown overlays the table below. */}
        <div
          className={`
            bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
            rounded-2xl shadow-sm p-6 relative z-30
            ${fadeInUp.initial} ${fadeInUp.animate} ${fadeInUp.transition}
          `}
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Filters
          </h2>

          {/* Dropdown filters (always visible) + Advanced Toggle at 6th Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* 1 */}
            <MultiSelectDropdown
              placeholder="Select Events"
              options={options}
            />
            {/* 2 */}
            <MultiSelectDropdown placeholder="Status" options={options} />
            {/* 3 */}
            <MultiSelectDropdown placeholder="Bounce Type" options={options} />

            {/* 4. TIME RANGE DROPDOWN (Calendar/Date Filter) - Now inherits z-30 from parent */}
            <TimeRangeDropdown className="w-full" onRangeChange={() => {}} />

            {/* 5 */}
            <MultiSelectDropdown placeholder="From Address" options={options} />

            {/* 6. ADVANCED FILTERS TOGGLE */}
            <div className="flex items-center">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-1 text-[#0042E4] hover:text-blue-700 font-medium text-sm transition-colors py-2 px-3 rounded-lg  w-full justify-centr"
              >
                + Advanced Filters
                {/* <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showAdvancedFilters ? "rotate-180" : "rotate-0"
                  }`}
                /> */}
              </button>
            </div>
          </div>

          {/* ================= ADVANCED FILTERS SLIDE-DOWN CONTENT ================= */}
          <div
            className={`
              grid grid-cols-1 overflow-hidden transition-all duration-500 ease-in-out
              ${
                showAdvancedFilters
                  ? "max-h-[1000px] opacity-100 pt-6"
                  : "max-h-0 opacity-0 pt-0"
              }
            `}
          >
            <div className="space-y-6">
              {/* ADVANCED CHECKBOX FILTER: Column Visibility */}
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  Table Column Visibility
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {columnOptions.map((col) => (
                    <label
                      key={col.key}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedColumns.includes(col.key)}
                        onChange={() => handleColumnChange(col.key)}
                        className="w-4 h-4 accent-[#0042E4]"
                      />
                      {col.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= INFO + ACTIONS ================= */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-5 px-2">
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <Info className="mr-2 text-[#0042E4] h-4 w-4" />
              <span className="text-[#0042E4]">
                View/search data for the last 7 days
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => {
                  // Reset columns to default
                  setSelectedColumns(
                    columnOptions.filter((c) => c.default).map((c) => c.key)
                  );
                  // Add logic to reset other dropdown filters here if needed
                }}
              >
                Reset Filters
              </button>
              <button
                type="button"
                className="bg-[#0042E4] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* ================= TABLE SECTION (Fade-In Up, delayed) ================= */}
        {/* FIX: Explicitly set a lower z-index on the table section to ensure it is layered below the Filters Card's dropdowns. */}
        <div
          className={`
            bg-white z-10 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
            rounded-2xl shadow-sm p-6 relative
            ${fadeInUp.initial} ${fadeInUp.animate} ${fadeInUp.transition} delay-150
          `}
        >
          {/* Added 'overflow-x-auto' specifically to the table wrapper for necessary horizontal scrolling */}
          <div className="overflow-x-auto">
            <ReusableTable columns={visibleColumns} data={data} />
          </div>

          {/* ✅ Safe Pagination Footer */}
          <TablePaginationFooter
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              const parsed = Number(size);
              setPageSize(Number.isFinite(parsed) && parsed > 0 ? parsed : 25);
              setPage(1);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Export;
