// CopyButton.tsx
import { Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // fallback ignored
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1 text-sm ${className}`}
    >
      <Copy size={14} />
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
};

export default CopyButton;
