import { Pencil, Trash2, CheckCircle } from "lucide-react";
import { useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import DnsRecordTable from "./DnsRecordTable";

interface Props {
  domain: string;
  onDelete: (domain: string) => void;
}

const DomainRow = ({ domain, onDelete }: Props) => {
  const [checkedRecords, setCheckedRecords] = useState<Record<string, boolean>>(
    {}
  );

  const records = [
    {
      type: "SPF",
      name: "mail",
      value: "v=spf1 include:ksplcloud.com ~all",
    },
    {
      type: "DKIM",
      name: "kspl._domainkey",
      value: "k=rsa; p=MIGfMA0GCSqGSIb3DQEBA...",
    },
    {
      type: "DMARC",
      name: "_dmarc",
      value: "v=DMARC1; p=none; rua=mailto:mailauth@leabro.com",
    },
    {
      type: "MX",
      name: "mail",
      value: "ksplcloud.com",
      priority: "10",
    },
    {
      type: "A Record",
      name: "mail",
      value: "103.94.241.36",
    },
  ];

  const handleCheckChange = (type: string) => {
    setCheckedRecords((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const allChecked = records.every((r) => checkedRecords[r.type]);

  return (
    <div className="border rounded-xl p-5 mb-5 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {domain}
          <span className="ml-3 text-sm bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
            Pending Verification
          </span>
        </h3>
        <div className="flex items-center gap-3">
          <button className="text-blue-600 flex items-center gap-1 text-sm">
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={() => onDelete(domain)}
            className="text-red-600 flex items-center gap-1 text-sm"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      <DnsRecordTable
        records={records}
        checkedRecords={checkedRecords}
        onCheckChange={handleCheckChange}
      />

      <div className="flex justify-end mt-4">
        <PrimaryButton
          label={
            allChecked ? (
              <span className="flex items-center gap-1">
                <CheckCircle size={16} /> Verify DNS
              </span>
            ) : (
              "Verify DNS"
            )
          }
          disabled={!allChecked}
          onClick={() => alert(`Verifying ${domain}...`)}
        />
      </div>
    </div>
  );
};

export default DomainRow;
