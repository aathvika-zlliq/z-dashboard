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
import PrimaryButton from "../common/PrimaryButton"; // Assuming you have a PrimaryButton component

// --- New Interfaces for Sender Addresses ---
interface SenderAddress {
  address: string;
  mailAgents: string[];
}
// ------------------------------------------

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

// --- Sample Sender Addresses Data ---
const senderAddresses: SenderAddress[] = [
  { address: "info@zlliq.com", mailAgents: ["mail_agent_1"] },
  { address: "newsletters@zlliq.com", mailAgents: ["mail_agent_1"] },
];
// ------------------------------------

const DomainCard = ({
  domain,
  onDelete,
  onEdit,
  expanded,
  onToggle,
}: DomainCardProps) => {
  const [isSenderPopupOpen, setIsSenderPopupOpen] = useState(false);
  const [senderLocalPart, setSenderLocalPart] = useState("");
  const [assignMailAgent, setAssignMailAgent] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVerifyPopup, setIsVerifyPopup] = useState(false);
  const [copiedName, setCopiedName] = useState<{ [key: number]: boolean }>({});
  const [copiedValue, setCopiedValue] = useState<{ [key: number]: boolean }>(
    {}
  );
  // NEW STATE: To manage the active tab in the expanded view
  const [activeTab, setActiveTab] = useState<"dns" | "senders">("dns");

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
                  Status: {/* Removed extra 's' */}
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

        {/* Expanded Content with Tabs */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden mt-4 border-t border-gray-200 dark:border-gray-700 pt-5"
            >
              {/* --- TAB NAVIGATION --- */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-4 px-2">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab("dns")}
                    className={`
                      ${
                        activeTab === "dns"
                          ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500"
                      }
                      whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition duration-150 ease-in-out
                    `}
                  >
                    DNS Records
                  </button>
                  <button
                    onClick={() => setActiveTab("senders")}
                    className={`
                      ${
                        activeTab === "senders"
                          ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500"
                      }
                      whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition duration-150 ease-in-out
                    `}
                  >
                    Sender Address Restriction
                  </button>
                </nav>
              </div>

              {/* --- TAB CONTENT: DNS Records --- */}
              {activeTab === "dns" && (
                <div className="px-2">
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
                                  onClick={() =>
                                    handleCopy(r.value, "value", i)
                                  }
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
                </div>
              )}

              {/* --- TAB CONTENT: Sender Address Restriction --- */}
              {activeTab === "senders" && (
                <div className="space-y-4 px-2">
                  <p className="text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-2">
                    <Info
                      size={16}
                      className="mt-0.5 flex-shrink-0 text-blue-500"
                    />
                    <span>
                      <span className="font-semibold">
                        Only the allowed sender addresses can send emails from
                        this domain.
                      </span>
                    </span>
                  </p>

                  {/* Sender Addresses Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Sender Address
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Mail Agent(s)
                          </th>
                          <th className="px-3 py-2"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {senderAddresses.map((sender, index) => (
                          <tr
                            key={index}
                            className="text-gray-800 dark:text-gray-100"
                          >
                            <td className="px-3 py-3 whitespace-nowrap text-sm font-medium">
                              {sender.address}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                              {sender.mailAgents.join(", ")}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200"
                                onClick={() => setIsSenderPopupOpen(true)}
                              >
                                <Edit size={16} className="inline-block" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Action button for adding a new address */}
                  <div className="flex justify-end">
                    {/* Note: I'm using a placeholder PrimaryButton here. Ensure you import and define this component. */}
                    <PrimaryButton
                      label="Add Sender Address"
                      onClick={() => setIsSenderPopupOpen(true)}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Verify Popup (remains unchanged) */}
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
      {/* Add/Edit Sender Popup */}
      <Popup
        isOpen={isSenderPopupOpen}
        onClose={() => setIsSenderPopupOpen(false)}
        title="Add sender address"
      >
        <div className="space-y-4 text-gray-800 dark:text-gray-100">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add sender address to send emails using a verified email address
          </p>

          {/* Sender Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Sender Address
            </label>
            <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
              <input
                type="text"
                value={senderLocalPart}
                onChange={(e) => setSenderLocalPart(e.target.value)}
                placeholder="info"
                className="flex-1 px-3 border-none py-2 bg-white dark:bg-gray-800 outline-none text-sm"
              />
              <span className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300">
                @zlliq.com
              </span>
            </div>
          </div>

          {/* Mail Agent Checkbox */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={assignMailAgent}
              onChange={() => setAssignMailAgent(!assignMailAgent)}
              className="accent-indigo-600 dark:accent-indigo-500"
            />
            Apply all the mail Agents that are associated to the domain?
          </label>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsSenderPopupOpen(false)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <PrimaryButton
              label="Send Verification"
              onClick={() => {
                console.log({
                  email: `${senderLocalPart}@zlliq.com`,
                  assignMailAgent,
                });
                setIsSenderPopupOpen(false);
              }}
            />
          </div>
        </div>
      </Popup>
    </>
  );
};

export default DomainCard;
