// import React from "react";
// import { motion } from "framer-motion";
// import { Copy, Key } from "lucide-react";

// interface APIFormProps {
//   apiDomain: string;
//   mailAgentAlias: string;
//   senderAddress: string;
//   sendMailToken: string;
//   isDefault: boolean;
//   copyToClipboard: (text: string) => void;
//   generateToken: () => void;
// }

// const APIForm: React.FC<APIFormProps> = ({
//   apiDomain,
//   mailAgentAlias,
//   senderAddress,
//   sendMailToken,
//   isDefault,
//   copyToClipboard,
//   generateToken,
// }) => {
//   const tokenDisplay = isDefault ? "DEFAULT_TOKEN" : sendMailToken;

//   const DetailItem: React.FC<{
//     label: string;
//     value: string;
//     copyText?: string;
//   }> = ({ label, value, copyText }) => (
//     <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
//       <span className="text-sm font-medium text-gray-600 dark:text-gray-300 w-1/3">
//         {label}
//       </span>
//       <div className="flex items-center gap-2 w-2/3">
//         <span className="font-mono text-sm text-gray-800 dark:text-gray-100 truncate flex-1">
//           {value}
//         </span>
//         {copyText && (
//           <button
//             title={`Copy ${label}`}
//             onClick={() => copyToClipboard(copyText)}
//             className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition flex-shrink-0"
//           >
//             <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
//           </button>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <motion.div
//       key="api-form"
//       initial={{ opacity: 0, x: 8 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: 8 }}
//       transition={{ duration: 0.22 }}
//       className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 shadow-sm"
//     >
//       <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
//         Rest API Configuration
//       </h3>

//       <div className="space-y-4">
//         <DetailItem label="Host" value={apiDomain} copyText={apiDomain} />
//         <DetailItem
//           label="Domain / Sender Address"
//           value={senderAddress}
//           copyText={senderAddress}
//         />
//         <DetailItem
//           label="Mail Agent Alias"
//           value={mailAgentAlias}
//           copyText={mailAgentAlias}
//         />

//         {/* Send Mail Token Section */}
//         <div className="py-2 border-t border-gray-200 dark:border-gray-700 pt-4">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
//               Send Mail Token
//             </span>
//             <div className="flex items-center gap-2">
//               <button
//                 className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
//                 onClick={() => copyToClipboard(tokenDisplay)}
//               >
//                 <Copy className="w-4 h-4 inline-block mr-1" /> Copy
//               </button>
//               <button
//                 className="px-3 py-1 rounded-md bg-[#0042E4] text-white text-sm hover:bg-blue-700 transition"
//                 onClick={generateToken}
//               >
//                 <Key className="w-4 h-4 inline-block mr-1" /> Generate New
//               </button>
//             </div>
//           </div>
//           <div className="font-mono text-sm px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
//             {tokenDisplay}
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
//         <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100">
//           Resources
//         </h4>
//         <div className="flex gap-4">
//           <a
//             href="/rest-api-documentation"
//             target="_blank"
//             className="text-sm text-[#0042E4] hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 font-medium transition"
//           >
//             Rest API: Documentation
//           </a>
//           <a
//             href="/sdk-download/test.zip"
//             className="text-sm text-[#0042E4] hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 font-medium transition"
//           >
//             SDK Download: test.zip
//           </a>
//         </div>
//         <div className="mt-4">
//           <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
//             Need help troubleshooting issues?
//           </p>
//           <button className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
//             Troubleshoot & Fix Common Errors
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default APIForm;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Key } from "lucide-react";
import Popup from "../common/Popup"; // Ensure you have this component

interface APIFormProps {
  apiDomain: string;
  mailAgentAlias: string;
  senderAddress: string;
  sendMailToken: string;
  isDefault: boolean;
  copyToClipboard: (text: string) => void;
  generateToken: () => void;
}

