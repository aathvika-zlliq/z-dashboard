import React, { useState } from "react";
import { Clock, Send, Info, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "../../components/common/PrimaryButton";

const SendingLimitsSection: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [agent, setAgent] = useState("");
  const [limit, setLimit] = useState("");

  return (
    <>
      {/* ================= MAIN SECTION ================= */}
      <div
        role="tabpanel"
        className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Clock size={20} /> Daily Sending Limit
        </h2>

        <div className="p-8 text-center bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center mb-4">
            <Send size={48} className="text-indigo-500 dark:text-indigo-400" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Daily sending limit
          </h3>

          {/* ================= SAME LIST ================= */}
          <ul className="text-left max-w-md mx-auto space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <Info size={16} className="text-indigo-500 mt-1" />
              <span>
                You can set daily email sending limits for Mail Agents to manage
                the sending volume.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Info size={16} className="text-indigo-500 mt-1" />
              <span>
                The limit will reset at <b>12 AM (Indian Standard Time)</b>{" "}
                everyday.
              </span>
            </li>

            {/* ✅ API POINT */}
            <li className="flex items-start gap-3">
              <Info size={16} className="text-indigo-500 mt-1" />
              <span>
                <b>API:</b> After limit exhaustion, API will return error code{" "}
                <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-600 text-xs">
                  SM_151
                </code>
                .
              </span>
            </li>

            {/* ✅ SMTP POINT */}
            <li className="flex items-start gap-3">
              <Info size={16} className="text-indigo-500 mt-1" />
              <span>
                <b>SMTP:</b> Emails sent after limit exhaustion will be marked
                as <i>process failed</i>.
              </span>
            </li>
          </ul>

          {/* Button stays INSIDE content */}
          <div className="mt-6">
            <PrimaryButton
              label="Configure Limit"
              icon={<Settings size={16} />}
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* ================= POPUP ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 space-y-5"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Daily Sending Limit
              </h3>

              <div className="p-4 rounded-lg bg-sky-50 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-700 text-sm text-sky-900 dark:text-sky-200">
                You can set daily sending limit for Mail Agents. The limit
                resets at <b>12 AM IST</b> everyday.
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mail Agent
                  </label>
                  <select
                    value={agent}
                    onChange={(e) => setAgent(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="">Select Agent</option>
                    <option value="api">API</option>
                    <option value="smtp">SMTP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Sending Limit
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-md border dark:border-gray-600"
                >
                  Cancel
                </button>
                <PrimaryButton label="Save Limit" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SendingLimitsSection;
