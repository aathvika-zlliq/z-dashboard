// DomainItem.tsx
import React, { useState } from "react";
import { Pencil, Trash2, Eye, CheckCircle } from "lucide-react";
import DnsRecordTable, { DnsRecord } from "./DnsRecordTable";
import Popup from "../common/Popup";
import AddDomainForm, { AddDomainPayload } from "./AddDomainForm";
import PrimaryButton from "../common/PrimaryButton";

interface Domain {
  id: number;
  name: string;
  status: "pending" | "verified";
  selector: string;
  keyLength: "1024" | "2048";
}

interface Props {
  domain: Domain;
  onDelete: (id: number) => void;
  onEdit: (id: number, payload: AddDomainPayload) => void;
  onVerify: (id: number) => void;
  maxTwo?: boolean;
}

const DomainItem: React.FC<Props> = ({
  domain,
  onDelete,
  onEdit,
  onVerify,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // DNS records sample (values per your request)
  const records: DnsRecord[] = [
    {
      id: "spf",
      type: "SPF",
      name: "mail",
      value: "v=spf1 include:ksplcloud.com ~all",
    },
    {
      id: "dkim",
      type: "DKIM",
      name: `${domain.selector}._domainkey.${domain.name}`,
      value: `k=rsa; p=MIGfMA0GCSqGSIb3DQEBA...`,
    },
    {
      id: "dmarc",
      type: "DMARC",
      name: "_dmarc",
      value: "v=DMARC1; p=none; rua=mailto:mailauth@example.com",
    },
    {
      id: "mx",
      type: "MX",
      name: "mail",
      value: "ksplcloud.com",
      priority: "10",
    },
    { id: "a", type: "A Record", name: "mail", value: "103.94.241.36" },
  ];

  // track checkboxes by record id
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setChecked((s) => ({ ...s, [id]: !s[id] }));
  const allChecked = records.every((r) => !!checked[r.id]);

  const handleVerify = () => {
    if (!allChecked) return;
    onVerify(domain.id);
  };

  const handleEditSubmit = (payload: AddDomainPayload) => {
    onEdit(domain.id, payload);
    setShowEdit(false);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4 bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {domain.name}
            </h4>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                domain.status === "verified"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {domain.status === "verified"
                ? "Verified"
                : "Pending Verification"}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            <div>
              <span className="font-medium">Selector:</span> {domain.selector}
            </div>
            <div>
              <span className="font-medium">Key Length:</span>{" "}
              {domain.keyLength} bits
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPopup(true)}
            title="Open details in popup"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Eye />
          </button>

          <button
            onClick={() => setExpanded((s) => !s)}
            title="Expand inline"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {expanded ? "−" : "+"}
          </button>

          <button
            onClick={() => setShowEdit(true)}
            title="Edit"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Pencil />
          </button>

          <button
            onClick={() => onDelete(domain.id)}
            title="Delete"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500"
          >
            <Trash2 />
          </button>
        </div>
      </div>

      {/* Inline expand area */}
      {expanded && (
        <div className="mt-4">
          <DnsRecordTable
            records={records}
            checked={checked}
            onToggle={toggle}
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
              onClick={() => {
                setChecked({});
              }}
            >
              Reset
            </button>
            <PrimaryButton
              label={
                allChecked ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle /> Verify DNS
                  </span>
                ) : (
                  "Verify DNS"
                )
              }
              disabled={!allChecked}
              onClick={handleVerify}
            />
          </div>
        </div>
      )}

      {/* Popup view for details */}
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title={`${domain.name} — DNS records`}
        subtitle="Copy these records into your DNS provider (Hostinger, Cloudflare, GoDaddy, etc.)"
      >
        <DnsRecordTable records={records} checked={checked} onToggle={toggle} />
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
            onClick={() => setChecked({})}
          >
            Reset
          </button>
          <PrimaryButton
            label={
              allChecked ? (
                <span className="flex items-center gap-2">
                  <CheckCircle /> Verify DNS
                </span>
              ) : (
                "Verify DNS"
              )
            }
            disabled={!allChecked}
            onClick={() => {
              handleVerify();
              setShowPopup(false);
            }}
          />
        </div>
      </Popup>

      {/* Edit popup */}
      <Popup
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        title={`Edit ${domain.name}`}
        widthClass="max-w-lg"
      >
        <AddDomainForm
          initial={{
            domainName: domain.name,
            selectorType: domain.selector === "autogen" ? "auto" : "manual",
            selector: domain.selector,
            keyLength: domain.keyLength,
          }}
          onCancel={() => setShowEdit(false)}
          onSubmit={handleEditSubmit}
        />
      </Popup>
    </div>
  );
};

export default DomainItem;
