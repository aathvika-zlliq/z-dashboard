import React from "react";
import { motion } from "framer-motion";

interface StatItem {
  label: string;
  value: string | number;
  percentage?: number;
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
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-5"
    >
      {/* Title */}
      {title && (
        <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-4 text-sm md:text-base">
          {title}
        </h4>
      )}

      {/* Stats */}
      <div
        className={`grid ${
          stats.length === 2 ? "grid-cols-2 divide-x" : "grid-cols-1"
        } divide-gray-200 dark:divide-gray-700`}
      >
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center py-3"
          >
            {/* Label */}
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color || "#9ca3af" }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {item.label}
              </span>
            </div>

            {/* Value */}
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {item.value}
            </span>

            {/* Percentage (only if exists) */}
            {typeof item.percentage === "number" && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.percentage}%
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatSummaryCard;
