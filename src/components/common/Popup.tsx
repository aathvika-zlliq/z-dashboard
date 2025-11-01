// Popup.tsx
import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  widthClass?: string;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  widthClass = "max-w-lg",
  children,
}) => {
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`w-full ${widthClass} mx-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl transition-all duration-200`}
            initial={{ y: 20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div>
                {title && (
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {subtitle}
                  </p>
                )}
              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[75vh] overflow-auto p-6 text-gray-800 dark:text-gray-100">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
