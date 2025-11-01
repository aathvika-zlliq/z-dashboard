// AddDomainForm.tsx
import React, { useState } from "react";
import FloatingTextField from "../dashboard/forms/FloatingTextField";
import PrimaryButton from "../common/PrimaryButton";

export interface AddDomainPayload {
  domainName: string;
  selectorType: "auto" | "manual";
  selector: string;
  keyLength: "1024" | "2048";
}

interface Props {
  initial?: Partial<AddDomainPayload>;
  onSubmit: (data: AddDomainPayload) => void;
  onCancel: () => void;
  maxReached?: boolean;
}

const AddDomainForm: React.FC<Props> = ({
  initial = {},
  onSubmit,
  onCancel,
  maxReached = false,
}) => {
  const [domainName, setDomainName] = useState(initial.domainName ?? "");
  const [selectorType, setSelectorType] = useState<"auto" | "manual">(
    initial.selectorType ?? "auto"
  );
  const [manualSelector, setManualSelector] = useState(initial.selector ?? "");
  const [keyLength, setKeyLength] = useState<"1024" | "2048">(
    initial.keyLength ?? "2048"
  );
  const [error, setError] = useState<string | null>(null);

  const validateDomain = (d: string) => {
    const trimmed = d.trim();
    if (!trimmed) return false;
    const re = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z]{2,})+$/;
    return re.test(trimmed);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const name = domainName.trim().toLowerCase();
    if (!validateDomain(name)) {
      setError("Please enter a valid domain (e.g., example.com).");
      return;
    }
    onSubmit({
      domainName: name,
      selectorType,
      selector:
        selectorType === "manual" ? manualSelector || "default" : "autogen",
      keyLength,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FloatingTextField
        label="Domain Name"
        value={domainName}
        onChange={setDomainName}
        placeholder="e.g., example.com"
        required
        disabled={maxReached}
      />
      {error && <div className="text-sm text-red-500">{error}</div>}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h4 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Advanced DKIM Setup
        </h4>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Selector
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="selectorType"
                checked={selectorType === "auto"}
                onChange={() => setSelectorType("auto")}
                className="accent-indigo-600"
              />
              <span className="text-sm">Autogenerate</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="selectorType"
                checked={selectorType === "manual"}
                onChange={() => setSelectorType("manual")}
                className="accent-indigo-600"
              />
              <span className="text-sm">Enter Manually</span>
            </label>
          </div>
          {selectorType === "manual" && (
            <div className="mt-3">
              <FloatingTextField
                label="Selector Name"
                value={manualSelector}
                onChange={setManualSelector}
                placeholder="e.g., default"
                required
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Key Length
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="keyLength"
                value="1024"
                checked={keyLength === "1024"}
                onChange={() => setKeyLength("1024")}
                className="accent-indigo-600"
              />
              <span className="text-sm">1024 bits</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="keyLength"
                value="2048"
                checked={keyLength === "2048"}
                onChange={() => setKeyLength("2048")}
                className="accent-indigo-600"
              />
              <span className="text-sm">2048 bits</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <PrimaryButton type="submit" label="Add Domain" disabled={maxReached} />
      </div>

      {maxReached && (
        <div className="text-sm text-yellow-600">
          Maximum of two domains allowed. Remove a domain to add a new one.
        </div>
      )}
    </form>
  );
};

export default AddDomainForm;
