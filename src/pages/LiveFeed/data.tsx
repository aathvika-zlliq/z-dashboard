// liveFeed.constants.ts
import { subWeeks } from "date-fns";

/* ================= ANIMATION VARIANTS ================= */

export const pageVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const sectionVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const tableContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const tableRowVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export const popupContentVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ================= FILTER OPTIONS ================= */

export const EVENT_OPTIONS = [
  { label: "Sent", value: "sent" },
  { label: "Delivery", value: "delivery" },
  { label: "Opened", value: "opened" },
  { label: "Clicked", value: "clicked" },
  { label: "Submitted", value: "submitted" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Failed", value: "failed" },
  { label: "Bounce", value: "bounce" },
  { label: "Unsubscribed", value: "unsubscribed" },
  { label: "Spam & Complaints", value: "spam" },
];

export const EVENT_DEPENDENT_OPTIONS: Record<string, any[]> = {
  delivery: [
    { label: "Success", value: "success" },
    { label: "Deferral", value: "deferral" },
    { label: "Failure", value: "failure" },
    { label: "Failure Too Long", value: "failure_too_long" },
    { label: "Conn Max out", value: "connmaxout" },
  ],
  bounce: [
    { label: "Hard Bounce", value: "hard" },
    { label: "Soft Bounce", value: "soft" },
    { label: "Others", value: "others" },
  ],
  opened: [{ label: "AMP", value: "amp" }],
  clicked: [{ label: "AMP", value: "amp" }],
};

/* ================= DEFAULT VALUES ================= */

export const DEFAULT_TIME_RANGE = {
  startDate: subWeeks(new Date(), 1),
  endDate: new Date(),
  label: "Last week",
};
