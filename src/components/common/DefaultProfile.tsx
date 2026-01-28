import React from "react";
import { Crown, Copy, Info } from "lucide-react";

interface DefaultProfileProps {
  name?: string;
  email?: string;
  role?: string;
  userId?: string;
  avatar?: string;
  showEmail?: boolean;
  showUserId?: boolean;
  onCopyEmail?: (email: string) => void;
}

const DefaultProfile: React.FC<DefaultProfileProps> = ({
  name = "User Name",
  email = "user@example.com",
  role = "User",
  userId = "USR-000000",
  avatar,
  showEmail = true,
  showUserId = true,
  onCopyEmail,
}) => {
  // Fallback avatar if none provided
  const profilePic = avatar || "/images/user/owner.jpg";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    if (onCopyEmail) onCopyEmail(email);
  };

  return (
    <div className="space-y-5">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <img src={profilePic} alt={name} className="h-14 w-14 rounded-full" />
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {name}
          </h3>
          <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wide">
            <Crown size={14} />
            {role}
          </div>
        </div>
      </div>

      {/* Account Info Card */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-4">
        {showEmail && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {email}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Copy size={16} />
            </button>
          </div>
        )}

        {showUserId && (
          <>
            <div className="h-px bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
              <Info size={16} className="mt-0.5" />
              <div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  User ID
                </p>
                <p className="text-xs tracking-wide">{userId}</p>
                <p className="text-[11px] mt-1 opacity-80">
                  This is a system-generated identifier for support & audits.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DefaultProfile;
