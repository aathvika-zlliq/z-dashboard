import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import Footer from "../components/footer/Footer";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex flex-col lg:flex-row">
      {/* ---------- Sidebar & Backdrop ---------- */}
      <div>
        <AppSidebar />
        <Backdrop />
      </div>

      {/* ---------- Main Content ---------- */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />

        {/* ---------- Page Content ---------- */}
        <main className="flex-grow p-4 mx-auto max-w-screen-2xl md:p-6 w-full">
          <Outlet />
        </main>

        {/* ---------- Footer ---------- */}
        <Footer />
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
