import { motion } from "framer-motion";
import { Eye, Info, Download, Plus, ArrowUp } from "lucide-react";
import Toggle from "../common/Toggle";

export interface SuppressionItem {
  id: number;
  name: string;
  count: number;
  status: "Active" | "Inactive";
  actions: string[];
}

interface SuppressionTableProps {
  title?: string;
  data: SuppressionItem[];
  onEyeClick?: (item: SuppressionItem) => void;
  onPlusClick?: (item: SuppressionItem) => void;
  onDownloadClick?: (item: SuppressionItem) => void; // ✅ Added this
}

// Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

const SuppressionTable: React.FC<SuppressionTableProps> = ({
  title,
  data,
  onEyeClick,
  onPlusClick,
  onDownloadClick, // ✅ Added here
}) => {
  return (
    <div className="p-6">
      {title && (
        <motion.h2
          className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h2>
      )}

      <motion.div
        className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600 dark:text-gray-300">
                Name
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 dark:text-gray-300">
                Number of IDs
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 dark:text-gray-300">
                Status
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <motion.tbody variants={containerVariants}>
            {data.map((item) => (
              <motion.tr
                key={item.id}
                variants={rowVariants}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {/* Name */}
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  {item.name}
                </td>

                {/* Count */}
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {item.count}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <motion.div
                    className="flex items-center gap-3 text-gray-500 dark:text-gray-400"
                    variants={containerVariants}
                  >
                    {/* 👁 Eye */}
                    {item.actions.includes("eye") && (
                      <motion.div variants={iconVariants}>
                        <Eye
                          size={18}
                          className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                          onClick={() => onEyeClick?.(item)}
                        />
                      </motion.div>
                    )}

                    {/* ➕ Plus */}
                    {item.actions.includes("plus") && (
                      <motion.div variants={iconVariants}>
                        <Plus
                          size={18}
                          className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                          onClick={() => onPlusClick?.(item)}
                        />
                      </motion.div>
                    )}

                    {/* ↑ ArrowUp */}
                    {item.actions.includes("arrowup") && (
                      <motion.div variants={iconVariants}>
                        <ArrowUp
                          size={18}
                          className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                        />
                      </motion.div>
                    )}

                    {/* ⬇️ Download */}
                    {item.actions.includes("download") && (
                      <motion.div variants={iconVariants}>
                        <Download
                          size={18}
                          className={`cursor-pointer hover:text-green-600 dark:hover:text-green-400 ${
                            item.id === 3 ? "rotate-180 transform" : ""
                          }`}
                          onClick={() => onDownloadClick?.(item)} // ✅ Added event
                        />
                      </motion.div>
                    )}

                    {/* Toggle */}
                    {item.actions.includes("toggle") && (
                      <motion.div
                        className="flex items-center gap-2"
                        variants={iconVariants}
                      >
                        <Toggle checked={true} disabled={true} />
                        <Info
                          size={16}
                          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default SuppressionTable;
