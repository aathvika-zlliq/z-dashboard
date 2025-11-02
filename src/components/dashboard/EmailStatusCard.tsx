import React from "react";
import { motion } from "framer-motion";
import { Mail, Clock, Ban, CalendarClock } from "lucide-react";

interface StatusItem {
  label: string;
  value: number;
  color?: string;
  max?: number;
  icon?: React.ReactNode; // ✅ individual icon support
}

interface EmailStatusCardProps {
  title?: string;
  statuses: StatusItem[];
}

const EmailStatusCard: React.FC<EmailStatusCardProps> = ({
  title = "Email Status",
  statuses,
}) => {
  return (
    <section className="relative w-full rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-md p-6 sm:p-8 bg-white dark:bg-gray-950">
      {/* Background grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,_#e5e7eb_1px,_transparent_1px)] [background-size:40px_40px] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)]"></div>

      {/* Title + icon */}
      <motion.div
        className="flex items-center justify-start mb-8 gap-3"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Mail className="w-6 h-6 text-blue-500 dark:text-blue-400 drop-shadow-md" />
        </motion.div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
          {title}
        </h2>
      </motion.div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        {statuses.map((item, index) => {
          const max = item.max || 300;
          const percentage = Math.min((item.value / max) * 100, 100);
          const radius = 26;
          const circumference = 2 * Math.PI * radius;
          const offset = circumference - (percentage / 100) * circumference;

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative flex items-center gap-5 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-sm overflow-hidden"
            >
              {/* Faint background icon inside card */}
              <motion.div
                className="absolute right-3 bottom-2 text-gray-900/10 dark:text-white/5"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              >
                {/* Show provided icon or fallback */}
                {item.icon || (
                  <Mail className="w-16 h-16 sm:w-20 sm:h-20 opacity-10" />
                )}
              </motion.div>

              {/* Circle Progress */}
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg
                  className="w-full h-full rotate-[-90deg]"
                  viewBox="0 0 80 80"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    stroke={item.color || "#3b82f6"}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {Math.round(percentage)}%
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col items-start z-10">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {item.label}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {item.value}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default EmailStatusCard;
