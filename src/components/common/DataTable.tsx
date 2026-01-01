import React from "react";
import { Info, Edit, Trash2 } from "lucide-react";

// --- Interfaces for Props ---

// 1. Defines the shape of the data row (e.g., a single user)
interface DataRow {
  [key: string]: any; // Allows any key-value pair
}

// 2. Defines the shape of a column (how to render the header and the data)
interface ColumnDefinition<T extends DataRow> {
  key: keyof T | "actions"; // Key in the data object or 'actions'
  header: string; // Text for the table header
  render?: (row: T) => React.ReactNode; // Optional custom rendering function
}

// 3. Defines the props for the DataTable component
interface DataTableProps<T extends DataRow> {
  data: T[];
  columns: ColumnDefinition<T>[];
  ariaLabel: string;
}
// ----------------------------

// Helper function to dynamically get role style
const getRoleClass = (role: string) => {
  switch (role.toLowerCase()) {
    case "engineer":
      return "zzm-role-info--eng text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30";
    case "postmaster":
      return "zzm-role-info--pm text-red-600 bg-red-50 dark:bg-red-900/30";
    default:
      return "text-gray-600 bg-gray-50 dark:bg-gray-700/30";
  }
};

const DataTable = <T extends DataRow>({
  data,
  columns,
  ariaLabel,
}: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
      <table
        aria-label={ariaLabel}
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm"
      >
        {/* Table Header */}
        <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              data-atm={row.emailID}
              className="zmtable-row__cefda5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              {columns.map((column, colIndex) => (
                <td
                  key={String(column.key)}
                  className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100"
                  data-atm={String(column.key)}
                >
                  {/* Custom render function takes priority */}
                  {column.render
                    ? column.render(row)
                    : column.key !== "actions"
                    ? row[column.key]
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
