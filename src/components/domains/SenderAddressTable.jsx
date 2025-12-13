// SenderAddressTable.tsx
import React from "react";

// Define the structure for a sender address record
export interface SenderAddress {
  address: string;
  mailAgent: string;
}

interface SenderAddressProps {
  senderAddresses: SenderAddress[];
}

const SenderAddressTable: React.FC<SenderAddressProps> = ({
  senderAddresses,
}) => {
  return (
    <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <h5 className="p-3 text-sm font-semibold bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
        Sender Address Restriction
      </h5>
      <p className="p-3 text-sm text-gray-600 dark:text-gray-400">
        Only the allowed sender addresses can send emails from this domain.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/2"
              >
                Sender Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/2"
              >
                Mail Agent
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {senderAddresses.map((record, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {record.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {record.mailAgent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SenderAddressTable;
