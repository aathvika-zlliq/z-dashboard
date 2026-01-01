// import React from "react";
// import { motion } from "framer-motion";
// import { Copy, Trash2, Key } from "lucide-react";
// import SingleDropdown from "../../components/common/SingleDropdown"; // Adjust path if needed

// interface Option {
//   label: string;
//   value: string;
// }

// interface SMTPFormProps {
//   host: string;
//   setHost: (h: string) => void;
//   port: number | "";
//   setPort: (p: number | "") => void;
//   useAuth: boolean;
//   setUseAuth: (a: boolean) => void;
//   moreSecure: boolean;
//   setMoreSecure: (s: boolean) => void;
//   selectedDomain: string;
//   domainOptions: Option[];
//   setSelectedDomain: (d: string) => void;
//   username: string;
//   setUsername: (u: string) => void;
//   password: string;
//   isDefault: boolean;
//   setIsDefault: (d: boolean) => void;
//   copyToClipboard: (text: string) => void;
//   generateToken: () => void;
//   setShowDeleteConfirm: (show: boolean) => void;
// }

// const SMTPForm: React.FC<SMTPFormProps> = ({
//   host,
//   setHost,
//   port,
//   setPort,
//   useAuth,
//   setUseAuth,
//   moreSecure,
//   setMoreSecure,
//   selectedDomain,
//   domainOptions,
//   setSelectedDomain,
//   username,
//   setUsername,
//   password,
//   isDefault,
//   setIsDefault,
//   copyToClipboard,
//   generateToken,
//   setShowDeleteConfirm,
// }) => {
//   return (
//     <motion.div
//       key="smtp-form"
//       initial={{ opacity: 0, x: -8 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -8 }}
//       transition={{ duration: 0.22 }}
//       className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 shadow-sm"
//     >
//       <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
//         SMTP Settings
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <label className="space-y-1 text-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-gray-700 dark:text-gray-200">
//               Server name
//             </span>
//           </div>
//           <input
//             value={host}
//             onChange={(e) => setHost(e.target.value)}
//             placeholder="smtp.example.com"
//             className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring focus:ring-[#0042E4] focus:ring-opacity-50 focus:border-[#0042E4]"
//           />
//         </label>
//         <label className="space-y-1 text-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-gray-700 dark:text-gray-200">
//               Port number
//             </span>
//           </div>
//           <input
//             type="number"
//             value={port}
//             onChange={(e) =>
//               setPort(e.target.value === "" ? "" : Number(e.target.value))
//             }
//             placeholder="587"
//             className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring focus:ring-[#0042E4] focus:ring-opacity-50 focus:border-[#0042E4]"
//           />
//         </label>
//       </div>
//       <div className="flex items-center justify-between mt-4">
//         <label className="flex items-center space-x-3">
//           <input
//             type="checkbox"
//             checked={useAuth}
//             onChange={() => setUseAuth((s) => !s)}
//             className="accent-[#0042E4] scale-110"
//           />
//           <span className="text-sm text-gray-700 dark:text-gray-200">
//             Authentication required
//           </span>
//         </label>
//         <label className="flex items-center space-x-3">
//           <input
//             type="checkbox"
//             checked={moreSecure}
//             onChange={() => setMoreSecure((s) => !s)}
//             className="accent-[#0042E4] scale-110"
//           />
//           <span className="text-sm text-gray-700 dark:text-gray-200">
//             More secure credentials
//           </span>
//         </label>
//       </div>
//       <div className="mt-4">
//         <SingleDropdown
//           label="Domain sender address"
//           value={selectedDomain}
//           options={domainOptions}
//           onChange={setSelectedDomain}
//         />
//       </div>
//       {useAuth && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.2 }}
//           className="mt-4 space-y-3"
//         >
//           <label className="text-sm text-gray-700 dark:text-gray-200 block">
//             Username
//             <input
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="mt-1 w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring focus:ring-[#0042E4] focus:ring-opacity-50 focus:border-[#0042E4]"
//             />
//           </label>
//           <label className="text-sm text-gray-700 dark:text-gray-200 block relative">
//             <div className="flex items-center justify-between">
//               <span>Password / Token</span>
//               <div className="flex items-center gap-2">
//                 <button
//                   title="Copy"
//                   onClick={() => copyToClipboard(password || "")}
//                   className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                 >
//                   <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
//                 </button>
//                 <button
//                   title="Generate new token"
//                   onClick={generateToken}
//                   className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                 >
//                   <Key className="w-4 h-4 text-gray-600 dark:text-gray-300" />
//                 </button>
//                 <button
//                   title="Delete"
//                   onClick={() => setShowDeleteConfirm(true)}
//                   className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                 >
//                   <Trash2 className="w-4 h-4 text-red-500" />
//                 </button>
//               </div>
//             </div>
//             <div className="mt-1 flex items-center gap-3">
//               <input
//                 value={password}
//                 readOnly
//                 placeholder="No token set"
//                 className="flex-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-0"
//                 type="password"
//               />
//               <div className="flex flex-col items-end">
//                 <label className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     checked={isDefault}
//                     onChange={() => setIsDefault((s) => !s)}
//                     className="accent-[#0042E4] scale-110"
//                   />
//                   <span className="text-xs text-gray-600 dark:text-gray-300">
//                     Default
//                   </span>
//                 </label>
//                 <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                   {password ? "Last updated token" : "No token"}
//                 </span>
//               </div>
//             </div>
//           </label>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default SMTPForm;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Trash2, Key, Check } from "lucide-react";
import SingleDropdown from "../../components/common/SingleDropdown"; // Adjust path if needed

