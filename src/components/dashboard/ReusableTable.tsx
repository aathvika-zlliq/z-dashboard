import React, { useState } from "react";
import { EyeIcon, CopyIcon, CheckIcon } from "lucide-react";

interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  minWidth?: string;
}

interface TableRow {
  [key: string]: React.ReactNode;
}

interface ReusableTableProps {
  columns: TableColumn[];
  data: TableRow[];
}

const ReusableTable: React.FC<ReusableTableProps> = ({ columns, data }) => {
  const [visibleCodeIndex, setVisibleCodeIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateCode = () =>
    Math.random().toString(36).substring(2, 18).toUpperCase();

  const handleEyeClick = (index: number) => {
    setVisibleCodeIndex((prev) => (prev === index ? null : index));
  };

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="rounded-2xl bg-white p-6 mt-6 border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700 transition-colors">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          {/* Header */}
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-700">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-2 font-semibold text-gray-700 dark:text-gray-200 ${
                    col.align === "center"
                      ? "text-center"
                      : col.align === "right"
                      ? "text-right"
                      : "text-left"
                  }`}
                  style={{ minWidth: col.minWidth || "140px" }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                {columns.map((col, cIdx) => {
                  if (col.key === "tracking") {
                    const isVisible = visibleCodeIndex === idx;
                    const code = generateCode();

                    return (
                      <td
                        key={cIdx}
                        className="px-4 py-3 text-center text-sm text-gray-800 dark:text-gray-100"
                      >
                        {!isVisible ? (
                          <button
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            onClick={() => handleEyeClick(idx)}
                          >
                            <EyeIcon size={18} />
                          </button>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono truncate max-w-[120px]">
                              {code}
                            </code>
                            <button
                              onClick={() => handleCopy(code, idx)}
                              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            >
                              {copiedIndex === idx ? (
                                <CheckIcon
                                  size={14}
                                  className="text-green-500 transition-transform duration-150"
                                />
                              ) : (
                                <CopyIcon size={14} className="text-gray-500" />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    );
                  }

                  return (
                    <td
                      key={cIdx}
                      className={`px-4 py-3 text-sm text-gray-700 dark:text-gray-200 ${
                        col.align === "center"
                          ? "text-center"
                          : col.align === "right"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {row[col.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTable;
