import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// ===================================================
// 1. DATA DEFINITIONS
// ===================================================

// Define the X-axis categories (estimated 23 time points)
const DEFAULT_CATEGORIES: string[] = [
  "Day 1",
  "Day 2",
  "Day 3",
  "Day 4",
  "Day 5",
  "Day 6",
  "Day 7",
  "Day 8",
  "Day 9",
  "Day 10",
  "Day 11",
  "Day 12",
  "Day 13",
  "Day 14",
  "Day 15",
  "Day 16",
  "Day 17",
  "Day 18",
  "Day 19",
  "Day 20",
  "Day 21",
  "Day 22",
  "Day 23",
];

// Define the custom colors extracted from the Highcharts SVG
const seriesColors: string[] = [
  "#5EB389", // Submitted
  "#57B657", // Delivered
  "#626ED6", // Opened (Custom Color for visibility)
  "#4CAF50", // Clicked (Custom Color for visibility)
  "#E29F51", // Unsubscribed
  "#9C27B0", // Bounced (Custom Color for visibility)
  "#FF6566", // Complaints
];

// Define the series data structure
interface ChartSeries {
  name: string;
  data: number[];
  enabled?: boolean;
}

// Define the complete series data with initial filtering (enabled: false for hidden)
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

  // Hidden on load based on SVG's 'highcharts-legend-item-hidden'
  {
    name: "Opened",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    enabled: false,
  },
  {
    name: "Clicked",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    enabled: false,
  },

  {
    name: "Unsubscribed",
    data: [1, 2, 0, 1, 0, 0, 0, 1, 2, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    enabled: true,
  },

  // Hidden on load
  {
    name: "Bounced",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    enabled: false,
  },

  {
    name: "Complaints",
    data: [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    enabled: true,
  },
];

// ===================================================
// 2. COMPONENT INTERFACE & DEFINITION
// ===================================================

interface VolumeReportChartProps {
  series?: ChartSeries[];
  categories?: string[];
  title?: string;
}

const VolumeReportChart: React.FC<VolumeReportChartProps> = ({
  series = allSeriesData,
  // 💡 FIX: Renaming the local variable to avoid the 'ReferenceError'
  categories: chartCategories = DEFAULT_CATEGORIES,
  title = "Volume Report",
}) => {
  // 3. ApexCharts Configuration Options
  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 400,
      fontFamily: "inherit",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: seriesColors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 4,
      hover: {
        sizeOffset: 3,
      },
      strokeColors: "#fff",
    },
    title: {
      text: title,
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#333",
      },
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
      padding: {
        left: 0,
        right: 0,
      },
    },
    xaxis: {
      // Use the renamed prop variable here
      categories: chartCategories,
      title: {
        text: "Time Point",
      },
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Count",
        style: {
          fontSize: "14px",
          color: "#656575",
        },
      },
      min: 0,
    },
    tooltip: {
      x: {
        show: false,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontWeight: "500",
      fontFamily: "inherit",
    },
  };

  return (
    <div className="chart-container">
           {" "}
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={400}
      />
         {" "}
    </div>
  );
};

export default VolumeReportChart;
