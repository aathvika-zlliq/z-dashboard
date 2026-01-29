import { useEffect, useRef, useState } from "react";
import BrandWhiteLogo from "../assets/images/brand/zlliq-white-logo.png";
import BrandDarkLogo from "../assets/images/brand/zlliq-dark-logo.png";
import { Link, useNavigate } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import NotificationDropdown from "../components/header/NotificationDropdown";
import UserDropdown from "../components/header/UserDropdown";
import { connect } from "react-redux";
import { getUserProfile } from "../actions";

import { AnimatePresence, motion } from "framer-motion";

const AppHeader: React.FC = ({ user, token, fetchUserProfile }) => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const SEARCH_PAGES = [
    { label: "Dashboard", path: "/" },
    { label: "Campaigns", path: "/campaigns" },
    { label: "Templates", path: "/templates" },
    { label: "Domains", path: "/domains" },
    { label: "Settings", path: "/settings" },
  ];

  const handleToggle = () => {
    if (window.innerWidth >= 991) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };
  const filteredPages = SEARCH_PAGES.filter((page) =>
    page.label.toLowerCase().includes(search.toLowerCase()),
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(user, token);
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if ((event.metaKey || event.ctrlKey) && event.key === "k") {
  //       event.preventDefault();
  //       inputRef.current?.focus();
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => document.removeEventListener("keydown", handleKeyDown);
  // }, []);
  useEffect(() => {
    if (user?.user_id && user?.account_id) {
      // Call API and log the result
      fetchUserProfile()
        .then((res) => {
          console.log("User Profile Response:", res);
        })
        .catch((err) => {
          console.error("Failed to fetch user profile:", err);
        });
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [user, fetchUserProfile]);

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between flex-grow lg:flex-row lg:px-6">
        {/* Left section */}
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          {/* Sidebar Toggle */}
          <button
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-50 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.22 7.28a.75.75 0 0 1 1.06 0L12 11.94l4.72-4.72a.75.75 0 0 1 1.06 1.06L13.06 12l4.72 4.72a.75.75 0 1 1-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L10.94 12 6.22 7.28a.75.75 0 0 1 0-1.06Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.33 0.25h13.33a.75.75 0 0 1 0 1.5H1.33a.75.75 0 0 1 0-1.5Zm0 10h13.33a.75.75 0 0 1 0 1.5H1.33a.75.75 0 0 1 0-1.5Zm0-5h6.67a.75.75 0 0 1 0 1.5H1.33a.75.75 0 0 1 0-1.5Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="lg:hidden">
            <img
              className="dark:hidden w-[120px] h-auto"
              src={BrandDarkLogo}
              alt="Zlliq Logo"
            />
            <img
              className="hidden dark:block w-[120px] h-auto"
              src={BrandWhiteLogo}
              alt="Zlliq Logo"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-50 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm12 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Search (Desktop only) */}
          <div className="hidden lg:block">
            <form
              className="relative w-[430px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative w-full">
                <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                  <svg
                    className="fill-gray-500 dark:fill-gray-400"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.04 9.37a6.33 6.33 0 1 1 12.67 0 6.33 6.33 0 0 1-12.67 0ZM9.38 1.54A7.83 7.83 0 1 0 14.36 15.42l2.82 2.82a.75.75 0 0 0 1.06-1.06l-2.82-2.82A7.83 7.83 0 0 0 9.38 1.54Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                  type="text"
                  placeholder="Search or type command..."
                  className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-700 xl:w-[430px]"
                />
              </div>
              <AnimatePresence>
                {showDropdown && search && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-2 w-full overflow-hidden
                 rounded-xl border border-gray-200 bg-white
                 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]
                 dark:border-gray-800 dark:bg-gray-900 z-50"
                  >
                    <div className="max-h-72 overflow-y-auto py-1">
                      {filteredPages.length ? (
                        filteredPages.map((page) => (
                          <button
                            key={page.path}
                            onMouseDown={() => navigate(page.path)}
                            className="group flex w-full items-center gap-3 px-4 py-2.5
                         text-left text-sm text-gray-700
                         hover:bg-gray-100
                         dark:text-gray-300 dark:hover:bg-gray-800
                         transition-colors"
                          >
                            <span className="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-blue-500 dark:bg-gray-600" />
                            <span className="flex-1">{page.label}</span>
                            <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
                              →
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center text-sm text-gray-400">
                          No matching pages
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Right section */}
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggleButton />
            <NotificationDropdown />
          </div>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.settingsReducer.user,
  token: state.settingsReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => dispatch(getUserProfile()), // mapped API call
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
