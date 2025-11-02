import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import DemoImage from "../../assets/images/common/cc.png.png";
import PageMeta from "../../components/common/PageMeta";
import EmailStatusCard from "../../components/dashboard/EmailStatusCard";
import StatSummaryCard from "../../components/dashboard/StatusSummaryCard";
import TimeRangeDropdown from "../../components/dashboard/TimeRangeDropdown";
import { useState } from "react";
import { subWeeks } from "date-fns";
import VolumeReportChart from "../../layout/VolumeChartReport";
import { Ban, CalendarClock, Clock } from "lucide-react";
import TipBox from "../../components/common/TipBox";
import DemoSection from "../../components/common/DemoSection";
import ContactUsSection from "../../components/common/ContactSecton";

// 🧩 Unified reduced spacing (tighter vertical rhythm)
const sectionSpacing = "my-4 md:my-5 lg:my-6";

export default function Home() {
  const [currentRange, setCurrentRange] = useState({
    startDate: subWeeks(new Date(), 1),
    endDate: new Date(),
    label: "Last week",
  });

  const handleRangeChange = (
    startDate: Date | null,
    endDate: Date | null,
    label: string
  ) => {
    if (!startDate || !endDate) return;
    console.log("Selected Range:", startDate, endDate, label);
  };

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= TOP ROW ================= */}
        <div
          className={`${sectionSpacing} grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5`}
        >
          <div className="md:col-span-12 flex justify-end">
            <TimeRangeDropdown
              align="right"
              onRangeChange={handleRangeChange}
            />
          </div>

          <div className="md:col-span-12">
            <EcommerceMetrics />
          </div>
        </div>

        {/* ================= STATS SUMMARY ================= */}
        <div
          className={`${sectionSpacing} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-12 gap-4 md:gap-5`}
        >
          <div className="xl:col-span-3">
            <StatSummaryCard
              title="Email Engagement"
              stats={[
                { label: "Opened", value: 2439387, color: "#3b82f6" },
                { label: "AMP", value: 0, color: "#60a5fa" },
              ]}
            />
          </div>

          <div className="xl:col-span-3">
            <StatSummaryCard
              title="Email Clicks"
              stats={[
                { label: "Clicked", value: 120938, color: "#10b981" },
                { label: "Unique", value: 87321, color: "#34d399" },
              ]}
            />
          </div>

          <div className="xl:col-span-2">
            <StatSummaryCard
              title="Bounces"
              stats={[{ label: "Total", value: 3200, color: "#ef4444" }]}
            />
          </div>

          <div className="xl:col-span-2">
            <StatSummaryCard
              title="Unsubscribes"
              stats={[{ label: "Total", value: 560, color: "#f59e0b" }]}
            />
          </div>

          <div className="xl:col-span-2">
            <StatSummaryCard
              title="Complaints"
              stats={[{ label: "Reported", value: 210, color: "#8b5cf6" }]}
            />
          </div>
        </div>

        {/* ================= TIPS ================= */}
        <div
          className={`${sectionSpacing} grid grid-cols-1 sm:grid-cols-2 gap-4`}
        >
          <TipBox
            message="Split your mailing list into batches before you send out your campaign. This improves your deliverability rate."
            linkUrl="https://example.com/learn-more"
          />
          <TipBox
            message="Use verified domains to ensure your emails reach inboxes instead of spam folders."
            linkUrl="https://example.com/domain-tips"
          />
        </div>

        {/* ================= EMAIL STATUS ================= */}
        <div className={`${sectionSpacing}`}>
          <EmailStatusCard
            title="Email Performance Overview"
            statuses={[
              {
                label: "In Progress",
                value: 234,
                icon: <Clock className="w-12 h-12 text-blue-200" />,
                color: "#3b82f6",
              },
              {
                label: "Suppressed",
                value: 89,
                icon: <Ban className="w-12 h-12 text-red-200" />,
                color: "#ef4444",
              },
              {
                label: "Scheduled",
                value: 156,
                icon: <CalendarClock className="w-12 h-12 text-green-200" />,
                color: "#10b981",
              },
            ]}
          />
        </div>

        {/* ================= CHART ================= */}
        <div className={`${sectionSpacing} mt-4`}>
          <VolumeReportChart />
        </div>

        {/* ================= DEMO SECTION ================= */}
        <div className={`${sectionSpacing}`}>
          <DemoSection
            title="Get a Personalised Demo"
            description="Connect with one of our experts to learn about our platform’s features and discover how we can help your business grow."
            buttonText="Schedule a Demo"
            image={DemoImage}
          />
        </div>

        {/* ================= CONTACT SECTION ================= */}
        <div className={`${sectionSpacing}`}>
          <ContactUsSection
            address="123, Zlliq Tech Park, Coimbatore, Tamil Nadu, India"
            email="support@zlliq.com"
            phone="+91 98765 43210"
          />
        </div>
      </div>
    </>
  );
}
