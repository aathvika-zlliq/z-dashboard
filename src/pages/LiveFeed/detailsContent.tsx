import React, { useState } from "react";
import { ClipboardCopy, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
}

const PopupDetails: React.FC<PopupDetailsProps> = ({ rowData }) => {
  const [openDropdown, setOpenDropdown] = useState<{
    type: "delivery" | "timeline";
    index: number;
  } | null>(null);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const recipients: RecipientRow[] = [
    {
      recipient: "info@zlliq.com",
      status: "Delivered",
      deliveryInfo: {
        encryption: "TLS",
        relay: "aspmx.l.google.com/142.250.4.27",
        duration: 3605,
        recipient: "info@zlliq.com",
        status: "SUCCESS",
        deliveryTime: "2025-12-13T01:43:56+05:30",
      },
      timeline: [
        { time: "13 Dec 2025, 1.43.52 AM", event: "Queued" },
        { time: "13 Dec 2025, 1.43.56 AM", event: "Delivered" },
      ],
    },
    {
      recipient: "someoneelse@gmail.com",
      status: "Bounced",
      deliveryInfo: {
        encryption: "TLS",
        relay: "mx.example.com/192.168.0.1",
        duration: 0,
        recipient: "someoneelse@gmail.com",
        status: "FAILED",
        deliveryTime: "2025-12-13T02:05:00+05:30",
      },
      timeline: [
        { time: "13 Dec 2025, 2.00.00 AM", event: "Queued" },
        { time: "13 Dec 2025, 2.05.00 AM", event: "Bounced" },
      ],
    },
  ];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getStatusIcon = (status: string) => {
    if (status === "Delivered")
      return <span className="text-green-500 font-semibold">✔ Delivered</span>;
    if (status === "Bounced")
      return <span className="text-red-500 font-semibold">✖ Bounced</span>;
    return <span>{status}</span>;
  };

  if (!rowData) {
    rowData = {
      requestId:
        "2518b.596d98603c8d4657.m1.14500f30-d797-11f0-bfd5-525400c92439.19b1432cfa3",
      messageId:
        "<2518b.596d98603c8d4657.m1.14500f30-d797-11f0-bfd5-525400c92439.19b1432cfa3@bounce-zem.zlliq.com>",
      date: "13 Dec 2025, 1.43.52 AM",
      subject: "Hi Naveen, Welcome to ZlliQ Technologies",
      from: "ZlliQ Technologies Pvt Ltd <newsletters@zlliq.com>",
      ip: "152.57.83.215",
      via: "API",
      agent: "Bounce address\nnewsletters@bounce-zem.zlliq.com",
    };
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Left Section */}
      <div className="w-full md:w-[30%] bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
        {/* Request ID */}
        <div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Request ID:</span>
            <button
              onClick={() => copyToClipboard(rowData.requestId, "requestId")}
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1"
              title="Copy"
            >
              {copiedField === "requestId" ? "✔" : <ClipboardCopy size={16} />}
            </button>
          </div>
          <div className="text-sm break-all truncate" title={rowData.requestId}>
            {rowData.requestId}
          </div>
        </div>

        {/* Message ID */}
        <div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Message ID:</span>
            <button
              onClick={() => copyToClipboard(rowData.messageId, "messageId")}
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1"
              title="Copy"
            >
              {copiedField === "messageId" ? "✔" : <ClipboardCopy size={16} />}
            </button>
          </div>
          <div className="text-sm break-all truncate" title={rowData.messageId}>
            {rowData.messageId}
          </div>
        </div>

        {/* Other fields */}
        <div>
          <span className="font-semibold">Date:</span>
          <div className="text-sm">{rowData.date}</div>
        </div>
        <div>
          <span className="font-semibold">Subject:</span>
          <div className="text-sm break-all">{rowData.subject}</div>
        </div>
        <div>
          <span className="font-semibold">From:</span>
          <div className="text-sm break-all whitespace-pre-wrap">
            {rowData.from}
          </div>
        </div>
        <div>
          <span className="font-semibold">Request triggered IP:</span>
          <div className="text-sm">{rowData.ip}</div>
        </div>
        <div>
          <span className="font-semibold">Mail sent via:</span>
          <div className="text-sm">{rowData.via}</div>
        </div>
        <div>
          <span className="font-semibold">Mail Agent name:</span>
          <div className="text-sm break-all whitespace-pre-wrap">
            {rowData.agent}
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
                          : { type: "delivery", index: idx }
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
                                r.deliveryInfo.deliveryTime
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
                          : { type: "timeline", index: idx }
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

                          <div className="flex flex-col relative ml-4">
                            {r.timeline.map((t, i) => {
                              const isLast = i === r.timeline.length - 1;
                              return (
                                <div
                                  key={i}
                                  className="flex items-start relative"
                                >
                                  <div className="relative flex flex-col items-center">
                                    {/* Dot */}
                                    <div
                                      className={`w-3 h-3 rounded-full mt-1 z-10 ${
                                        isLast ? "bg-green-500" : "bg-gray-400"
                                      }`}
                                    ></div>

                                    {/* Line */}
                                    {!isLast && (
                                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-[45px] bg-gray-300"></div>
                                    )}
                                  </div>

                                  {/* Text */}
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
                          </div>
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
