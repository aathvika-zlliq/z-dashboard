// Export/export.config.ts

export const columnOptions = [
  { key: "email", label: "Email ID", default: true },
  { key: "sending_domain", label: "Sending Domain", default: true },
  { key: "sender", label: "From Address", default: true },
  { key: "event_type", label: "Event", default: true },
  { key: "status", label: "Status", default: true },
  { key: "bounce_type", label: "Bounce Type", default: false },
  { key: "subject", label: "Subject", default: false },
  { key: "click_tracking_id", label: "Click Tracking ID", default: false },
  { key: "created_at", label: "Created At", default: false },
  { key: "source", label: "Source", default: false },
];

export const DEFAULT_PAGE_SIZE = 25;
