import React, { useState } from "react";
import { MapPinPlus, X, Info, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageMeta from "../../components/common/PageMeta";
import PrimaryButton from "../../components/common/PrimaryButton";

const DedicatedIP: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [accepted, setAccepted] = useState(false);

  return (
    <>
      <PageMeta title="Dedicated IP" description="" />

      {/* ================= Page ================= */}
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
        <div className="bg-indigo-100 dark:bg-indigo-900/40 p-6 rounded-full mb-6">
          <MapPinPlus className="w-20 h-20 text-indigo-600 dark:text-indigo-400" />
        </div>

        <h1 className="text-3xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Dedicated IP Management
        </h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-lg mb-8">
          Manage your dedicated IP addresses here. Easily allocate, monitor, and
          configure IPs for improved deliverability and control.
        </p>

        <PrimaryButton
          label="Request Dedicated IP"
          className="px-6 py-3 text-lg"
          onClick={() => setOpen(true)}
        />
      </div>

      {/* ================= Modal ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Request Dedicated IP
                </h2>
                <button onClick={() => setOpen(false)}>
                  <X className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                </button>
              </div>

              {/* Info Box */}
              <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-300 font-medium">
                  <Info size={16} />
                  Points to note
                </div>

                <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>
                    You must send an average of <b>10,000 emails per day</b> to
                    be eligible for a dedicated IP address.
                  </li>
                  <li>
                    View the{" "}
                    <a
                      href="#"
                      className="text-indigo-600 dark:text-indigo-400 underline"
                    >
                      pricing of dedicated IP
                    </a>{" "}
                    here.
                  </li>
                  <li>
                    Once payment is completed, <b>no refund</b> will be
                    processed if the IP is removed/deactivated during the year.
                  </li>
                </ul>
              </div>

              {/* IP Counter */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Number of dedicated IPs needed
                </span>

                <div className="flex items-center gap-3">
                  {/* Minus */}
                  <button
                    onClick={() => setCount(Math.max(0, count - 1))}
                    disabled={count === 0}
                    className="
                      w-8 h-8 flex items-center justify-center
                      rounded-lg border border-gray-300 dark:border-gray-700
                      text-gray-700 dark:text-gray-200
                      hover:bg-gray-100 dark:hover:bg-gray-800
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    <Minus size={14} />
                  </button>

                  {/* Value */}
                  <span className="w-6 text-center font-semibold text-gray-900 dark:text-gray-100">
                    {count}
                  </span>

                  {/* Plus */}
                  <button
                    onClick={() => setCount(count + 1)}
                    className="
                      w-8 h-8 flex items-center justify-center
                      rounded-lg border border-gray-300 dark:border-gray-700
                      text-gray-700 dark:text-gray-200
                      hover:bg-gray-100 dark:hover:bg-gray-800
                    "
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 mb-6">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-1"
                />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  I understand and agree to the terms and conditions related to
                  dedicated IP usage and billing.
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>

                <PrimaryButton
                  label="Request"
                  disabled={!accepted || count === 0}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DedicatedIP;
