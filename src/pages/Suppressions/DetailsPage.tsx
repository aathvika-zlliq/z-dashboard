import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import FloatingTextField from "../../components/dashboard/forms/FloatingTextField";
import SingleDropdown from "../../components/common/SingleDropdown";
import TablePaginationFooter from "../../components/dashboard/TablePaginationFooter";
import PrimaryButton from "../../components/common/PrimaryButton";

const dropdownOptions = [
  { label: "All", value: "all" },
  { label: "Unsubscribe", value: "unsubscribe" },
  { label: "Bounce", value: "bounce" },
  { label: "Spam", value: "spam" },
  { label: "User Defined", value: "user" },
];

const SuppressionDetailsPage = ({ onBack }: { onBack: () => void }) => {
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 52;
  const totalPages = Math.ceil(totalItems / pageSize);

  const data = [
    {
      id: 1,
      recipient: "testuser1@gmail.com",
      description: "Unsubscribe",
      timestamp: "2025-10-30 08:24 PM",
    },
    {
      id: 2,
      recipient: "demo@mail.com",
      description: "Bounce",
      timestamp: "2025-10-29 10:10 AM",
    },
  ];

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(!selectAll ? data.map((d) => d.id) : []);
  };

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Suppression Details
        </h2>
        <button
          onClick={onBack}
          className="text-sm px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          ← Back
        </button>
      </div>

      {/* Search + Dropdown aligned */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <FloatingTextField
          label="Search by Email"
          value={searchEmail}
          onChange={setSearchEmail}
        />
        <SingleDropdown
          label="Select Type"
          options={dropdownOptions}
          value={selectedType}
          onChange={setSelectedType}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  className="cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200">
                Recipient
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200">
                Description
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200">
                Timestamp
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleRow(row.id)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 text-gray-800 dark:text-gray-100">
                  {row.recipient}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {row.description}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {row.timestamp}
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
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

      {/* Bulk Actions */}
      {selectedRows.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {selectedRows.length} selected
          </p>
          <PrimaryButton color="red" label="Delete Selected" />
        </div>
      )}
    </motion.div>
  );
};

export default SuppressionDetailsPage;
