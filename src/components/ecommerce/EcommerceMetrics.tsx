import React from "react";
import { Mail, MailCheck, CheckCircle } from "lucide-react"; // from lucide-react
import MetricCard from "../dashboard/MetricCard";

const EmailMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-3 md:gap-6 w-full">
      <MetricCard
        title="Emails Submitted"
        value="8,452"
        icon={Mail}
        trend="up"
        percentage="12.3%"
        badgeColor="success"
      />
      <MetricCard
        title="Emails Sent"
        value="7,980"
        icon={MailCheck} // ✅ Mail + Tick Icon
        trend="down"
        percentage="4.8%"
        badgeColor="error"
      />
      <MetricCard
        title="Emails Delivered"
        value="7,720"
        icon={CheckCircle}
        trend="up"
        percentage="8.1%"
        badgeColor="success"
      />
    </div>
  );
};

export default EmailMetrics;
