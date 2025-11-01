import { useState } from "react";
import { Globe } from "lucide-react";
import NoDataPlaceholder from "../../components/domains/NoDataPlaceholder";
import Popup from "../../components/common/Popup";
import FloatingTextField from "../../components/dashboard/forms/FloatingTextField";
import PrimaryButton from "../../components/common/PrimaryButton";
import DomainCard from "../../components/domains/DomainCard";

type Domain = {
  id: number;
  name: string;
  status: "pending" | "verified";
  createdAt: string;
  verification: "Unverified" | "Verified";
  selector: string;
  keyLength: number;
};

const Domains = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [domainName, setDomainName] = useState("");
  const [selectorType, setSelectorType] = useState<"auto" | "manual">("auto");
  const [manualSelector, setManualSelector] = useState("");
  const [keyLength, setKeyLength] = useState(2048);
  const [editId, setEditId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleAddDomainClick = () => {
    if (domains.length >= 2) {
      alert("You can only add up to two domains.");
      return;
    }
    setEditId(null);
    setDomainName("");
    setManualSelector("");
    setSelectorType("auto");
    setKeyLength(2048);
    setIsPopupOpen(true);
  };

  const handleEditDomain = (domain: Domain) => {
    setEditId(domain.id);
    setDomainName(domain.name);
    setSelectorType(domain.selector === "default" ? "auto" : "manual");
    setManualSelector(domain.selector !== "default" ? domain.selector : "");
    setKeyLength(domain.keyLength);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => setIsPopupOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainName.trim()) return;

    if (editId) {
      setDomains((prev) =>
        prev.map((d) =>
          d.id === editId
            ? {
                ...d,
                name: domainName.trim(),
                selector: selectorType === "auto" ? "default" : manualSelector,
                keyLength,
              }
            : d
        )
      );
    } else {
      const newDomain: Domain = {
        id: Date.now(),
        name: domainName.trim(),
        status: "pending",
        createdAt: new Date().toLocaleDateString(),
        verification: "Unverified",
        selector: selectorType === "auto" ? "default" : manualSelector,
        keyLength,
      };
      setDomains((prev) => [...prev, newDomain]);
    }

    setDomainName("");
    setManualSelector("");
    setIsPopupOpen(false);
    setEditId(null);
  };

  const handleDelete = (id: number) => {
    setDomains(domains.filter((d) => d.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {domains.length === 0 ? (
        <NoDataPlaceholder
          title="No Domains Added Yet"
          description="Domains can be verified and associated with Mail Agents to send emails. Add domains to view and manage them here."
          buttonLabel="Add Domain"
          icon={Globe}
          onButtonClick={handleAddDomainClick}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <PrimaryButton
              label="Add Domain"
              icon={Globe}
              onClick={handleAddDomainClick}
            />
          </div>

          {/* Domain Cards */}
          <div className="flex flex-col gap-4">
            {domains.map((domain) => (
              <DomainCard
                key={domain.id}
                domain={domain}
                onDelete={() => handleDelete(domain.id)}
                onEdit={() => handleEditDomain(domain)}
                expanded={expandedId === domain.id}
                onToggle={() =>
                  setExpandedId((prev) =>
                    prev === domain.id ? null : domain.id
                  )
                }
              />
            ))}
          </div>
        </>
      )}

      {/* Add / Edit Popup */}
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title={editId ? "Edit Domain" : "Add New Domain"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingTextField
            label="Domain Name"
            value={domainName}
            onChange={setDomainName}
            placeholder="e.g., example.com"
            required
          />

          <div>
            <label className="block text-sm font-medium mb-2">
              DKIM Selector
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                className={`px-3 py-2 border rounded-lg ${
                  selectorType === "auto"
                    ? "border-green-600 text-green-600"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectorType("auto")}
              >
                Autogenerate
              </button>
              <button
                type="button"
                className={`px-3 py-2 border rounded-lg ${
                  selectorType === "manual"
                    ? "border-green-600 text-green-600"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectorType("manual")}
              >
                Enter Manually
              </button>
            </div>

            {selectorType === "manual" && (
              <div className="mt-3">
                <FloatingTextField
                  label="Selector Name"
                  value={manualSelector}
                  onChange={setManualSelector}
                  placeholder="e.g., mail"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              DKIM Key Length
            </label>
            <select
              value={keyLength}
              onChange={(e) => setKeyLength(Number(e.target.value))}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent focus:ring-2 focus:ring-green-600"
            >
              <option value={1024}>1024 bits</option>
              <option value={2048}>2048 bits</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClosePopup}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <PrimaryButton
              label={editId ? "Save Changes" : "Add Domain"}
              type="submit"
            />
          </div>
        </form>
      </Popup>
    </div>
  );
};

export default Domains;
