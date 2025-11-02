import React from "react";
import { motion } from "framer-motion";

interface StatItem {
  label: string;
  value: string | number;
  color?: string;
}

interface StatSummaryCardProps {
  title?: string;
  stats: StatItem[];
}

const StatSummaryCard: React.FC<StatSummaryCardProps> = ({ title, stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all duration-300 p-5 flex flex-col justify-between"
    >
      {/* Title */}
      {title && (
        <motion.h4
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-semibold text-gray-800 dark:text-gray-100 mb-4 text-left text-sm md:text-base"
        >
          {title}
        </motion.h4>
      )}

      {/* Stats */}
      <div
        className={`grid ${
          stats.length === 2 ? "grid-cols-2 divide-x" : "grid-cols-1"
        } divide-gray-200 dark:divide-gray-700 text-center`}
      >
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center py-3 transition-all duration-300"
          >
            {/* Dot + Label inline */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              className="flex items-center gap-2 mb-1"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color || "#9ca3af" }}
              ></span>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {item.label}
              </p>
            </motion.div>

            {/* Value */}
            <motion.h5
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 * index, duration: 0.6 }}
              className="text-md font-semibold text-gray-900 dark:text-gray-100"
            >
              {item.value}
            </motion.h5>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatSummaryCard;
