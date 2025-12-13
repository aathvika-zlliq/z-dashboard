import React from "react";
import { Clock, Send, Info } from "lucide-react";

const SendingLimitsSection: React.FC = () => (
  <div
    role="tabpanel"
    id="panel:«raq»-2"
    aria-labelledby="tab:«raq»-2"
    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6"
  >
    <div className="zzmpage-header">
      <div className="zzmpage-header-row">
        {/* Using a consistent header style with the icon */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Clock size={20} /> Daily sending limit
        </h2>
      </div>
    </div>

    <div className="zzmpage-content space-y-4">
      {/* Empty State/Information Block (Mimicking the structure with an icon list) */}
      <div className="p-8 text-center bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex justify-center mb-4">
          {/* Visual element representing a limit/volume, matching the empty-img concept */}
          <Send size={48} className="text-indigo-500 dark:text-indigo-400" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Daily sending limit
        </h3>

        {/* Information List (zzm-arrow-list equivalent) */}
        <ul className="text-left max-w-md mx-auto space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <Info size={16} className="text-indigo-500 flex-shrink-0 mt-1" />
            <span>
              You can set daily email sending limits for Mail Agents to manage
              the sending volume.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Info size={16} className="text-indigo-500 flex-shrink-0 mt-1" />
            <span>
              The limit will reset at **12 am (India Standard Time)** everyday.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Info size={16} className="text-indigo-500 flex-shrink-0 mt-1" />
            <span>
              **API:** `SM_151` error code will be returned as API response for
              emails sent after limit exhaustion.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Info size={16} className="text-indigo-500 flex-shrink-0 mt-1" />
            <span>
              **SMTP:** Email status will be displayed as *process failed* for
              emails sent after limit exhaustion.
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default SendingLimitsSection;
