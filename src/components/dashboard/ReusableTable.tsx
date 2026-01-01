import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { EyeIcon, CopyIcon, CheckIcon } from "lucide-react";

/* ================= TYPES ================= */

interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  minWidth?: string;
  render?: (row: TableRow, rowIndex: number) => React.ReactNode;
}

interface TableRow {
  [key: string]: React.ReactNode;
  deliveryInfo?: Record<string, string>;
}

interface ReusableTableProps {
  columns: TableColumn[];
  data: TableRow[];
}

/* ================= ANIMATION VARIANTS ================= */

const tableBodyVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const codeVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25 },
  },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

/* ================= COMPONENT ================= */

const ReusableTable: React.FC<ReusableTableProps> = ({ columns, data }) => {
  const [visibleCodeIndex, setVisibleCodeIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [dropdown, setDropdown] = useState<{
    index: number;
    coords: { top: number; left: number };
    data: Record<string, string>;
  } | null>(null);

  const generateCode = () =>
    Math.random().toString(36).substring(2, 18).toUpperCase();

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1200);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".delivery-dropdown")) {
        setDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="rounded-2xl bg-white p-6 mt-6 border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700">
      <div className="overflow-x-auto relative">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-700">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200 text-left"
                  style={{ minWidth: col.minWidth || "140px" }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <motion.tbody
            variants={tableBodyVariants}
            initial="hidden"
            animate="visible"
          >
            {data.map((row, idx) => (
              <motion.tr
                key={idx}
                variants={rowVariants}
                whileHover={{
                  y: -3,
                  scale: 1.01,
                  boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                }}
                className="group border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                {columns.map((col, cIdx) => {
                  if (col.key === "tracking") {
                    const isVisible = visibleCodeIndex === idx;
                    const code = generateCode();

                    return (
                      <td key={cIdx} className="px-4 py-3 text-center">
                        {!isVisible ? (
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setVisibleCodeIndex(idx)}
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <EyeIcon size={18} />
                          </motion.button>
                        ) : (
                          <motion.div
                            variants={codeVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex items-center justify-center gap-2"
                          >
                            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono">
                              {code}
                            </code>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => handleCopy(code, idx)}
                            >
                              {copiedIndex === idx ? (
                                <CheckIcon
                                  size={14}
                                  className="text-green-500"
                                />
                              ) : (
                                <CopyIcon size={14} className="text-gray-500" />
                              )}
                            </motion.button>
                          </motion.div>
                        )}
                      </td>
                    );
                  }

                  if (col.key === "delivery") {
                    return (
                      <td key={cIdx} className="px-4 py-3 text-sm">
                        {row.deliveryInfo && (
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={(e) => {
                              const rect =
                                e.currentTarget.getBoundingClientRect();
                              setDropdown({
                                index: idx,
                                coords: {
                                  top: rect.bottom + window.scrollY,
                                  left: rect.left + window.scrollX,
                                },
                                data: row.deliveryInfo!,
                              });
                            }}
                          >
                            View delivery info
                          </button>
                        )}
                      </td>
                    );
                  }

                  return (
                    <td key={cIdx} className="px-4 py-3 text-sm">
                      {col.render ? col.render(row, idx) : row[col.key]}
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      {/* ================= DELIVERY DROPDOWN ================= */}
      <AnimatePresence>
        {dropdown &&
          ReactDOM.createPortal(
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="delivery-dropdown absolute z-50 bg-white dark:bg-gray-900 border rounded-lg shadow-xl p-4 w-80"
              style={{
                top: dropdown.coords.top,
                left: dropdown.coords.left,
              }}
            >
              {Object.entries(dropdown.data).map(([key, val]) => (
                <div
                  key={key}
                  className="flex justify-between items-center mb-1"
                >
                  <span className="font-medium text-sm capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  <span className="text-sm truncate max-w-[140px]">{val}</span>
                </div>
              ))}
            </motion.div>,
            document.body
          )}
      </AnimatePresence>
    </div>
  );
};

export default ReusableTable;
