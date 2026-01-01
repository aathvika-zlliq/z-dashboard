import React, { useState } from "react";
import {
  Users,
  Mail,
  Clock,
  Bell,
  Shield,
  BarChart3,
  CreditCard,
} from "lucide-react";

// --- Import content components ---
import SummaryReportSection from "./SummaryReportSection";
import ManageUsersSection from "./ManageUsersSection";
import ContentSettingSection from "./ContentSettingSection";
import SendingLimitsSection from "./SendingLimitsSection";
import NotificationSection from "./NotificationSection";
import IPRestrictionsSection from "./IPRestrictionsSection";
import BillingHistorySection from "./BillingHistorySection";
// ---------------------------------

export type SettingTab =
  | "summary"
  | "users"
  | "contentSetting"
  | "emailLimit"
  | "notification"
  | "allowedIp"
  | "billing";

const tabMap: {
  value: SettingTab;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "summary", label: "Summary Report", icon: BarChart3 },
  { value: "users", label: "Manage Users", icon: Users },
  { value: "contentSetting", label: "Content Setting", icon: Mail },
  { value: "emailLimit", label: "Sending Limits", icon: Clock },
  { value: "notification", label: "Notification", icon: Bell },
  { value: "allowedIp", label: "IP Restrictions", icon: Shield },
  { value: "billing", label: "Billing & Usage", icon: CreditCard },
];

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingTab>("summary");

  const renderContent = () => {
    switch (activeTab) {
      case "summary":
        return <SummaryReportSection />;
      case "users":
        return <ManageUsersSection />;
      case "contentSetting":
        return <ContentSettingSection />;
      case "emailLimit":
        return <SendingLimitsSection />;
      case "notification":
        return <NotificationSection />;
      case "allowedIp":
        return <IPRestrictionsSection />;
      case "billing":
        return <BillingHistorySection />;
      default:
        return <SummaryReportSection />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Sidebar */}
      <div
        role="tablist"
        aria-orientation="vertical"
        className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-xl p-3 space-y-1 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 p-2 mb-2 border-b dark:border-gray-700">
          Domain Settings
        </h3>

        {tabMap.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-3 w-full text-left p-3 rounded-lg font-medium transition
                ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-grow">{renderContent()}</div>
    </div>
  );
};

export default SettingsPage;
