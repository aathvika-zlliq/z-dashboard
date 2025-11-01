import { useState, useEffect, useRef } from "react";
import { subWeeks } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import TimeRangeDropdown from "../../components/dashboard/TimeRangeDropdown";
import PageMeta from "../../components/common/PageMeta";
import MultiSelectDropdown from "../../components/dashboard/forms/MultiSelectDropdown";
import FloatingTextField from "../../components/dashboard/forms/FloatingTextField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { Info } from "lucide-react";
import ReusableTable from "../../components/dashboard/ReusableTable";
import { EyeIcon } from "../../icons";
import TablePaginationFooter from "../../components/dashboard/TablePaginationFooter";

interface FeedItem {
  id: number;
  message: string;
  timestamp: string;
  text: string;
  buttonLabel: string;
  onButtonClick?: () => void;
}
const options = [
  { label: "Marketing dfgh ghjkjhgf g", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Finance", value: "finance" },
  { label: "IT Support", value: "it" },
];

const LiveFeed = () => {
  // ==============================
  // 📅 Date Range State
  // ==============================
  const [currentRange, setCurrentRange] = useState({
    startDate: subWeeks(new Date(), 1),
    endDate: new Date(),
    label: "Last week",
  });
  console.log(currentRange);
  const handleRangeChange = (
    startDate: Date | null,
    endDate: Date | null,
    label: string
  ) => {
    if (!startDate || !endDate) {
      console.log("Range cleared");
      return;
    }

    console.log("Selected Range:", startDate, endDate, label);
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const totalItems = 648758;
  const totalPages = Math.ceil(totalItems / pageSize);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const feedEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem: FeedItem = {
        id: Date.now(),
        message: `New system update at ${new Date().toLocaleTimeString()}`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setFeed((prev) => [...prev.slice(-19), newItem]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const columns = [
    { key: "from", label: "From Address" },
    { key: "to", label: "Recipient Email" },
    { key: "date", label: "Requested Date/Time" },
    { key: "tracking", label: "X-Zlliq-Click-Tracking-Id", align: "center" },
    { key: "event", label: "Event Type" },
    { key: "status", label: "Status", align: "center" },
    { key: "bounceType", label: "Bounce Type", align: "center" },
    { key: "bounceText", label: "Bounce Text", align: "center" },
  ];

  const data = [
    {
      from: "alerts@k7computing.com",
      to: "abharayregroup9@gmail.com",
      date: "10/29/2025, 9:08:24 PM",
      tracking: (
        <div className="flex items-center justify-center gap-2">
          <button className="text-black hover:text-[#0042E4]">
            <EyeIcon size={18} />
          </button>
        </div>
      ),
      event: (
        <span className="inline-flex items-center justify-center bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
          Delivery Attempt
        </span>
      ),
      status: (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Success
        </span>
      ),
      bounceType: "--",
      bounceText: "--",
    },
    {
      from: "alerts@k7computing.com",
      to: "abharayregroup9@gmail.com",
      date: "10/29/2025, 9:08:24 PM",
      tracking: (
        <div className="flex items-center justify-center gap-2">
          <button className="text-black hover:text-[#0042E4]">
            <EyeIcon size={18} />
          </button>
        </div>
      ),
      event: (
        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
          Delivery Attempt
        </span>
      ),
      status: (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Success
        </span>
      ),
      bounceType: "--",
      bounceText: "--",
    },
    {
      from: "alerts@k7computing.com",
      to: "abharayregroup9@gmail.com",
      date: "10/29/2025, 9:08:24 PM",
      tracking: (
        <div className="flex items-center justify-center gap-2">
          <button className="text-black hover:text-[#0042E4]">
            <EyeIcon size={18} />
          </button>
        </div>
      ),
      event: (
        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
          Delivery Attempt
        </span>
      ),
      status: (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Success
        </span>
      ),
      bounceType: "--",
      bounceText: "--",
    },
    {
      from: "alerts@k7computing.com",
      to: "abharayregroup9@gmail.com",
      date: "10/29/2025, 9:08:24 PM",
      tracking: (
        <div className="flex items-center justify-center gap-2">
          <button className="text-black hover:text-[#0042E4]">
            <EyeIcon size={18} />
          </button>
        </div>
      ),
      event: (
        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
          Delivery Attempt
        </span>
      ),
      status: (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Success
        </span>
      ),
      bounceType: "--",
      bounceText: "--",
    },
    {
      from: "alerts@k7computing.com",
      to: "abharayregroup9@gmail.com",
      date: "10/29/2025, 9:08:24 PM",
      tracking: (
        <div className="flex items-center justify-center gap-2">
          <button className="text-black hover:text-[#0042E4]">
            <EyeIcon size={18} />
          </button>
        </div>
      ),
      event: (
        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
          Delivery Attempt
        </span>
      ),
      status: (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Success
        </span>
      ),
      bounceType: "--",
      bounceText: "--",
    },
    {
      from: "alerts@k7computing.com",
      to: "abharayregroup9@gmail.com",
      date: "10/29/2025, 9:08:24 PM",
      tracking: (
        <div className="flex items-center justify-center gap-2">
          <button className="text-black hover:text-[#0042E4]">
            <EyeIcon size={18} />
          </button>
        </div>
      ),
      event: (
        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
          Delivery Attempt
        </span>
      ),
      status: (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Success
        </span>
      ),
      bounceType: "--",
      bounceText: "--",
    },
    {
      from: "alerts@k7computing.com",
      to: "abharayregroup9@gmail.com",
      date: "10/29/2025, 9:08:24 PM",
      tracking: (
        <div className="flex items-center justify-center gap-2">
          <button className="text-black hover:text-[#0042E4]">
            <EyeIcon size={18} />
          </button>
        </div>
      ),
      event: (
        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
          Delivery Attempt
        </span>
      ),
      status: (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Success
        </span>
      ),
      bounceType: "--",
      bounceText: "--",
    },
    {
      from: "alerts@k7computing.com",
      to: "abharayregroup9@gmail.com",
      date: "10/29/2025, 9:08:24 PM",
      tracking: (
        <div className="flex items-center justify-center gap-2">
          <button className="text-black hover:text-[#0042E4]">
            <EyeIcon size={18} />
          </button>
        </div>
      ),
      event: (
        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
          Delivery Attempt
        </span>
      ),
      status: (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Success
        </span>
      ),
      bounceType: "--",
      bounceText: "--",
    },
    {
      from: "alerts@k7computing.com",
      to: "abharayregroup9@gmail.com",
      date: "10/29/2025, 9:08:24 PM",
      tracking: (
        <div className="flex items-center justify-center gap-2">
          <button className="text-black hover:text-[#0042E4]">
            <EyeIcon size={18} />
          </button>
        </div>
      ),
      event: (
        <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
          Delivery Attempt
        </span>
      ),
      status: (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Success
        </span>
      ),
      bounceType: "--",
      bounceText: "--",
    },
  ];
  return (
    <>
      <PageMeta
        title="Live Feed | TailAdmin Dashboard"
        description="Live feed page with filters, chart placeholder, and activity stream"
      />

      <div className="grid grid-cols-1 gap-6 md:gap-8 my-6">
        {/* ================= CARD 1 - FILTER PANEL ================= */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Filters
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* 1️⃣ Real Filter */}
            <TimeRangeDropdown
              className="w-full"
              onRangeChange={handleRangeChange}
            />
            <MultiSelectDropdown
              placeholder="Select Departments"
              options={options}
            />
            <FloatingTextField
              label="Recipient Domain"
              value={""}
              onChange={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
            />

            <MultiSelectDropdown
              placeholder="Select Events"
              options={options}
            />
            <MultiSelectDropdown placeholder="Status" options={options} />
            <MultiSelectDropdown placeholder="Bounce Type" options={options} />
            <MultiSelectDropdown placeholder="Type" options={options} />

            <FloatingTextField
              label="Search by Click Tracking Id"
              value={""}
              onChange={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
            />
            <FloatingTextField
              label="Enter Email"
              value={""}
              onChange={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mt-4 px-2">
            {/* Left Side: Info icon + text */}
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <Info className="mr-2 text-[#0042E4] h-4 w-4" />
              <span className="text-[#0042E4]">
                View/search data for the last 7 days
              </span>
            </div>

            {/* Right Side: Buttons */}
            <div className="flex items-center gap-2">
              {/* Reset Button */}
              <button
                type="button"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                onClick={() => {
                  // Add your reset logic here
                  console.log("Reset clicked");
                }}
              >
                Reset
              </button>

              {/* Search Button */}
              <PrimaryButton label="Search" />
            </div>
          </div>
        </div>

        {/* ================= CARD 2 - PLACEHOLDER CHART ================= */}

        <ReusableTable columns={columns} data={data} />

        {/* ================= CARD 3 - LIVE FEED ================= */}

        <div className="overflow-y-auto rounded-xl bg-gray-50 dark:bg-gray-800 p-3 space-y-2">
          <TablePaginationFooter
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LiveFeed;
