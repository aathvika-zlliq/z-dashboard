import React from "react";
import { motion } from "framer-motion";
import { Mail, MailCheck, CheckCircle } from "lucide-react";

interface EmailMetricsProps {
  statistics?: any; // pass dashboardStatistics from Redux
}

const EmailMetrics: React.FC<EmailMetricsProps> = ({ statistics }) => {
  // Default to 0 if statistics is undefined
  const stats = statistics || {};

  // Map API response to displayable metrics
  const metrics = [
    {
      title: "Emails Submitted",
      value: stats.submitted || 0,
      percentage: `${stats.submitted ? stats.submitted_percentage || 0 : 0}%`,
      trend: (stats.submitted_percentage || 0) >= 0 ? "up" : "down",
      color: "#3b82f6",
      icon: Mail,
    },
    {
      title: "Emails Sent",
      value: stats.sent || 0,
      percentage: `${stats.sent_percentage || 0}%`,
      trend: (stats.sent_percentage || 0) >= 0 ? "up" : "down",
      color: "#ef4444",
      icon: MailCheck,
    },
    {
      title: "Emails Delivered",
      value: stats.delivered || 0,
      percentage: `${stats.delivered_percentage || 0}%`,
      trend: (stats.delivered_percentage || 0) >= 0 ? "up" : "down",
      color: "#10b981",
      icon: CheckCircle,
    },
  ];

  return (
    <section className="relative w-full rounded-3xl border border-gray-100 dark:border-white/10 shadow-md p-8 sm:p-12 bg-white dark:bg-gray-950 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,_#e5e7eb_1px,_transparent_1px)] [background-size:40px_40px] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)]"></div>

      {/* Title */}
      <motion.div
        className="flex items-center justify-start mb-10 gap-3"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <Mail className="w-8 h-8 text-blue-500 dark:text-blue-400 drop-shadow-md" />
        </motion.div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
          Email Metrics
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="relative p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
            >
              {/* Small internal grid bg */}
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,_#f3f4f6_1px,_transparent_1px)] [background-size:30px_30px] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)] rounded-2xl"></div>

              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor: `${metric.color}15`,
                    color: metric.color,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.4,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                </div>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200">
                  {metric.title}
                </h3>
              </div>

              {/* Value */}
              <motion.h4
                className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                {metric.value}
              </motion.h4>

              {/* Trend below value */}
              <motion.p
                className={`mt-1 text-sm font-medium ${
                  metric.trend === "up"
                    ? "text-green-500"
                    : metric.trend === "down"
                      ? "text-red-500"
                      : "text-gray-500"
                }`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3, duration: 0.4 }}
              >
                {metric.percentage}
              </motion.p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default EmailMetrics;
