import { motion } from "framer-motion";

interface SettingsTableProps {
  title: string;
  columns: string[];
  data: {
    label: string;
    email: boolean;
    sms: boolean;
  }[];
  onToggle: (rowIndex: number, type: "email" | "sms") => void;
}

const SettingsTable: React.FC<SettingsTableProps> = ({
  title,
  columns,
  data,
  onToggle,
}) => {
  const renderToggle = (enabled: boolean, onToggle: () => void) => (
    <div
      onClick={onToggle}
      className={`w-12 h-6 flex items-center justify-start rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        enabled ? "bg-[#0042E4]" : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`w-4 h-4 rounded-full bg-white shadow-md transform ${
          enabled ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </div>
  );

  return (
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <table className="w-full text-gray-700 dark:text-gray-300">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="p-4 text-left font-medium">{title}</th>
            {columns.map((col) => (
              <th key={col} className="p-4 text-center font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, i) => (
            <tr key={i}>
              <td className="p-4 font-medium align-middle">{row.label}</td>
              <td className="p-4">
                <div className="flex justify-center items-center">
                  {renderToggle(row.email, () => onToggle(i, "email"))}
                </div>
              </td>
              <td className="p-4">
                <div className="flex justify-center items-center">
                  {renderToggle(row.sms, () => onToggle(i, "sms"))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SettingsTable;
