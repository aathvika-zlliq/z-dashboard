import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SuppressionTable, {
  SuppressionItem,
} from "../../components/suppressions/SuppressionTable";
import SuppressionDetailsPage from "./DetailsPage";
import Popup from "../../components/common/Popup";
import SingleDropdown from "../../components/common/SingleDropdown";
import FloatingTextarea from "../../components/common/FloatingTextarea";
import { UploadCloud } from "lucide-react";

const suppressions: SuppressionItem[] = [
  {
    id: 1,
    name: "Auto Unsubscribe",
    count: 265,
    status: "Active",
    actions: ["eye", "download", "toggle"],
  },
  {
    id: 2,
    name: "Manual Deactivate",
    count: 265,
    status: "Active",
    actions: ["eye", "plus", "download"],
  },
  {
    id: 3,
    name: "Global Suppression",
    count: 265,
    status: "Active",
    actions: ["eye", "download", "download"],
  },
];

const Suppressions = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SuppressionItem | null>(
    null
  );
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showImportPopup, setShowImportPopup] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleEyeClick = (item: SuppressionItem) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handlePlusClick = (item: SuppressionItem) => {
    setSelectedItem(item);
    setShowAddPopup(true);
  };

  const handleDownloadClick = (item: SuppressionItem) => {
    setSelectedItem(item);
    setShowImportPopup(true);
  };

  const handleFileSelect = (file: File) => {
    if (file && file.size <= 300 * 1024 * 1024 && file.name.endsWith(".csv")) {
      setSelectedFile(file);
    } else {
      alert("Please upload a valid .CSV file up to 300MB.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const dropdownOptions = [
    { label: "Global Suppression", value: "global" },
    { label: "Manual Deactivate", value: "manual" },
    { label: "Auto Unsubscribe", value: "auto" },
  ];

  const pageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

  return (
    <div className="p-6 relative">
      <AnimatePresence mode="wait">
        {!showDetails ? (
          <motion.div
            key="table"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <SuppressionTable
              title="Suppressions"
              data={suppressions}
              onEyeClick={handleEyeClick}
              onPlusClick={handlePlusClick}
              onDownloadClick={handleDownloadClick}
            />
          </motion.div>
        ) : (
          <motion.div
            key="details"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <SuppressionDetailsPage
              suppression={selectedItem}
              onBack={() => setShowDetails(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Add Suppression Recipient Popup */}
      <Popup
        isOpen={showAddPopup}
        title="Add Suppression Recipient"
        onClose={() => setShowAddPopup(false)}
      >
        <div className="space-y-4">
          <SingleDropdown
            label="Suppression Type"
            value={dropdownValue}
            options={dropdownOptions}
            onChange={setDropdownValue}
          />

          <FloatingTextarea
            label="Recipient Emails"
            value={textValue}
            onChange={setTextValue}
            placeholder="Enter emails separated by commas"
          />

          <div className="flex justify-end space-x-3 mt-4">
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => setShowAddPopup(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-[#0042E4] text-white hover:bg-[#0032b5]"
              onClick={() => {
                console.log({
                  type: dropdownValue,
                  recipients: textValue,
                });
                setShowAddPopup(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Popup>

      {/* ✅ Import File Popup */}
      <Popup
        isOpen={showImportPopup}
        title="Import File"
        onClose={() => setShowImportPopup(false)}
      >
        <div className="space-y-5">
          <p className="text-center text-sm">
            Click{" "}
            <a href="#" className="text-[#0042E4] font-medium hover:underline">
              here
            </a>{" "}
            to download sample file
          </p>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#0042E4] transition"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <UploadCloud size={36} className="text-gray-400 mb-3" />
            {selectedFile ? (
              <p className="text-gray-700 font-medium">{selectedFile.name}</p>
            ) : (
              <>
                <p className="text-gray-700">
                  Drag & drop your CSV file here, or{" "}
                  <span className="text-[#0042E4] font-medium">browse</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports: .CSV files up to 300MB
                </p>
              </>
            )}
            <input
              id="fileInput"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) =>
                e.target.files?.length && handleFileSelect(e.target.files[0])
              }
            />
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => setShowImportPopup(false)}
            >
              Cancel
            </button>
            <button
              disabled={!selectedFile}
              className={`px-4 py-2 rounded-lg text-white ${
                selectedFile
                  ? "bg-[#0042E4] hover:bg-[#0032b5]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={() => {
                console.log("File uploaded:", selectedFile);
                setShowImportPopup(false);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Suppressions;
