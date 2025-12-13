import { useState } from "react";
import { subWeeks } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import PageMeta from "../../components/common/PageMeta";
import TimeRangeDropdown from "../../components/dashboard/TimeRangeDropdown";
import MultiSelectDropdown from "../../components/dashboard/forms/MultiSelectDropdown";
import FloatingTextField from "../../components/dashboard/forms/FloatingTextField";
import PrimaryButton from "../../components/common/PrimaryButton";
import ReusableTable from "../../components/dashboard/ReusableTable";
import TablePaginationFooter from "../../components/dashboard/TablePaginationFooter";
import PopupDetails from "./detailsContent";
import Popup from "../../components/common/Popup";
import { Info, ChevronRight } from "lucide-react";

/* ================= ANIMATION VARIANTS (UNCHANGED) ================= */

const pageVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const tableContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const popupContentVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ================= DATA & COMPONENT ================= */

const options = [
  { label: "Marketing dfgh ghjkjhgf g", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Finance", value: "finance" },
  { label: "IT Support", value: "it" },
];

const LiveFeed = () => {
  const [currentRange, setCurrentRange] = useState({
    startDate: subWeeks(new Date(), 1),
    endDate: new Date(),
    label: "Last week",
  });

  const [recipientDomain, setRecipientDomain] = useState("");
  const [clickTrackingId, setClickTrackingId] = useState("");
  const [email, setEmail] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const totalItems = 648758;
  const totalPages = Math.ceil(totalItems / pageSize);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleRangeChange = (
    startDate: Date | null,
    endDate: Date | null,
    label: string
  ) => {
    if (!startDate || !endDate) return;
    setCurrentRange({ startDate, endDate, label });
  };

  const handleViewDetails = (row: any) => {
    setSelectedRow(row);
    setIsPopupOpen(true);
  };

  /* ================= TABLE COLUMNS (FIX APPLIED HERE) ================= */

  const columns = [
    {
      key: "fromTo",
      label: "From → To",
      minWidth: "320px",
      render: (row: any) => (
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-start mt-1 pl-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="h-5 border-l-2 border-dotted border-gray-300 dark:border-gray-600 ml-[3px]" />
            <div className="flex items-center ml-[3px] relative -top-[4px]">
              <span className="w-4 border-t-2 border-dotted border-gray-300 dark:border-gray-600" />
              <ChevronRight
                size={14}
                className="text-gray-400 dark:text-gray-500 relative -left-[2px]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {row.from}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {row.to}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "date",
      label: "Requested Date / Time",
      // --- FIX: Use render to explicitly apply color to the text ---
      render: (row: any) => (
        <span className="text-gray-800 dark:text-gray-200">{row.date}</span>
      ),
      // -----------------------------------------------------------
    },
    {
      key: "opens",
      label: "Opens",
      align: "center",
      render: () => (
        <span className="text-gray-400 dark:text-gray-500">--</span>
      ),
    },
    {
      key: "clicks",
      label: "Clicks",
      align: "center",
      render: () => (
        <span className="text-gray-400 dark:text-gray-500">--</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row: any) => (
        <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      minWidth: "120px",
      render: (row: any) => (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleViewDetails(row)}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            View Details
          </button>
        </div>
      ),
    },
  ];

  const data = Array.from({ length: 10 }).map(() => ({
    from: "alerts@k7computing.com",
    to: "abharayregroup9@gmail.com",
    date: "10/29/2025, 9:08:24 PM",
    status: "Success",
    requestId: "REQ-123456",
    messageId: "MSG-654321",
    subject: "Test Email",
    ip: "192.168.0.1",
    via: "SMTP",
    agent: "NodeMailer",
  }));

  return (
    <>
      <PageMeta title="Live Feed | Dashboard" />

      <AnimatePresence mode="wait">
        <motion.div
          key="livefeed"
          className="grid grid-cols-1 gap-6 md:gap-8 my-6"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* ================= FILTERS ================= */}
          <motion.div
            variants={sectionVariants}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Filters
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <TimeRangeDropdown onRangeChange={handleRangeChange} />
              <MultiSelectDropdown
                placeholder="Select Departments"
                options={options}
              />
              <FloatingTextField
                label="Recipient Domain"
                value={recipientDomain}
                onChange={setRecipientDomain}
              />
              <MultiSelectDropdown
                placeholder="Select Events"
                options={options}
              />
              <MultiSelectDropdown placeholder="Status" options={options} />
              <MultiSelectDropdown
                placeholder="Bounce Type"
                options={options}
              />
              <MultiSelectDropdown placeholder="Type" options={options} />
              <FloatingTextField
                label="Search by Click Tracking Id"
                value={clickTrackingId}
                onChange={setClickTrackingId}
              />
              <FloatingTextField
                label="Enter Email"
                value={email}
                onChange={setEmail}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 px-2">
              <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                <Info className="mr-2 h-4 w-4" />
                Emails sent in last 60 days are shown below.
              </div>

              <div className="flex gap-2">
                <button
                  className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition"
                  onClick={() => {
                    setRecipientDomain("");
                    setClickTrackingId("");
                    setEmail("");
                  }}
                >
                  Reset
                </button>
                <PrimaryButton label="Search" />
              </div>
            </div>
          </motion.div>

          {/* ================= TABLE WITH STAGGER ================= */}
          <motion.div
            variants={tableContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <ReusableTable
              columns={columns}
              data={data}
              // Row class still handles background and general row color
              rowClassName="group bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200"
              rowWrapper={(row, children) => (
                <motion.tr
                  variants={tableRowVariants}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 10px 28px rgba(0,0,0,0.15)",
                  }}
                  className="transition-shadow"
                >
                  {children}
                </motion.tr>
              )}
            />
          </motion.div>

          {/* ================= PAGINATION ================= */}
          <motion.div
            variants={sectionVariants}
            className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-3 border border-gray-200 dark:border-gray-700"
          >
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
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ================= POPUP ================= */}
      <AnimatePresence>
        {selectedRow && isPopupOpen && (
          <Popup
            title="Email details"
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            widthClass="w-full max-w-6xl"
          >
            <motion.div
              variants={popupContentVariants}
              initial="hidden"
              animate="visible"
            >
              <PopupDetails
                onClose={() => setIsPopupOpen(false)}
                rowData={selectedRow}
              />
            </motion.div>
          </Popup>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveFeed;
