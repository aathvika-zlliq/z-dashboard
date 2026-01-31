import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Popup from "../../components/common/Popup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { sendEmailDirect } from "../../actions";

/* =========================
   React Quill Config
========================= */
const quillModules = {
  toolbar: [
    [{ font: [] }, { size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ header: 1 }, { header: 2 }, "blockquote"],
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
  setFormData,
}: {
  code: string;
  setCode: (val: string) => void;
  setIsValid: (val: boolean) => void;
  setFormData: (val: any) => void;
}) => {
  const [fromDomain, setFromDomain] = useState("@zlliq.com");
  const [fromEmail, setFromEmail] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [showHeaders, setShowHeaders] = useState(false);
  const [customHeaders, setCustomHeaders] = useState("");

  const [mode, setMode] = useState<"rich" | "html" | "code" | "preview">(
    "rich",
  );
  const [iframeKey, setIframeKey] = useState(0);

  const fromFullEmail = useMemo(
    () => `${fromEmail}${fromDomain}`,
    [fromEmail, fromDomain],
  );

  const isFormValid =
    fromEmail.trim() && toEmail.trim() && subject.trim() && code.trim();

  useMemo(() => {
    setIsValid(Boolean(isFormValid));

    setFormData({
      from: fromFullEmail,
      subject,
      toEmail,
    });
  }, [isFormValid, fromFullEmail, subject, toEmail, setIsValid, setFormData]);

  const runPreview = () => {
    setIframeKey((k) => k + 1);
    setMode("preview");
  };

  return (
    <div className="space-y-6">
      {/* Sender & Recipient */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-5 space-y-3">
          <h3 className="font-semibold">Sender *</h3>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="From email name"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              className="flex-1 p-3 rounded-xl border"
            />
            <select
              value={fromDomain}
              onChange={(e) => setFromDomain(e.target.value)}
              className="p-3 rounded-xl border"
            >
              <option>@zlliq.com</option>
              <option>@example.com</option>
              <option>@mail.com</option>
            </select>
          </div>

          <p className="text-sm text-gray-500">
            Final sender: <b>{fromFullEmail}</b>
          </p>
        </div>

        <div className="rounded-2xl border p-5 space-y-3">
          <h3 className="font-semibold">Recipient *</h3>
          <input
            type="email"
            placeholder="Recipient email address"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            className="w-full p-3 rounded-xl border"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="rounded-2xl border p-5 space-y-3">
        <h3 className="font-semibold">Email Subject *</h3>
        <input
          type="text"
          placeholder="Email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 rounded-xl border"
        />
      </div>

      {/* Editor */}
      <div className="rounded-2xl border p-5 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Email Content *</h3>

          {mode !== "preview" ? (
            <div className="flex gap-3">
              <button onClick={() => setMode("rich")}>Rich</button>
              <button onClick={() => setMode("html")}>HTML</button>
              <button onClick={() => setMode("code")}>Code</button>
              <button
                onClick={runPreview}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                ▶ Run
              </button>
            </div>
          ) : (
            <button
              onClick={() => setMode("html")}
              className="px-3 py-1 bg-gray-600 text-white rounded"
            >
              ✕ Back
            </button>
          )}
        </div>

        <div className="border rounded-xl overflow-hidden">
          {mode === "rich" && (
            <ReactQuill
              theme="snow"
              value={code}
              onChange={setCode}
              modules={quillModules}
              formats={quillFormats}
            />
          )}

          {mode === "html" && (
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full min-h-[420px] p-4 font-mono text-sm"
            />
          )}

          {mode === "code" && (
            <pre className="bg-gray-900 text-green-200 p-4 min-h-[420px]">
              <code>{code}</code>
            </pre>
          )}

          {mode === "preview" && (
            <iframe
              key={iframeKey}
              className="w-full h-[420px] bg-white"
              srcDoc={`<html><body>${code}</body></html>`}
            />
          )}
        </div>
      </div>

      <style jsx global>{`
        .ql-container {
          min-height: 250px;
        }
        .ql-editor {
          min-height: 250px;
          font-size: 15px;
        }
      `}</style>
    </div>
  );
};

/* =========================
   TestEmailModal
========================= */
export const TestEmailModal = ({ open, onClose }: any) => {
  const dispatch = useDispatch();
  const [emailCode, setEmailCode] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleSend = () => {
    const payload = {
      email: {
        from: formData.from,
        fromName: "zlliq",
        replyTo: [],
        subject: formData.subject,
        text: "Test email",
        html: emailCode,
        recipients: {
          toList: [
            {
              name: formData.toEmail.split("@")[0],
              email: formData.toEmail,
            },
          ],
        },
        attachments: [],
      },
      metadata: {
        message_id: "test_message",
        ids: "123",
      },
    };

    toast.promise(
      dispatch(
        sendEmailDirect({
          apiUrl: "https://dev.zlliq.com/v1/send-email",
          payload,
        }) as any,
      ),
      {
        loading: "Sending test email...",
        success: "Test email sent successfully!",
        error: "Failed to send email",
      },
    );
  };

  return (
    <Popup
      isOpen={open}
      onClose={onClose}
      title="Send Test Email"
      subtitle="Edit, preview, and send test email"
      widthClass="w-[90vw] max-w-6xl"
    >
      <TestEmailContent
        code={emailCode}
        setCode={setEmailCode}
        setIsValid={setIsValid}
        setFormData={setFormData}
      />

      <div className="sticky bottom-0 mt-6 p-4 border-t flex justify-end gap-3 bg-white">
        <button onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-xl">
          Cancel
        </button>

        <button
          disabled={!isValid}
          onClick={handleSend}
          className={`px-6 py-2 rounded-xl text-white ${
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
