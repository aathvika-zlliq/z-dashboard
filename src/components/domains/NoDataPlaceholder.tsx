import React from "react";
import PageMeta from "../common/PageMeta";
import PrimaryButton from "../common/PrimaryButton";

interface Props {
  metaTitle?: string;
  title: string;
  description: string;
  buttonLabel: string;
  icon: React.ElementType;
  iconColor?: string;
  iconBgColor?: string;
  onButtonClick: () => void;
}

const NoDataPlaceholder: React.FC<Props> = ({
  metaTitle,
  title,
  description,
  buttonLabel,
  icon: Icon,
  iconColor = "text-green-600",
  iconBgColor = "bg-green-100",
  onButtonClick,
}) => {
  return (
    <>
      {/* If you have PageMeta you can include: <PageMeta title={metaTitle || title} /> */}
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
        <div className={`${iconBgColor} p-6 rounded-full mb-6`}>
          <Icon className={`w-16 h-16 ${iconColor}`} />
        </div>

        <h1 className="text-3xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
          {title}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-lg mb-8 leading-relaxed">
          {description}
        </p>

        <PrimaryButton label={buttonLabel} onClick={onButtonClick} />
      </div>
    </>
  );
};

export default NoDataPlaceholder;