interface Option {
  label: string;
  value: string;
}

interface SMTPFormProps {
  host: string;
  setHost: (h: string) => void;
  port: number | "";
  setPort: (p: number | "") => void;
  useAuth: boolean;
  setUseAuth: (a: boolean) => void;
  moreSecure: boolean;
  setMoreSecure: (s: boolean) => void;
  selectedDomain: string;
  domainOptions: Option[];
  setSelectedDomain: (d: string) => void;
  username: string;
  setUsername: (u: string) => void;
  password: string;
  isDefault: boolean;
  setIsDefault: (d: boolean) => void;
  copyToClipboard: (text: string) => void;
  generateToken: () => void;
  setShowDeleteConfirm: (show: boolean) => void;
}

const SMTPForm: React.FC<SMTPFormProps> = ({
  host,
  setHost,
  port,
  setPort,
  useAuth,
  setUseAuth,
  moreSecure,
  setMoreSecure,
  selectedDomain,
  domainOptions,
  setSelectedDomain,
  username,
  setUsername,
  password,
  isDefault,
  setIsDefault,
  copyToClipboard,
  generateToken,
  setShowDeleteConfirm,
}) => {
  // State for copy feedback
  const [copiedHost, setCopiedHost] = useState(false);
  const [copiedUsername, setCopiedUsername] = useState(false);

  // Copy with tick effect helper
  const handleCopy = (text: string, type: "host" | "username") => {
    navigator.clipboard.writeText(text);
    if (type === "host") {
      setCopiedHost(true);
      setTimeout(() => setCopiedHost(false), 1500);
    } else {
      setCopiedUsername(true);
      setTimeout(() => setCopiedUsername(false), 1500);
    }
  };

  return (
    <motion.div
      key="smtp-form"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.22 }}
      className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        SMTP Settings
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Server Name with Copy */}
        <label className="space-y-1 text-sm relative">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">
              Server name
            </span>
            <button
              type="button"
              onClick={() => handleCopy(host, "host")}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {copiedHost ? (
                <Check className="w-4 h-4 text-green-600 dark:text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-500 dark:text-gray-300" />
              )}
            </button>
          </div>
          <input
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="smtp.example.com"
            className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring focus:ring-[#0042E4] focus:ring-opacity-50 focus:border-[#0042E4]"
          />
        </label>

        {/* Port number non-editable */}
        <label className="space-y-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">
              Port number
            </span>
          </div>
          <input
            type="number"
            value={port}
            readOnly
            placeholder="587"
            className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-not-allowed"
          />
        </label>
      </div>

      <div className="flex items-center justify-between mt-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={useAuth}
            onChange={() => setUseAuth((s) => !s)}
            className="accent-[#0042E4] scale-110"
          />
          <span className="text-sm text-gray-700 dark:text-gray-200">
            Authentication required
          </span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={moreSecure}
            onChange={() => setMoreSecure((s) => !s)}
            className="accent-[#0042E4] scale-110"
          />
          <span className="text-sm text-gray-700 dark:text-gray-200">
            More secure credentials
          </span>
        </label>
      </div>

      <div className="mt-4">
        <SingleDropdown
          label="Domain sender address"
          value={selectedDomain}
          options={domainOptions}
          onChange={setSelectedDomain}
        />
      </div>

      {useAuth && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4 space-y-3"
        >
          {/* Username with copy */}
          <label className="text-sm text-gray-700 dark:text-gray-200 block relative">
            <div className="flex items-center justify-between">
              <span>Username</span>
              <button
                type="button"
                onClick={() => handleCopy(username, "username")}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {copiedUsername ? (
                  <Check className="w-4 h-4 text-green-600 dark:text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                )}
              </button>
            </div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring focus:ring-[#0042E4] focus:ring-opacity-50 focus:border-[#0042E4]"
            />
          </label>

          {/* Password / Token */}
          <label className="text-sm text-gray-700 dark:text-gray-200 block relative">
            <div className="flex items-center justify-between">
              <span>Password / Token</span>
              <div className="flex items-center gap-2">
                <button
                  title="Copy"
                  onClick={() => handleCopy(password, "username")} // optional: you can make separate state if needed
                  className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  title="Generate new token"
                  onClick={generateToken}
                  className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <Key className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  title="Delete"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <input
                value={password}
                readOnly
                placeholder="No token set"
                className="flex-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-0"
                type="password"
              />
              <div className="flex flex-col items-end">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isDefault}
                    onChange={() => setIsDefault((s) => !s)}
                    className="accent-[#0042E4] scale-110"
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    Default
                  </span>
                </label>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {password ? "Last updated token" : "No token"}
                </span>
              </div>
            </div>
          </label>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SMTPForm;
