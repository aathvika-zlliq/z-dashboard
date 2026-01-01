import React from "react";
import { motion } from "framer-motion";
import { Mail, CreditCard } from "lucide-react";

interface InvoiceItem {
  id: string;
  purchaseDate: string;
  expirationDate: string;
  period: string;
  totalEmails: number;
  status: "Paid" | "Pending" | "Expired";
}

const invoiceData: InvoiceItem[] = [
  {
    id: "INV-101",
    purchaseDate: "01 Jan 2026",
    expirationDate: "31 Jan 2026",
    period: "Jan / 2026",
    totalEmails: 12430,
    status: "Paid",
  },
  {
    id: "INV-102",
    purchaseDate: "01 Dec 2025",
    expirationDate: "31 Dec 2025",
    period: "Dec / 2025",
    totalEmails: 11005,
    status: "Paid",
  },
  {
    id: "INV-103",
    purchaseDate: "01 Nov 2025",
    expirationDate: "30 Nov 2025",
    period: "Nov / 2025",
    totalEmails: 9800,
    status: "Expired",
  },
];

const getStatusClass = (status: InvoiceItem["status"]) => {
  switch (status) {
    case "Paid":
      return "text-green-600 bg-green-50 dark:bg-green-900/30";
    case "Pending":
      return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30";
    case "Expired":
      return "text-red-600 bg-red-50 dark:bg-red-900/30";
    default:
      return "";
  }
};

const BillingHistorySection: React.FC = () => {
  const totalEmailsSent = invoiceData.reduce(
    (sum, item) => sum + item.totalEmails,
    0
  );

  return (
    <motion.div
      role="tabpanel"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6"
    >
      {/* ---------------- HEADER ---------------- */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <CreditCard size={20} />
        Billing & Usage Overview
      </h2>

      <p className="text-gray-600 dark:text-gray-300">
        Track your email usage, billing periods, and invoice status.
      </p>

      {/* ---------------- TOTAL EMAILS SENT ---------------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-4 p-5 rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="p-3 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
          <Mail size={22} />
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Emails Sent
          </p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {totalEmailsSent.toLocaleString()}
          </p>
        </div>
      </motion.div>

      {/* ---------------- BILLING TABLE ---------------- */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Billing & Invoice Details
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700 text-left text-sm text-gray-600 dark:text-gray-400">
                <th className="py-3">Purchase Date</th>
                <th className="py-3">Expiration Date</th>
                <th className="py-3">Month / Year</th>
                <th className="py-3">Total Emails Sent</th>
                <th className="py-3">Invoice Status</th>
              </tr>
            </thead>

            <tbody>
              {invoiceData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-none dark:border-gray-700 text-sm"
                >
                  <td className="py-4 text-gray-700 dark:text-gray-300">
                    {item.purchaseDate}
                  </td>
                  <td className="py-4 text-gray-700 dark:text-gray-300">
                    {item.expirationDate}
                  </td>
                  <td className="py-4 text-gray-900 dark:text-gray-100 font-medium">
                    {item.period}
                  </td>
                  <td className="py-4 text-gray-700 dark:text-gray-300">
                    {item.totalEmails.toLocaleString()}
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------- FOOTER ---------------- */}
      <div className="pt-4 border-t dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
        Showing last {invoiceData.length} billing cycles
      </div>
    </motion.div>
  );
};

export default BillingHistorySection;