const APIForm: React.FC<APIFormProps> = ({
  apiDomain,
  mailAgentAlias,
  senderAddress,
  sendMailToken,
  isDefault,
  copyToClipboard,
  generateToken,
}) => {
  const [showGeneratePopup, setShowGeneratePopup] = useState(false);

  const tokenDisplay = isDefault ? "DEFAULT_TOKEN" : sendMailToken;

  const DetailItem: React.FC<{
    label: string;
    value: string;
    copyText?: string;
  }> = ({ label, value, copyText }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300 w-1/3">
        {label}
      </span>
      <div className="flex items-center gap-2 w-2/3">
        <span className="font-mono text-sm text-gray-800 dark:text-gray-100 truncate flex-1">
          {value}
        </span>
        {copyText && (
          <button
            title={`Copy ${label}`}
            onClick={() => copyToClipboard(copyText)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition flex-shrink-0"
          >
            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        key="api-form"
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 8 }}
        transition={{ duration: 0.22 }}
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Rest API Configuration
        </h3>

        <div className="space-y-4">
          <DetailItem label="Host" value={apiDomain} copyText={apiDomain} />
          <DetailItem
            label="Domain / Sender Address"
            value={senderAddress}
            copyText={senderAddress}
          />
          <DetailItem
            label="Mail Agent Alias"
            value={mailAgentAlias}
            copyText={mailAgentAlias}
          />

          {/* Send Mail Token Section */}
          <div className="py-2 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Send Mail Token
              </span>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  onClick={() => copyToClipboard(tokenDisplay)}
                >
                  <Copy className="w-4 h-4 inline-block mr-1" /> Copy
                </button>
                <button
                  className="px-3 py-1 rounded-md bg-[#0042E4] text-white text-sm hover:bg-blue-700 transition"
                  onClick={() => setShowGeneratePopup(true)}
                >
                  <Key className="w-4 h-4 inline-block mr-1" /> Generate New
                </button>
              </div>
            </div>
            <div className="font-mono text-sm px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
              {tokenDisplay}
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
          <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100">
            Resources
          </h4>
          <div className="flex gap-4">
            <a
              href="/rest-api-documentation"
              target="_blank"
              className="text-sm text-[#0042E4] hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 font-medium transition"
            >
              Rest API: Documentation
            </a>
            <a
              href="/sdk-download/test.zip"
              className="text-sm text-[#0042E4] hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 font-medium transition"
            >
              SDK Download: test.zip
            </a>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              Need help troubleshooting issues?
            </p>
            <button className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              Troubleshoot & Fix Common Errors
            </button>
          </div>
        </div>
      </motion.div>

      {/* Generate New Token Popup */}
      <Popup
        isOpen={showGeneratePopup}
        onClose={() => setShowGeneratePopup(false)}
        title="Generate New API Token"
      >
        <div className="space-y-4 text-gray-800 dark:text-gray-100">
          {/* Warning Card */}
          <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-md space-y-2">
            <h4 className="font-semibold text-red-700 dark:text-red-300">
              Warning
            </h4>
            <p className="text-sm text-red-800 dark:text-red-200">
              Generating a new API token will immediately revoke your existing
              token. Any applications or integrations using the old token may
              stop working until updated with the new token.
            </p>
          </div>

          {/* Info Card */}
          <div className="p-4 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-700 rounded-md space-y-1">
            <h4 className="font-semibold text-sky-700 dark:text-sky-300">
              Account Support Contact
            </h4>
            <p className="text-sm text-sky-800 dark:text-sky-200">
              Email:{" "}
              <a href="mailto:support@zlliq.com" className="underline">
                support@zlliq.com
              </a>
            </p>
            <p className="text-sm text-sky-800 dark:text-sky-200">
              Phone: +91 9876543210
            </p>
          </div>

          {/* Close Button */}
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setShowGeneratePopup(false)}
              className="px-4 py-2 rounded-md bg-[#0042E4] text-white hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default APIForm;
