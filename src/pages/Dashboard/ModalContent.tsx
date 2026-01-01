import { useState, useMemo } from "react";
import Popup from "../../components/common/Popup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/* =========================
   React Quill Config
========================= */
const quillModules = {
  toolbar: [
    [{ font: [] }, { size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "header",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "align",
  "link",
  "image",
];

/* =========================
   TestEmailContent
========================= */
export const TestEmailContent = ({
  code,
  setCode,
  setIsValid,
}: {
  code: string;
  setCode: (val: string) => void;
  setIsValid: (val: boolean) => void;
}) => {
  const [fromDomain, setFromDomain] = useState("@zlliq.com");
  const [fromEmail, setFromEmail] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [showHeaders, setShowHeaders] = useState(false);
  const [customHeaders, setCustomHeaders] = useState("");

  const sampleDomains = ["@zlliq.com", "@example.com", "@mail.com"];

  const fromFullEmail = useMemo(
    () => `${fromEmail}${fromDomain}`,
    [fromEmail, fromDomain]
  );

  const isFormValid =
    fromEmail.trim() &&
    toEmail.trim() &&
    subject.trim() &&
    code.replace(/<(.|\n)*?>/g, "").trim();

  useMemo(() => {
    setIsValid(Boolean(isFormValid));
  }, [isFormValid, setIsValid]);

  return (
    <div className="space-y-6">
      {/* ===== Sender & Recipient (Side by Side) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ===== Sender ===== */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-5 space-y-3">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            Sender <span className="text-red-500">*</span>
          </h3>

          <div className="flex gap-3">
            <input
              required
              type="text"
              placeholder="From email name"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              value={fromDomain}
              onChange={(e) => setFromDomain(e.target.value)}
              className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {sampleDomains.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <p className="text-sm text-gray-500">
            Final sender: <span className="font-medium">{fromFullEmail}</span>
          </p>
        </div>

        {/* ===== Recipient ===== */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-5 space-y-3">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            Recipient <span className="text-red-500">*</span>
          </h3>

          <input
            required
            type="email"
            placeholder="Recipient email address"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* ===== Subject & Editor ===== */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-5 space-y-3">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Email Subject <span className="text-red-500">*</span>
        </h3>

        <input
          required
          type="text"
          placeholder="Email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            Email Content <span className="text-red-500">*</span>
          </h3>

          <button
            type="button"
            onClick={() => setCode("")}
            className="text-sm text-red-500 hover:underline"
          >
            Clear
          </button>
        </div>

        <div className="border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
          <ReactQuill
            theme="snow"
            value={code}
            onChange={setCode}
            modules={quillModules}
            formats={quillFormats}
            className="bg-white dark:bg-gray-950"
          />
        </div>

        <style jsx global>{`
          .ql-editor {
            min-height: 360px;
            font-size: 15px;
          }
        `}</style>
      </div>

      {/* ===== Headers ===== */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-5 space-y-3">
        <button
          type="button"
          onClick={() => setShowHeaders(!showHeaders)}
          className="font-medium text-blue-600 hover:underline"
        >
          {showHeaders ? "Hide" : "Add"} Custom Headers (optional)
        </button>

        {showHeaders && (
          <textarea
            placeholder="X-Custom-Header: value"
            value={customHeaders}
            onChange={(e) => setCustomHeaders(e.target.value)}
            rows={5}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        )}
      </div>
    </div>
  );
};

/* =========================
   TestEmailModal
========================= */
export const TestEmailModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [emailCode, setEmailCode] = useState("");
  const [isValid, setIsValid] = useState(false);

  return (
    <Popup
      isOpen={open}
      onClose={onClose}
      title="Send Test Email"
      subtitle="Required fields must be filled before sending"
      widthClass="w-[90vw] max-w-6xl"
    >
      <TestEmailContent
        code={emailCode}
        setCode={setEmailCode}
        setIsValid={setIsValid}
      />

      {/* Footer */}
      <div className="sticky -bottom-6 mt-8 px-2 pb-6 pt-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>

        <button
          disabled={!isValid}
          className={`px-6 py-2 rounded-xl transition text-white ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Send Test Email
        </button>
      </div>
    </Popup>
  );
};
