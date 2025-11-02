import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

const DEFAULT_CATEGORIES: string[] = Array.from(
  { length: 23 },
  (_, i) => `Day ${i + 1}`
);

const seriesColors: string[] = [
  "#5EB389",
  "#57B657",
  "#626ED6",
  "#4CAF50",
  "#E29F51",
  "#9C27B0",
  "#FF6566",
];

interface ChartSeries {
  name: string;
  data: number[];
  enabled?: boolean;
}

const allSeriesData: ChartSeries[] = [
  {
    name: "Submitted",
    data: [
      100, 99, 100, 99, 65, 95, 90, 99, 10, 5, 95, 96, 99, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100,
    ],
    enabled: true,
  },
  {
    name: "Delivered",
    data: [
      100, 99, 100, 99, 66, 96, 90, 99, 15, 0, 97, 98, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100,
    ],
    enabled: true,
  },
  { name: "Opened", data: Array(23).fill(0), enabled: false },
  { name: "Clicked", data: Array(23).fill(0), enabled: false },
  {
    name: "Unsubscribed",
    data: [1, 2, 0, 1, 0, 0, 0, 1, 2, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    enabled: true,
  },
  { name: "Bounced", data: Array(23).fill(0), enabled: false },
  {
    name: "Complaints",
    data: [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    enabled: true,
  },
];

interface VolumeReportChartProps {
  series?: ChartSeries[];
  categories?: string[];
  title?: string;
}

const VolumeReportChart: React.FC<VolumeReportChartProps> = ({
  series = allSeriesData,
  categories: chartCategories = DEFAULT_CATEGORIES,
  title = "Volume Report",
}) => {
  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 400,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Inter, sans-serif",
    },
    colors: seriesColors,
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2.5 },
    markers: {
      size: 4,
      hover: { sizeOffset: 3 },
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.05)",
      strokeDashArray: 3,
      padding: { left: 10, right: 10 },
    },
    xaxis: {
      categories: chartCategories,
      labels: { style: { fontSize: "12px", colors: "#6b7280" } },
      axisBorder: { show: false },
    },
    yaxis: {
      title: {
        text: "Count",
        style: { fontSize: "13px", color: "#6b7280" },
      },
      labels: { style: { colors: "#6b7280" } },
      min: 0,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "13px",
      fontWeight: 500,
      labels: { colors: "#6b7280" },
      itemMargin: { horizontal: 10, vertical: 5 },
    },
    tooltip: {
      theme: "light",
      style: { fontSize: "13px" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-full rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-md hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,_#e5e7eb_1px,_transparent_1px)] [background-size:36px_36px] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)]"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <BarChart3 className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          </motion.div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h2>
        </div>
      </motion.div>

      {/* Chart */}
      <div className="relative">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={400}
        />
      </div>
    </motion.div>
  );
};

export default VolumeReportChart;
