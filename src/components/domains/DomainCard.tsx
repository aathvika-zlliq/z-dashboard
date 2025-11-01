import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Copy,
  Trash2,
  Edit,
  Check,
  Globe,
  Info,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import Popup from "../common/Popup";

type DomainCardProps = {
  domain: {
    id: number;
    name: string;
    status: "pending" | "verified";
    createdAt: string;
    verification: "Unverified" | "Verified";
  };
  expanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const records = [
  {
    type: "SPF",
    name: "mail",
    value: "v=spf1 include:ksplcloud.com ~all",
  },
  {
    type: "DKIM",
    name: "kspl._domainkey",
    value: "k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4...",
  },
  {
    type: "DMARC",
    name: "_dmarc",
    value: "v=DMARC1; p=none; rua=mailto:mail@ksplcloud.com",
  },
  {
    type: "MX",
    name: "mail",
    value: "ksplcloud.com",
    priority: "10",
  },
  {
    type: "A Record",
    name: "mail",
    value: "103.94.241.36",
  },
];

const DomainCard = ({
  domain,
  onDelete,
  onEdit,
  expanded,
  onToggle,
}: DomainCardProps) => {
  const [checked, setChecked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVerifyPopup, setIsVerifyPopup] = useState(false);
  const [copiedName, setCopiedName] = useState<{ [key: number]: boolean }>({});
  const [copiedValue, setCopiedValue] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleCopy = (text: string, type: "name" | "value", index: number) => {
    navigator.clipboard.writeText(text);
    if (type === "name") {
      setCopiedName({ ...copiedName, [index]: true });
      setTimeout(() => setCopiedName({ ...copiedName, [index]: false }), 1500);
    } else {
      setCopiedValue({ ...copiedValue, [index]: true });
      setTimeout(
        () => setCopiedValue({ ...copiedValue, [index]: false }),
        1500
      );
    }
  };

  const getStatusColor = (status: string) =>
    status === "verified"
      ? "text-green-600 bg-green-50 dark:bg-green-900/30"
      : "text-amber-600 bg-amber-50 dark:bg-amber-900/30";

  return (
    <>
      <motion.div
        layout
        className="w-full border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
      >
        {/* Header */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={onToggle}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30">
              <Globe className="text-green-600" size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {domain.name}
                </h3>

                {/* Tooltip */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <Info
                    size={16}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  />
                  <AnimatePresence>
                    {showTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-2 bg-gray-900 text-white text-xs rounded-md px-3 py-2 whitespace-nowrap z-50 shadow-lg"
                      >
                        All domains are used to send emails for one or more Mail
                        Agents of your choice.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Domain Meta Info */}
              <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-6 mt-1">
                <span>
                  Status:{" "}
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      domain.status
                    )}`}
                  >
                    {domain.status}
                  </span>
                </span>
                <span>Created: {domain.createdAt}</span>
                <span>
                  Verification:{" "}
                  {domain.verification === "Verified" ? (
                    <span className="text-green-600 font-medium">
                      {domain.verification}
                    </span>
                  ) : (
                    <span className="text-amber-600">
                      {domain.verification}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {domain.verification === "Unverified" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVerifyPopup(true);
                }}
                className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 dark:bg-yellow-900/40 dark:hover:bg-yellow-900/60"
              >
                Verify Domain
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-gray-500 hover:text-red-600 dark:hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown
                className="text-gray-500 dark:text-gray-400"
                size={18}
              />
            </motion.div>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden mt-4 border-t border-gray-200 dark:border-gray-700 pt-5 px-2"
            >
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-600 dark:text-gray-300">
                    <th className="pb-2 w-28">Type</th>
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Value</th>
                    <th className="pb-2 w-20">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, i) => (
                    <tr
                      key={i}
                      className="border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100"
                    >
                      <td className="py-3 font-medium w-24">{r.type}</td>

                      {/* Name */}
                      <td className="py-3 w-1/4">
                        <div className="flex items-center gap-2">
                          <span className="truncate">{r.name}</span>
                          {copiedName[i] ? (
                            <Check className="w-4 h-4 text-green-600 dark:text-green-500" />
                          ) : (
                            <Copy
                              className="w-4 h-4 cursor-pointer text-gray-400 hover:text-green-600 dark:hover:text-green-500"
                              onClick={() => handleCopy(r.name, "name", i)}
                            />
                          )}
                        </div>
                      </td>

                      {/* Value */}
                      <td className="py-3 w-2/4">
                        <div className="flex items-center gap-2">
                          <span className="truncate">{r.value}</span>
                          {copiedValue[i] ? (
                            <Check className="w-4 h-4 text-green-600 dark:text-green-500" />
                          ) : (
                            <Copy
                              className="w-4 h-4 cursor-pointer text-gray-400 hover:text-green-600 dark:hover:text-green-500"
                              onClick={() => handleCopy(r.value, "value", i)}
                            />
                          )}
                        </div>
                      </td>

                      <td className="py-3 w-20 text-center">
                        {r.priority || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Verify Section */}
              <div className="flex items-center justify-between mt-5 text-gray-700 dark:text-gray-300">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    className="accent-green-600 dark:accent-green-500"
                  />
                  DNS Records Verified
                </label>
                <button
                  disabled={!checked}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
                    checked
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  <CheckCircle2 size={16} /> Verify
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Verify Popup */}
      <Popup
        isOpen={isVerifyPopup}
        onClose={() => setIsVerifyPopup(false)}
        title="Verify DNS Records"
      >
        <div className="space-y-4 text-gray-800 dark:text-gray-100">
          {records.map((r, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
            >
              <span>{r.type}</span>
              <span
                className={`text-sm font-medium ${
                  r.type === "SPF" || r.type === "MX"
                    ? "text-green-600 dark:text-green-500"
                    : "text-amber-600 dark:text-amber-500"
                }`}
              >
                {r.type === "SPF" || r.type === "MX"
                  ? "Verified"
                  : "Not Verified"}
              </span>
            </div>
          ))}
        </div>
      </Popup>
    </>
  );
};

export default DomainCard;
