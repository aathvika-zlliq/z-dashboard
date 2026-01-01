import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "../../components/common/PrimaryButton";
import Popup from "../../components/common/Popup";

// Import the new components
import SMTPForm from "../../components/API/SMTPForm";
import APIForm from "../../components/API/APIForm";
import APISidebar from "../../components/API/APISidebar";

/**
 * APISettings component
 * - Top tabs: SMTP | API
 * - Manages state and passes props to sub-components
 */

type LangKey = "curl" | "node" | "csharp" | "python" | "php" | "java";

const domainOptions = [
  { label: "no-reply@example.com", value: "no-reply@example.com" },
  { label: "support@example.com", value: "support@example.com" },
  { label: "sales@example.com", value: "sales@example.com" },
];

const sampleSnippets: Record<
  LangKey,
  (opts: {
    host?: string;
    port?: number;
    auth?: boolean;
    token?: string;
  }) => string
> = {
  // --- SMTP Snippets (Slightly modified to use generic token for better reusability) ---
  curl: ({
    host = "smtp.example.com",
    port = 587,
    auth = true,
    token = "REDACTED",
  }) => `curl --request POST \\
  --url smtp://${host}:${port} \\
  --header 'Content-Type: application/json' \\
  --data '{
    "from": "no-reply@example.com",
    "to": "user@domain.com",
    "subject": "Hello",
    "body": "Test"
  }'${
    auth
      ? `\\
  --header 'Authorization: Bearer ${token}'`
      : ""
  }`,
  node: ({
    host = "smtp.example.com",
    port = 587,
    auth = true,
    token = "REDACTED",
  }) => `import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "${host}",
  port: ${port},
  secure: ${port === 465},
  auth: ${auth ? `{ user: "username", pass: "${token}" }` : "undefined"}
});

await transporter.sendMail({
  from: "no-reply@example.com",
  to: "user@domain.com",
  subject: "Hello",
  text: "Test"
});`,
  csharp: ({
    host = "smtp.example.com",
    port = 587,
    auth = true,
    token = "REDACTED",
  }) => `using MailKit.Net.Smtp;
using MimeKit;

// ... setup message
using var smtp = new SmtpClient();
smtp.Connect("${host}", ${port}, false);
${auth ? `smtp.Authenticate("username", "${token}");` : ""}
smtp.Send(message);
smtp.Disconnect(true);`,
  python: ({
    host = "smtp.example.com",
    port = 587,
    auth = true,
    token = "REDACTED",
  }) => `import smtplib
from email.message import EmailMessage

# ... setup message
with smtplib.SMTP("${host}", ${port}) as s:
${
  auth
    ? `    s.login("username", "${token}")
    s.send_message(msg)`
    : "    s.send_message(msg)"
}`,
  php: ({
    host = "smtp.example.com",
    port = 587,
    auth = true,
    token = "REDACTED",
  }) => `<?php
use PHPMailer\\PHPMailer\\PHPMailer;

$mail = new PHPMailer();
$mail->isSMTP();
$mail->Host = '${host}';
$mail->Port = ${port};
${
  auth
    ? `$mail->SMTPAuth = true;
$mail->Username = 'username';
$mail->Password = '${token}';`
    : ""
}
// ... set from/to/body
$mail->send();`,
  java: ({
    host = "smtp.example.com",
    port = 587,
    auth = true,
    token = "REDACTED",
  }) => `import java.util.Properties;
// ... imports
import javax.mail.*;
import javax.mail.internet.*;

Properties props = new Properties();
props.put("mail.smtp.host", "${host}");
props.put("mail.smtp.port", "${port}");
${auth ? `props.put("mail.smtp.auth", "true");` : ""}

Session session = Session.getInstance(props${
    auth
      ? `, new Authenticator() {
    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication("username", "${token}");
    }
}`
      : ""
  });
// ... setup message
Transport.send(message);`,
};

const pageVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18 } },
};

