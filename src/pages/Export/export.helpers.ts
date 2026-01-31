// Export/export.helpers.ts

export const formatDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

export const buildPayload = ({
  page,
  pageSize,
  selectedColumns,
  selectedEvents,
  selectedStatusTypes,
  currentRange,
  user_id,
  mail_class,
}: any) => ({
  page_no: page,
  page_size: pageSize,

  check_box_data: selectedColumns,

  events: selectedEvents.map((e: any) => (typeof e === "string" ? e : e.value)),

  status: selectedStatusTypes.map((s: any) =>
    typeof s === "string" ? s : s.value,
  ),

  bounce_type: selectedStatusTypes
    .filter((s: any) => ["h", "s", "o"].includes(s.value))
    .map((s: any) => s.value),

  duration: "date",
  from_date: formatDate(currentRange.startDate),
  to_date: formatDate(currentRange.endDate),

  // ✅ USER CONTEXT (DYNAMIC)
  user_id,
  mail_class,
});

export const mapExportRows = (logs: any[] = []) =>
  logs.map((log) => ({
    email: log.email || "--",
    sending_domain: log.sending_domain || "--",
    sender: log.from_address || "--",
    event_type: log.event_type || "--",
    status: log.status || "--",
    bounce_type: log.bounce_type || "--",
    subject: log.subject || "--",
    click_tracking_id: log.click_tracking_id || "--",
    created_at: log.created_at
      ? new Date(log.created_at).toLocaleString()
      : "--",
    source: log.source || "--",
  }));
