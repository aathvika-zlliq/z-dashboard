import React from "react";

interface StatusItem {
  label: string;
  value: string | number;
}

interface EmailStatusCardProps {
  title: string;
  statuses: StatusItem[];
}

const EmailStatusCard: React.FC<EmailStatusCardProps> = ({
  title,
  statuses,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-2 md:p-8 dark:border-gray-800 dark:bg-white/[0.03]  flex flex-col items-center justify-center">
      {/* Title */}
      <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-6 text-lg text-center">
        {title}
      </h4>

      {/* Status List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-800 text-center w-full">
        {statuses.map((item, index) => (
          <div key={index} className="py-2 px-4">
            <p className="text-base font-medium text-gray-500 dark:text-gray-400">
              {item.label}
            </p>
            <h5 className="mt-2 text-3xl font-bold text-gray-800 dark:text-white/90">
              {item.value}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailStatusCard;
