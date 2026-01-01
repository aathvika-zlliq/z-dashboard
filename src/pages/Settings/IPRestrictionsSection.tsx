import React from "react";
import { Shield } from "lucide-react";

const IPRestrictionsSection: React.FC = () => (
  <div
    role="tabpanel"
    id="panel:«raq»-4"
    aria-labelledby="tab:«raq»-4"
    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4"
  >
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
      <Shield size={20} /> IP Restrictions
    </h2>
    <p className="text-gray-600 dark:text-gray-300">
      Restrict API access and sending from this domain to a list of allowed IP
      addresses or ranges for enhanced security.
    </p>
    <div className="mt-4 space-y-3">
      <div className="p-3 border rounded-lg dark:border-gray-700">
        <label className="font-medium dark:text-gray-200 block mb-1">
          Allowed IP List (CIDR Notation)
        </label>
        <textarea
          rows={3}
          defaultValue="192.168.1.1/24\n103.94.241.36"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>
      </div>
      <div className="text-sm text-yellow-600 dark:text-yellow-400 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
        **Warning:** Leaving this empty will allow access from any IP address.
      </div>
    </div>
  </div>
);

export default IPRestrictionsSection;
