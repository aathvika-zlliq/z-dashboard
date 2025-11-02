import { useCallback } from "react";
import { Link, useLocation } from "react-router";
import { FileText, Globe, Server, Settings, BellOff } from "lucide-react";
import BrandWhiteLogo from "../assets/images/brand/zlliq-white-logo.png";
import BrandDarkLogo from "../assets/images/brand/zlliq-dark-logo.png";
import CollapsedIcon from "../../favicon.png";

import {
  GridIcon,
  CalenderIcon,
  PieChartIcon,
  TableIcon,
  HorizontaLDots,
} from "../icons";

import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  { icon: <GridIcon />, name: "Dashboard", path: "/dashboard" },
  { icon: <CalenderIcon />, name: "Live Analytics", path: "/live-feed" },
  { icon: <PieChartIcon />, name: "Live Statistics", path: "/statistics" },
  { icon: <TableIcon />, name: "Generate Export", path: "/export" },
  {
    icon: <FileText className="size-5" />,
    name: "Templates",
    path: "/templates",
  },
  {
    icon: <Server className="size-5" />,
    name: "Dedicated IP",
    path: "/dedicated-ip",
  },
  { icon: <Globe className="size-5" />, name: "Domains", path: "/domains" },
  {
    icon: <BellOff className="size-5" />,
    name: "Suppressions",
    path: "/suppressions",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav) => (
        <li key={nav.name}>
          <Link
            to={nav.path}
            className={`menu-item group ${
              isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
            }`}
          >
            <span
              className={`menu-item-icon-size ${
                isActive(nav.path)
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
              }`}
            >
              {nav.icon}
            </span>

            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text">{nav.name}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 dark:text-gray-100 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isHovered || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ---------- Logo Section ---------- */}
      <div
        className={`py-6 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/dashboard" className="flex items-center">
          {/* Hide logo on mobile */}
          <div className="hidden md:flex items-center">
            {isExpanded || isHovered || isMobileOpen ? (
              <>
                {/* Light Theme Logo */}
                <img
                  src={BrandDarkLogo}
                  alt="Zlliq Logo"
                  width={130}
                  height={35}
                  className="transition-all bg-white duration-300 block dark:hidden"
                />
                {/* Dark Theme Logo */}
                <img
                  src={BrandWhiteLogo}
                  alt="Zlliq Logo Dark"
                  width={130}
                  height={35}
                  className="transition-all duration-300 hidden dark:block"
                />
              </>
            ) : (
              <img
                src={CollapsedIcon}
                alt="Zlliq Icon"
                width={32}
                height={32}
                className="transition-all duration-300"
              />
            )}
          </div>
        </Link>
      </div>

      {/* ---------- Navigation + Settings ---------- */}
      <div className="flex flex-col justify-between flex-grow overflow-y-auto duration-300 ease-linear no-scrollbar">
        {/* ---------- Top Menu ---------- */}
        <nav className="mb-4">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 dark:text-gray-500 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>

              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>

        {/* ---------- Settings ---------- */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-4">
          <Link
            to="/settings"
            className={`menu-item group ${
              isActive("/settings") ? "menu-item-active" : "menu-item-inactive"
            }`}
          >
            <span
              className={`menu-item-icon-size ${
                isActive("/settings")
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
              }`}
            >
              <Settings className="size-5" />
            </span>

            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text">Settings</span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
