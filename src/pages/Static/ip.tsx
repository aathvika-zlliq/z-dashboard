import { MapPinPlus } from "lucide-react";
import PageMeta from "../../components/common/PageMeta";
import PrimaryButton from "../../components/common/PrimaryButton";

const DedicatedIP = () => {
  return (
    <>
      {/* ✅ Page Metadata for SEO and Titles */}
      <PageMeta title="Dedicated IP" description={""} />

      {/* ✅ Centered Layout */}
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
        {/* ---------- Icon ---------- */}
        <div className="bg-blue-100 dark:bg-blue-900/40 p-6 rounded-full mb-6">
          <MapPinPlus className="w-20 h-20 text-[#0042E4]" />
        </div>

        {/* ---------- Title ---------- */}
        <h1 className="text-3xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Dedicated IP Management
        </h1>

        {/* ---------- Paragraph ---------- */}
        <p className="text-gray-600 dark:text-gray-300 max-w-lg mb-8 leading-relaxed">
          Manage your dedicated IP addresses here. Easily allocate, monitor, and
          configure IPs for your projects to ensure maximum performance and
          reliability.
        </p>

        {/* ---------- Button ---------- */}
        <PrimaryButton
          label="Request Dedicated IP"
          className="px-6 py-3 text-lg"
        />
      </div>
    </>
  );
};

export default DedicatedIP;
