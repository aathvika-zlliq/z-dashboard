import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Mail, Plus, Trash2, CheckCircle } from "lucide-react";

type ReportType = "daily" | "weekly" | "monthly";

const SummaryReportSection: React.FC = () => {
  const [toEmail, setToEmail] = useState("");
  const [ccEmails, setCcEmails] = useState<string[]>([""]);
  const [reportType, setReportType] = useState<ReportType>("daily");
  const [saved, setSaved] = useState(false);

  /* ---------------- CC EMAIL HANDLERS ---------------- */
  const addCcEmail = () => {
    if (ccEmails.length < 3) setCcEmails([...ccEmails, ""]);
  };

  const removeCcEmail = (index: number) => {
    setCcEmails(ccEmails.filter((_, i) => i !== index));
  };

  const updateCcEmail = (index: number, value: string) => {
    const updated = [...ccEmails];
    updated[index] = value;
    setCcEmails(updated);
  };

  /* ---------------- ACTIONS ---------------- */
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);

    // API payload example
    console.log({
      toEmail,
      ccEmails: ccEmails.filter(Boolean),
      reportType,
    });
  };

  const handleCancel = () => {
    setToEmail("");
    setCcEmails([""]);
    setReportType("daily");
  };

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
        <BarChart3 size={20} />
        Summary Report to Email
      </h2>

      <p className="text-gray-600 dark:text-gray-300">
        Configure automated summary reports and email delivery schedule.
      </p>

      {/* ---------------- TO EMAIL ---------------- */}
      <div className="space-y-2">
        <label className="block font-medium text-gray-700 dark:text-gray-200">
          To Email <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <Mail
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="email"
            required
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            placeholder="admin@domain.com"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* ---------------- CC EMAILS ---------------- */}
      <div className="space-y-3">
        <label className="block font-medium text-gray-700 dark:text-gray-200">
          CC Email Addresses (max 3)
        </label>

        {ccEmails.map((email, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3 items-center"
          >
            <div className="relative flex-grow">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => updateCcEmail(index, e.target.value)}
                placeholder="cc@domain.com"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {ccEmails.length > 1 && (
              <button
                onClick={() => removeCcEmail(index)}
                className="text-red-500 hover:text-red-700"
                title="Remove CC email"
              >
                <Trash2 size={16} />
              </button>
            )}
          </motion.div>
        ))}

        {ccEmails.length < 3 && (
          <button
            onClick={addCcEmail}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm"
          >
            <Plus size={16} />
            Add CC email
          </button>
        )}
      </div>

      {/* ---------------- REPORT FREQUENCY ---------------- */}
      <div className="space-y-3">
        <label className="block font-medium text-gray-700 dark:text-gray-200">
          Report Frequency
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          {[
            { key: "daily", label: "Everyday Report" },
            { key: "weekly", label: "Weekly Report" },
            { key: "monthly", label: "Monthly Report" },
          ].map((item) => (
            <motion.button
              key={item.key}
              whileTap={{ scale: 0.97 }}
              onClick={() => setReportType(item.key as ReportType)}
              className={`px-4 py-2 rounded-lg border font-medium transition
                ${
                  reportType === item.key
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              `}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ---------------- ACTIONS ---------------- */}
      <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
        <button
          onClick={handleCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Cancel
        </button>

        <div className="flex items-center gap-4">
          {saved && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm"
            >
              <CheckCircle size={16} />
              Saved successfully
            </motion.span>
          )}

          <button
            disabled={!toEmail}
            onClick={handleSave}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryReportSection;
