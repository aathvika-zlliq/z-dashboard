import React, { useState, useEffect } from "react";
import Popup from "../common/Popup";
import FloatingTextField from "../dashboard/forms/FloatingTextField";
import PrimaryButton from "../common/PrimaryButton";

interface EditDomainPopupProps {
  isOpen: boolean;
  onClose: () => void;
  domainName: string;
  onSave: (newName: string) => void;
}

const EditDomainPopup: React.FC<EditDomainPopupProps> = ({
  isOpen,
  onClose,
  domainName,
  onSave,
}) => {
  const [name, setName] = useState(domainName);

  useEffect(() => {
    setName(domainName);
  }, [domainName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim());
    onClose();
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Domain"
      subtitle="You can update your domain name here."
      widthClass="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FloatingTextField
          label="Domain Name"
          value={name}
          onChange={setName}
          required
        />
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <PrimaryButton label="Save Changes" type="submit" />
        </div>
      </form>
    </Popup>
  );
};

export default EditDomainPopup;
