import { useState } from "react";
import { motion } from "framer-motion";
import SettingsTable from "../../../components/common/SettingsTable";

const NotificationsPage = () => {
  // ✅ Organized JSON data
  const initialSettings = {
    accountSecurity: [
      { label: "Login Notifications", email: true, sms: false },
      { label: "Failed Login Attempt", email: true, sms: true },
      { label: "Password Changed", email: true, sms: false },
    ],
    domainSending: [
      { label: "Domain Expiry Warning", email: true, sms: false },
      { label: "New Domain Connected", email: true, sms: true },
      { label: "DNS Verification Failed", email: true, sms: true },
    ],
    billingUsage: [
      { label: "Monthly Invoice Ready", email: true, sms: false },
      { label: "Payment Failed", email: true, sms: true },
      { label: "Usage Limit Warning", email: true, sms: false },
    ],
  };

  const [settings, setSettings] = useState(initialSettings);

  const handleToggle = (
    category: keyof typeof initialSettings,
    index: number,
    type: "email" | "sms"
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: prev[category].map((row, i) =>
        i === index ? { ...row, [type]: !row[type] } : row
      ),
    }));
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="p-6 md:p-8"
    >
      <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Notifications Settings
      </h1>

      <div className="space-y-8">
        <SettingsTable
          title="Account Security"
          columns={["Email", "SMS"]}
          data={settings.accountSecurity}
          onToggle={(index, type) =>
            handleToggle("accountSecurity", index, type)
          }
        />

        <SettingsTable
          title="Domains & Sending"
          columns={["Email", "SMS"]}
          data={settings.domainSending}
          onToggle={(index, type) => handleToggle("domainSending", index, type)}
        />

        <SettingsTable
          title="Billing & Usage"
          columns={["Email", "SMS"]}
          data={settings.billingUsage}
          onToggle={(index, type) => handleToggle("billingUsage", index, type)}
        />
      </div>
    </motion.div>
  );
};

export default NotificationsPage;
