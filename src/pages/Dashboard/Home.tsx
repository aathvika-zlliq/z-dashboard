import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import EmailStatusCard from "../../components/dashboard/EmailStatusCard";
import StatSummaryCard from "../../components/dashboard/StatusSummaryCard";
import TimeRangeDropdown from "../../components/dashboard/TimeRangeDropdown";
import { useState } from "react";
import { subWeeks } from "date-fns";
import VolumeReportChart from "../../layout/VolumeChartReport";

export default function Home() {
  const [currentRange, setCurrentRange] = useState({
    startDate: subWeeks(new Date(), 1), // Initial default (Last week)
    endDate: new Date(),
    label: "Last week",
  });
  const mockCategories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const mockSeries: ChartSeries[] = [
    {
      name: "Series A", // Green-like line
      data: [110, 115, 105, 120, 15, 95, 125, 100, 118, 110, 105, 112], // Notice the sharp dip (15) to mimic the SVG's structure
    },
    {
      name: "Series B", // Darker Green line
      data: [120, 122, 110, 130, 8, 100, 135, 105, 125, 115, 110, 118], // Sharp dip (8) to match the other SVG dip
    },
    {
      name: "Series C", // Blue/Purple line
      data: [120, 120, 120, 120, 70, 80, 85, 90, 100, 105, 110, 115], // Gradual dip (70-80) to match the last SVG dip
    },
  ];
  // Handler function passed to the dropdown
  const handleRangeChange = (
    startDate: Date | null,
    endDate: Date | null,
    label: string
  ) => {
    if (!startDate || !endDate) {
      console.log("Range cleared");
      return;
    }

    console.log("Selected Range:", startDate, endDate, label);
  };

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      {/* ================= TOP ROW ================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {/* Keep same width as before */}
        <div className="md:col-span-12 flex justify-end ">
          <TimeRangeDropdown align="right" onRangeChange={handleRangeChange} />
        </div>
        <div className="md:col-span-5">
          <EmailStatusCard
            title="Email Status"
            statuses={[
              { label: "In Progress", value: 234 },
              { label: "Suppressed", value: 89 },
              { label: "Scheduled", value: 156 },
            ]}
          />
        </div>

        {/* Expand this one to fill rest */}
        <div className="md:col-span-7">
          <EcommerceMetrics />
        </div>
      </div>

      {/* ================= STATS SUMMARY ROW ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-12 gap-4 md:gap-6 my-4">
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

      {/* ================= CHARTS & DETAILS ================= */}
      <div className="mt-6">
        <VolumeReportChart />
      </div>
    </>
  );
}
