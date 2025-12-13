import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  content: ReactNode; // Text or JSX to show in tooltip
  children: ReactNode; // Element that triggers the tooltip
  className?: string; // Optional extra classes
  position?: "top" | "bottom" | "left" | "right"; // Tooltip position
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className = "",
  position = "top",
}) => {
  const [visible, setVisible] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full mb-2 left-1/2 transform -translate-x-1/2";
      case "bottom":
        return "top-full mt-2 left-1/2 transform -translate-x-1/2";
      case "left":
        return "right-full mr-2 top-1/2 transform -translate-y-1/2";
      case "right":
        return "left-full ml-2 top-1/2 transform -translate-y-1/2";
      default:
        return "bottom-full mb-2 left-1/2 transform -translate-x-1/2";
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            className={`absolute z-50 px-2 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap shadow-lg ${getPositionClasses()} ${className}`}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.15 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
