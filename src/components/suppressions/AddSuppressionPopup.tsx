import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SingleDropdown from "../common/SingleDropdown";
import FloatingTextarea from "../common/FloatingTextarea";

interface AddSuppressionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { type: string; recipients: string }) => void;
}

const suppressionOptions = [
  { label: "Global Suppression", value: "global" },
  { label: "Auto Unsubscribe", value: "auto" },
  { label: "Manual Deactivate", value: "manual" },
];

const AddSuppressionPopup: React.FC<AddSuppressionPopupProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [type, setType] = useState("");
  const [recipients, setRecipients] = useState("");

  const handleSave = () => {
    if (type && recipients.trim()) {
      onSave({ type, recipients });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-5">
              Add Suppression Recipient
            </h2>

            <div className="space-y-4">
              <FloatingTextarea
                label="Recipient Emails"
                value={recipients}
                onChange={setRecipients}
                placeholder="Enter one email per line"
              />
              <SingleDropdown
                label="Suppression Type"
                value={type}
                onChange={setType}
                options={suppressionOptions}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[#0042E4] text-white hover:bg-[#0033b5] transition"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddSuppressionPopup;
