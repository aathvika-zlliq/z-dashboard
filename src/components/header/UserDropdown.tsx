import { useState } from "react";
import {
  X,
  Copy,
  Crown,
  ShieldCheck,
  Settings,
  LogOut,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { clearLocalStorage } from "../../utils/localstorage.js";
import toast from "react-hot-toast";

const UserProfileDrawer = () => {
  const [open, setOpen] = useState(false);

  const email = "randomuser@pimjo.com";
  const userId = "USR-839201";
  const role = "Postmaster";
  const navigate = useNavigate();
  const copyEmail = () => navigator.clipboard.writeText(email);
  const handleLogout = () => {
    clearLocalStorage(); // removes api_key / jwtToken
    toast.success("Logged out successfully");

    setOpen(false);

    // small delay so toast feels natural
    setTimeout(() => {
      navigate("/signin");
    }, 500);
  };
  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
      >
        <img
          src="/images/user/owner.jpg"
          alt="User"
          className="h-10 w-10 rounded-full"
        />
        <span className="text-sm font-medium">Musharof</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="
                absolute right-0 top-0 h-full w-full sm:w-[420px]
                bg-white dark:bg-gray-900 shadow-xl flex flex-col
              "
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Account Overview
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Profile */}
              <div className="px-5 py-6 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 space-y-5">
                <div className="flex items-center gap-4">
                  <img
                    src="/images/user/owner.jpg"
                    alt="User"
                    className="h-14 w-14 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Musharof Chowdhury
                    </h3>

                    {/* Role badge */}
                    <div
                      className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full
                      bg-indigo-100 dark:bg-indigo-500/15
                      text-indigo-700 dark:text-indigo-300
                    "
                    >
                      <Crown size={14} />
                      <span className="text-xs font-semibold tracking-wide">
                        {role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Account Info Card */}
                <div
                  className="
                    rounded-xl border border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-900 p-4 space-y-4
                  "
                >
                  {/* Email */}
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
                      onClick={copyEmail}
                      className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      <Copy size={16} />
                    </button>
                  </div>

                  <div className="h-px bg-gray-200 dark:bg-gray-700" />

                  {/* User ID (Info only) */}
                  <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                    <Info size={16} className="mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        User ID
                      </p>
                      <p className="text-xs tracking-wide">{userId}</p>
                      <p className="text-[11px] mt-1 opacity-80">
                        This is a system-generated identifier for support &
                        audits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex-1 px-5 py-5 space-y-4">
                {/* Postmaster CTA */}
                <Link
                  to="/postmaster"
                  className="
                    flex items-center gap-4 p-4 rounded-xl
                    bg-indigo-50 dark:bg-indigo-500/10
                    border border-indigo-200 dark:border-indigo-500/30
                    text-indigo-700 dark:text-indigo-300
                    hover:bg-indigo-100 dark:hover:bg-indigo-500/20
                    transition
                  "
                >
                  <ShieldCheck size={22} />
                  <div>
                    <p className="font-semibold">Postmaster Dashboard</p>
                    <p className="text-xs opacity-80">
                      Manage reputation, delivery & sending limits
                    </p>
                  </div>
                </Link>

                {/* Settings */}
                <Link
                  to="/account-settings"
                  className="
                    flex items-center gap-3 p-3 rounded-lg
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    transition
                  "
                >
                  <Settings size={18} />
                  <span>Account Settings</span>
                </Link>
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={handleLogout}
                  className="
                    w-full flex items-center justify-center gap-2
                    p-2 rounded-lg
                    bg-red-600 hover:bg-red-700 text-white
                  "
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserProfileDrawer;
