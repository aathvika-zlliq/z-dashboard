import { useState } from "react";
import { X, Copy, Crown, LogOut, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { clearLocalStorage } from "../../utils/localstorage.js";
import DefaultImg from "../../assets/images/common/di.jpg";
import toast from "react-hot-toast";
import { connect } from "react-redux";

const UserProfileDrawer = ({ details }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Fallbacks if details are not yet loaded
  const email = details?.email || "randomuser@pimjo.com";
  const userId = details?.user_id || "USR-839201";
  const role = details?.role || "Postmaster";

  const copyEmail = () => navigator.clipboard.writeText(email);

  const handleLogout = () => {
    clearLocalStorage();
    toast.success("Logged out successfully");
    setOpen(false);
    setTimeout(() => {
      navigate("/signin");
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
      >
        <img
          src={details?.profile_picture || DefaultImg}
          alt={details?.first_name || "User"}
          className="h-10 w-10 rounded-full"
        />
        <span className="text-sm font-medium">
          {details?.first_name || "User"}
        </span>
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
              className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white dark:bg-gray-900 shadow-xl flex flex-col"
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

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-5 py-6 bg-gray-50 dark:bg-gray-800/60 space-y-5">
                {/* Profile */}
                <div className="flex items-center gap-4">
                  <img
                    src={details?.profile_picture || DefaultImg}
                    alt={details?.first_name || "User"}
                    className="h-14 w-14 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {details?.first_name || "User Name"}
                    </h3>
                    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                      <Crown size={14} />
                      <span className="text-xs font-semibold tracking-wide">
                        {role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-4">
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

                  {/* User ID */}
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

              {/* Footer */}
              <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
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

// ✅ Connect Redux
const mapStateToProps = (state: any) => ({
  details: state.userDetailsReducer.details,
});

export default connect(mapStateToProps, null)(UserProfileDrawer);
