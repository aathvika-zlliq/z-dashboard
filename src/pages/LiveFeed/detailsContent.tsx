import React, { useEffect, useState } from "react";
import { ClipboardCopy, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HardBounceTimeline from "./HardBounceTimeline";

interface RecipientRow {
  recipient: string;
  status: "Delivered" | "Bounced" | string;
  deliveryInfo: {
    encryption: string;
    relay: string;
    duration: number;
    recipient: string;
    status: string;
    deliveryTime: string;
  };
  timeline: {
    time: string;
    event: string;
  }[];
}

interface PopupDetailsProps {
  rowData?: any;
  loading?: boolean;
}

const PopupDetails: React.FC<PopupDetailsProps> = ({ rowData, loading }) => {
  const [openDropdown, setOpenDropdown] = useState<{
    type: "delivery" | "timeline";
    index: number;
  } | null>(null);

  const [copiedField, setCopiedField] = useState<string | null>(null);
  useEffect(() => {
    if (!loading && rowData) {
      console.log("📦 Details API data received in Popup:", rowData);
    }
  }, [rowData, loading]);
  const recipients = (rowData?.data?.results || []).map((item: any) => ({
    recipient: item.email,
    status: item.event_type || item.status,

    deliveryInfo: {
      encryption: "--",
      relay: "--",
      duration: 0,
      recipient: item.email,
      status: item.status,
      deliveryTime: item.created_at,
    },

    timeline: [
      {
        event: item.event_type,
        time: new Date(item.created_at).toLocaleString(),
      },
    ],
  }));

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getStatusIcon = (status: string) => {
    const s = status?.toLowerCase();

    if (s === "delivered" || s === "sent")
      return <span className="text-green-500 font-semibold">✔ {status}</span>;

    if (s === "bounced" || s === "failed")
      return <span className="text-red-500 font-semibold">✖ {status}</span>;

    return <span className="text-yellow-500 font-semibold">{status}</span>;
  };
  useEffect(() => {
    console.log("RAW rowData:", rowData);
    console.log("RESULTS:", rowData?.data?.results);
  }, [rowData]);

  const safeValue = (val?: any) =>
    val !== undefined && val !== null && val !== "" ? val : "--";
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500"
        >
          Loading profile details…
        </motion.div>
      </div>
    );
  }
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Left Section */}
      <div className="w-full md:w-[30%] bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
        {/* Request ID */}
        <div>
          <span className="font-semibold">Request ID:</span>
          <div className="text-sm break-all">
            {safeValue(rowData?.request_id)}
          </div>
        </div>

        {/* Message ID */}
        <div>
          <span className="font-semibold">Message ID:</span>
          <div className="text-sm break-all">
            {safeValue(rowData?.message_id)}
          </div>
        </div>

        {/* Date */}
        <div>
          <span className="font-semibold">Date:</span>
          <div className="text-sm">{safeValue(rowData?.date)}</div>
        </div>

        {/* Subject */}
        <div>
          <span className="font-semibold">Subject:</span>
          <div className="text-sm break-all">{safeValue(rowData?.subject)}</div>
        </div>

        {/* From */}
        <div>
          <span className="font-semibold">From:</span>
          <div className="text-sm break-all whitespace-pre-wrap">
            {safeValue(rowData?.sender)}
          </div>
        </div>

        {/* ✅ HARDCODED LAST 3 FIELDS */}

        <div>
          <span className="font-semibold">Request triggered IP:</span>
          <div className="text-sm">192.168.0.1</div>
        </div>

        <div>
          <span className="font-semibold">Mail sent via:</span>
          <div className="text-sm">SMTP</div>
        </div>

        <div>
          <span className="font-semibold">Mail Agent name:</span>
          <div className="text-sm break-all whitespace-pre-wrap">
            NodeMailer
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[70%] overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Recipient
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Delivery Info
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {recipients.map((r, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 relative"
              >
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100 break-all">
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-300 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                      To
                    </span>
                    {r.recipient}
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
                  {getStatusIcon(r.status)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100 relative">
                  {/* View Delivery Info */}
                  <button
                    className="px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50 dark:hover:bg-blue-900"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown?.index === idx &&
                          openDropdown.type === "delivery"
                          ? null
                          : { type: "delivery", index: idx },
                      )
                    }
                  >
                    View Delivery Info
                  </button>

                  <AnimatePresence>
                    {openDropdown?.type === "delivery" &&
                      openDropdown.index === idx && (
                        <motion.div
                          initial={{ opacity: 0, x: 10, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-full bg-white dark:bg-gray-800 border border-blue-500 shadow-lg p-4 mt-1 rounded w-80 z-10 overflow-auto max-h-72 break-words"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                              Delivery Info
                            </span>
                            <button
                              onClick={() => setOpenDropdown(null)}
                              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                            <div className="font-semibold text-gray-600 dark:text-gray-400">
                              Encryption:
                            </div>
                            <div>{r.deliveryInfo.encryption}</div>
                            <div className="font-semibold text-gray-600 dark:text-gray-400">
                              Email relay:
                            </div>
                            <div>{r.deliveryInfo.relay}</div>
                            <div className="font-semibold text-gray-600 dark:text-gray-400">
                              Duration:
                            </div>
                            <div>{r.deliveryInfo.duration}s</div>
                            <div className="font-semibold text-gray-600 dark:text-gray-400">
                              Recipient:
                            </div>
                            <div>{r.deliveryInfo.recipient}</div>
                            <div className="font-semibold text-gray-600 dark:text-gray-400">
                              Status:
                            </div>
                            <div>{r.deliveryInfo.status}</div>
                            <div className="font-semibold text-gray-600 dark:text-gray-400">
                              Delivery time:
                            </div>
                            <div>
                              {new Date(
                                r.deliveryInfo.deliveryTime,
                              ).toLocaleString()}
                            </div>
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </td>

                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100 relative">
                  {/* View Timeline */}
                  <button
                    className="px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50 dark:hover:bg-blue-900"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown?.index === idx &&
                          openDropdown.type === "timeline"
                          ? null
                          : { type: "timeline", index: idx },
                      )
                    }
                  >
                    View
                  </button>

                  <AnimatePresence>
                    {openDropdown?.type === "timeline" &&
                      openDropdown.index === idx && (
                        <motion.div
                          initial={{ opacity: 0, x: 10, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-full bg-white dark:bg-gray-800 border border-blue-500 shadow-lg p-4 mt-1 rounded w-64 z-10 overflow-auto max-h-72"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                              Timeline
                            </span>

                            <button
                              onClick={() => setOpenDropdown(null)}
                              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <HardBounceTimeline />
                          {/* <div className="flex flex-col relative ml-4">
                            {r.timeline.map((t, i) => {
                              const isLast = i === r.timeline.length - 1;
                              return (
                                <div
                                  key={i}
                                  className="flex items-start relative"
                                >
                                  <div className="relative flex flex-col items-center">
                                   
                                    <div
                                      className={`w-3 h-3 rounded-full mt-1 z-10 ${
                                        isLast ? "bg-green-500" : "bg-gray-400"
                                      }`}
                                    ></div>

                                 
                                    {!isLast && (
                                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-[45px] bg-gray-300"></div>
                                    )}
                                  </div>

                               
                                  <div className="ml-4 text-sm">
                                    <div className="font-semibold">
                                      {t.event}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 pb-2">
                                      {t.time}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div> */}
                        </motion.div>
                      )}
                  </AnimatePresence>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopupDetails;
