import { Ban } from "lucide-react";
import PageMeta from "../../components/common/PageMeta";
import PrimaryButton from "../../components/common/PrimaryButton";
import LiveFeed from "../LiveFeed"; // 👈 Import LiveFeed page

const Templates = () => {
  return (
    <>
      <PageMeta
        title="Templates | Zlliq Dashboard"
        description="Restricted access notice for Templates feature"
      />

      <div className="relative h-screen overflow-hidden">
        {/* ---------- Blurred Background: LiveFeed ---------- */}
        <div className="absolute inset-0 opacity-40 blur-sm pointer-events-none select-none">
          <LiveFeed />
        </div>

        {/* ---------- Overlay Notice ---------- */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-red-100 dark:bg-red-900/40 p-5 rounded-full mb-4">
              <Ban className="text-red-600 dark:text-red-400 w-12 h-12" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Restricted Access
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-md">
              The Templates feature is not available in your current Zlliq plan.
              <br />
              Please contact customer service for upgrade options.
            </p>
          </div>

          <PrimaryButton
            label="Contact Customer Service"
            onClick={() => alert("Redirecting to support...")}
          />
        </div>
      </div>
    </>
  );
};

export default Templates;
