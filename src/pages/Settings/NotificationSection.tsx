import React from "react";
import { Bell, Zap } from "lucide-react";

const NotificationSection: React.FC = () => (
  <div
    role="tabpanel"
    id="panel:«raq»-3"
    aria-labelledby="tab:«raq»-3"
    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6"
  >
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
      <Bell size={20} /> Notification Settings
    </h2>

    {/* ZZM Note/Info Block for Default Notifications */}
    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg text-sm space-y-2">
      <h4 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
        <Zap size={18} /> Default notifications
      </h4>
      <p className="text-gray-700 dark:text-gray-300">
        You will automatically receive a notification email when:
      </p>
      <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1 pl-4">
        <li className="pl-1">
          Remaining **credit count** reaches below half the total credits after
          the last purchase.
        </li>
        <li className="pl-1">
          Remaining **email count** reaches below: 10000, 1000, 500, 200, and 50
          emails.
        </li>
        <li className="pl-1">
          Credit **expiry date** is within the next 10 days or 24 hours.
        </li>
      </ol>
    </div>

    {/* Placeholder for Custom Notification Settings */}
    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Custom Event Alerts (Not implemented in HTML)
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        You can configure additional alerts for high bounce rates, webhook
        failures, or domain verification status.
      </p>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 text-sm">
        Configure Custom Alerts
      </button>
    </div>
  </div>
);

export default NotificationSection;
