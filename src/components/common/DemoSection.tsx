import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/button/Button";

interface DemoSectionProps {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  onButtonClick?: () => void;
  reverse?: boolean;
}

const DemoSection: React.FC<DemoSectionProps> = ({
  title,
  description,
  buttonText,
  image,
  onButtonClick,
  reverse = false,
}) => {
  return (
    <section className="w-full flex items-center justify-between rounded-2xl md:px-10 lg:px-16 py-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div
        className={`flex flex-col-reverse md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        } items-center justify-between w-full gap-4 md:gap-10`}
      >
        {/* ---------- Image Section (Hidden on Mobile) ---------- */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`hidden md:block flex-shrink-0 w-40 h-40 lg:w-48 lg:h-48 ${
            reverse ? "md:ml-auto" : "md:mr-auto"
          }`}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain object-left"
          />
        </motion.div>

        {/* ---------- Content Section ---------- */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col md:flex-row items-center md:items-center justify-between text-center md:text-left gap-4 md:pr-4"
        >
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-md mt-1">
              {description}
            </p>
          </div>

          <Button
            onClick={onButtonClick}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition-all duration-200 whitespace-nowrap mt-2 md:mt-0"
          >
            {buttonText}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
