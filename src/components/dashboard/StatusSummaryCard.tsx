import React from "react";

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
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 p-4 md:p-5 flex flex-col justify-between">
      {/* Title */}
      {title && (
        <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 text-center text-sm md:text-base">
          {title}
        </h4>
      )}

      {/* Stats */}
      <div
        className={`grid ${
          stats.length === 2 ? "grid-cols-2 divide-x" : "grid-cols-1"
        } divide-gray-200 dark:divide-gray-700 text-center`}
      >
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-center py-3">
            {/* Dot + Label inline */}
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color || "#9ca3af" }}
              ></span>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {item.label}
              </p>
            </div>
            <h5 className="text-md font-normal text-gray-900 dark:text-gray-100">
              {item.value}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatSummaryCard;
