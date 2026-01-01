import React from "react";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";

type LangKey = "curl" | "node" | "csharp" | "python" | "php" | "java";

interface APISidebarProps {
  selectedLang: LangKey;
  setSelectedLang: (key: LangKey) => void;
  renderedCode: string;
  copyToClipboard: (text: string) => void;
  copied: boolean;
  isDefault: boolean;
  setIsDefault: (d: boolean) => void;
}

const languages: [LangKey, string][] = [
  ["curl", "cURL"],
  ["node", "Node.js"],
  ["csharp", "C#"],
  ["python", "Python"],
  ["php", "PHP"],
  ["java", "Java"],
];

const APISidebar: React.FC<APISidebarProps> = ({
  selectedLang,
  setSelectedLang,
  renderedCode,
  copyToClipboard,
  copied,
  isDefault,
  setIsDefault,
}) => {
  return (
    <div className="flex h-full rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
      {/* language list (vertical) */}
      <aside className="w-28 bg-gray-50 dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex-shrink-0">
        <nav className="flex flex-col p-3 gap-2">
          {languages.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedLang(key)}
              className={`text-sm text-left px-2 py-2 rounded-md transition duration-150 ${
                selectedLang === key
                  ? "bg-white dark:bg-gray-900 shadow-sm font-semibold text-[#0042E4] dark:text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* code preview */}
      <main className="flex-1 bg-white dark:bg-gray-900 p-4 relative">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-100 capitalize">
              {selectedLang}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Copy snippet & paste into your app
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(renderedCode)}
              className="flex items-center gap-2 px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <Copy className="w-4 h-4" />
              <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
            </button>
            <button
              onClick={() => setIsDefault((s) => !s)}
              className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              {isDefault ? "Use token" : "Default"}
            </button>
          </div>
        </div>

        {/* The VS Code-style dark code block */}
        <pre
          className="whitespace-pre-wrap break-words text-xs rounded-md p-3 
            bg-gray-900 text-[#C6D2E8] border border-gray-700
            min-h-[260px] overflow-auto font-mono shadow-inner"
          aria-live="polite"
        >
          {renderedCode}
        </pre>
      </main>
    </div>
  );
};

export default APISidebar;
