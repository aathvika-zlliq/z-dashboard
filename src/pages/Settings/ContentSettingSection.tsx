import React from "react";
import { Mail, Info } from "lucide-react";

const ContentSettingSection: React.FC = () => (
  <div
    role="tabpanel"
    id="panel:«raq»-1"
    aria-labelledby="tab:«raq»-1"
    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6"
  >
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
      <Mail size={20} /> Content Setting
    </h2>

    {/* ZZM Note/Info Block */}
    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg text-sm space-y-2">
      <h3 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2">
        <Info size={18} /> Points to be noted:
      </h3>
      <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
        <li>
          Only the content of emails sent after enabling this setting will be
          saved.
        </li>
        <li>
          You can view the saved content from Processed Emails tab inside each
          Mail Agent.
        </li>
        <li>You can view saved content for up to 60 days.</li>
      </ol>
    </div>

    {/* Content Storage Setting Form */}
    <div className="zzmpage-setting-form space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Content Storage Setting
      </h3>

      <div className="zzmpage-setting-form-ip" data-atm="save_content_row">
        <fieldset className="space-y-2">
          <div className="flex items-center">
            {/* The disabled checkbox structure */}
            <label className="flex items-center cursor-not-allowed text-gray-500 dark:text-gray-400">
              <span className="relative inline-block h-5 w-5 mr-3">
                <input
                  id="contentDay"
                  disabled
                  aria-checked="false"
                  type="checkbox"
                  value="contentDay"
                  name="save_content_checkbox"
                  className="peer h-5 w-5 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {/* Visual indicator (optional, if you want a custom style for disabled state) */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 border rounded pointer-events-none 
                                bg-gray-100 dark:bg-gray-700 
                                peer-checked:bg-indigo-200 dark:peer-checked:bg-indigo-800"
                ></span>
              </span>

              <span className="text-gray-700 dark:text-gray-300 opacity-50">
                Save the email content
              </span>
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
);

export default ContentSettingSection;