const APISettings: React.FC = () => {
  const [activeTopTab, setActiveTopTab] = useState<"smtp" | "api">("smtp");

  // SMTP State
  const [host, setHost] = useState("smtp.example.com");
  const [port, setPort] = useState<number | "">(587);
  const [useAuth, setUseAuth] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState(domainOptions[0].value);
  const [moreSecure, setMoreSecure] = useState(false);
  const [username, setUsername] = useState("smtp-user");

  // API/Token State (shared between tabs)
  const [password, setPassword] = useState("s3cr3t-token"); // Used for SMTP password and API token
  const [isDefault, setIsDefault] = useState(true);

  // API Tab Specific Data
  const apiDomain = "api.zeptomail.in";
  const mailAgentAlias = "2a53b15fa46b8f8e";
  const senderAddress = "info@zlliq.com";
  const sendMailToken = "Zoho-enczapikey ********"; // Initial token for display

  // UI State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedLang, setSelectedLang] = useState<LangKey>("curl");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 1600);
      return () => clearTimeout(t);
    }
  }, [copied]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error("copy failed", err);
    }
  };

  const handleDeletePassword = () => {
    setShowDeleteConfirm(false);
    setPassword("");
    setIsDefault(false);
  };

  const generateToken = () => {
    // Generate a secure token
    const token = [...crypto.getRandomValues(new Uint8Array(24))]
      .map((b) => b.toString(36).padStart(2, "0"))
      .join("")
      .slice(0, 32);
    setPassword(token);
    setIsDefault(false);
  };

  const renderedCode = sampleSnippets[selectedLang]({
    host: activeTopTab === "api" ? apiDomain : host, // Use API host for API tab
    port: typeof port === "number" ? port : 587,
    auth: useAuth,
    token: isDefault
      ? "DEFAULT_TOKEN"
      : activeTopTab === "api"
      ? sendMailToken.replace(/\*+/g, password) // Show masked/generated token for API
      : password || "REDACTED", // Show generated token for SMTP
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-950 ">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key="apipage"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl  p-6"
        >
          {/* Top tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveTopTab("smtp")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTopTab === "smtp"
                    ? "bg-[#0042E4] text-white shadow-md"
                    : "bg-transparent text-gray-700 dark:text-gray-200 border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                SMTP
              </button>
              <button
                onClick={() => setActiveTopTab("api")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTopTab === "api"
                    ? "bg-[#0042E4] text-white shadow-md"
                    : "bg-transparent text-gray-700 dark:text-gray-200 border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                API
              </button>
            </div>
            <div className="flex items-center gap-3">
              <PrimaryButton
                label="Save Settings"
                onClick={() => alert("Settings Saved (Mock)")}
              />
            </div>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: form area (7/12) */}
            <div className="lg:col-span-6 space-y-5">
              <AnimatePresence mode="wait">
                {activeTopTab === "smtp" && (
                  <SMTPForm
                    key="smtp-form-component"
                    host={host}
                    setHost={setHost}
                    port={port}
                    setPort={setPort}
                    useAuth={useAuth}
                    setUseAuth={setUseAuth}
                    moreSecure={moreSecure}
                    setMoreSecure={setMoreSecure}
                    selectedDomain={selectedDomain}
                    domainOptions={domainOptions}
                    setSelectedDomain={setSelectedDomain}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    isDefault={isDefault}
                    setIsDefault={setIsDefault}
                    copyToClipboard={copyToClipboard}
                    generateToken={generateToken}
                    setShowDeleteConfirm={setShowDeleteConfirm}
                  />
                )}
                {activeTopTab === "api" && (
                  <APIForm
                    key="api-form-component"
                    apiDomain={apiDomain}
                    mailAgentAlias={mailAgentAlias}
                    senderAddress={senderAddress}
                    sendMailToken={sendMailToken}
                    isDefault={isDefault}
                    copyToClipboard={copyToClipboard}
                    generateToken={generateToken}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Right: Code sidebar (5/12) */}
            <div className="lg:col-span-6">
              <APISidebar
                selectedLang={selectedLang}
                setSelectedLang={setSelectedLang}
                renderedCode={renderedCode}
                copyToClipboard={copyToClipboard}
                copied={copied}
                isDefault={isDefault}
                setIsDefault={setIsDefault}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Delete confirmation popup */}
      <Popup
        isOpen={showDeleteConfirm}
        title="Are you sure?"
        onClose={() => setShowDeleteConfirm(false)}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-700 dark:text-gray-200">
            Are you sure you want to delete the stored password / token? This
            action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDeletePassword}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default APISettings;
