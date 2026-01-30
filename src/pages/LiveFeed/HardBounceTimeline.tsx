import {
  Calendar,
  Inbox,
  Send,
  RefreshCw,
  CheckCircle,
  Eye,
  MousePointerClick,
  UserMinus,
  AlertTriangle,
  Ban,
  XCircle,
} from "lucide-react";

interface TimelineItem {
  label: string;
  icon: any;
  color: string;
  badge?: string;
  reasons?: string[];
}

const timeline: TimelineItem[] = [
  { label: "Scheduled", icon: Calendar, color: "text-gray-400" },
  { label: "Submitted", icon: Inbox, color: "text-blue-500" },
  { label: "Sent", icon: Send, color: "text-blue-500" },

  {
    label: "Delivery Attempt",
    icon: RefreshCw,
    color: "text-orange-500",
    badge: "Conn Timeout",
  },
  {
    label: "Delivery Attempt",
    icon: CheckCircle,
    color: "text-green-500",
    badge: "Success",
  },

  { label: "Delivered", icon: CheckCircle, color: "text-green-500" },
  { label: "Opened", icon: Eye, color: "text-orange-500" },
  { label: "Clicked", icon: MousePointerClick, color: "text-blue-500" },
  { label: "Unsubscribed", icon: UserMinus, color: "text-gray-500" },
  { label: "Spam Complaint", icon: AlertTriangle, color: "text-red-500" },

  {
    label: "Bounced",
    icon: Ban,
    color: "text-red-500",
    badge: "Hard Bounce",
  },
  {
    label: "Failed",
    icon: XCircle,
    color: "text-red-600",
    badge: "Suppressed",
    reasons: ["Previous Hard Bounce", "Spam Complaint", "Manual Block"],
  },
];

const HardBounceTimeline = () => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600" />

      <div className="space-y-6">
        {timeline.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index} className="flex gap-4">
              {/* Icon column */}
              <div className="relative w-8 flex justify-center">
                <div className="z-10 bg-white dark:bg-gray-800 rounded-full p-1">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col text-sm pt-0.5">
                <div className="flex items-center gap-2 font-semibold">
                  {item.label}

                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        item.color.includes("green")
                          ? "bg-green-100 text-green-700"
                          : item.color.includes("orange")
                            ? "bg-orange-100 text-orange-700"
                            : item.color.includes("red")
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                {item.reasons && (
                  <ul className="mt-1 ml-4 list-disc text-gray-600 dark:text-gray-400">
                    {item.reasons.map((reason, i) => (
                      <li key={i}>{reason}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HardBounceTimeline;
