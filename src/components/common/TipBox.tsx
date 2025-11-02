import React from "react";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

interface TipBoxProps {
  message: string;
  linkText?: string;
  linkUrl?: string;
}

const TipBox: React.FC<TipBoxProps> = ({
  message,
  linkText = "Learn more",
  linkUrl = "#",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start gap-3 p-4 mb-3 rounded-lg border-2 border-blue-300/80 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-500"
    >
      {/* Icon */}
      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />

      {/* Content */}
      <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
        <strong className="font-semibold text-blue-700 dark:text-blue-400">
          Tip:
        </strong>{" "}
        {message}{" "}
        {linkUrl && (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            {linkText}
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default TipBox;
