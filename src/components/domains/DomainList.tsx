// DomainList.tsx
import React from "react";
import DomainItem from "./DomainItem";

interface Domain {
  id: number;
  name: string;
  status: "pending" | "verified";
  selector: string;
  keyLength: "1024" | "2048";
}

interface Props {
  domains: Domain[];
  onDelete: (id: number) => void;
  onEdit: (id: number, payload: any) => void;
  onVerify: (id: number) => void;
}

const DomainList: React.FC<Props> = ({
  domains,
  onDelete,
  onEdit,
  onVerify,
}) => {
  return (
    <div className="mt-6 space-y-4">
      {domains.map((d) => (
        <DomainItem
          key={d.id}
          domain={d}
          onDelete={onDelete}
          onEdit={onEdit}
          onVerify={onVerify}
        />
      ))}
    </div>
  );
};

export default DomainList;
