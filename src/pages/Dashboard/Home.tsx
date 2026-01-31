import EcommerceMetrics from "../../components/ecommerce/EmailMetrics";
import DemoImage from "../../assets/images/common/cc.png.png";
import PageMeta from "../../components/common/PageMeta";
import EmailStatusCard from "../../components/dashboard/EmailStatusCard";
import StatSummaryCard from "../../components/dashboard/StatusSummaryCard";
import TimeRangeDropdown from "../../components/dashboard/TimeRangeDropdown";
import { useEffect, useState } from "react";
import { subWeeks } from "date-fns";
import VolumeReportChart from "../../layout/VolumeChartReport";
import { Ban, CalendarClock, Clock, Mail } from "lucide-react";
import TipBox from "../../components/common/TipBox";
import DemoSection from "../../components/common/DemoSection";
import ContactUsSection from "../../components/common/ContactSecton";
import { TestEmailModal } from "./ModalContent";
import { connect } from "react-redux";
import { getDashboardStatistics } from "../../actions";
import EmailMetrics from "../../components/ecommerce/EmailMetrics";

const getISTGreeting = (firstName?: string) => {
  const now = new Date();
  const istHour =
    (now.getUTCHours() + 5 + Math.floor((30 + now.getUTCMinutes()) / 60)) % 24;

  const name = firstName || "there"; // 👈 safe fallback

  if (istHour < 12) return `Good Morning ${name}`;
  if (istHour < 18) return `Good Afternoon ${name}`;
  return `Good Evening ${name}`;
};

const sectionSpacing = "my-4 md:my-5 lg:my-6";

function Home({
  dashboardStatistics,
  loading,
  details,
  userDetails,
  getDashboardStatistics,
}) {
  console.log(userDetails.first_name);
  const [currentRange, setCurrentRange] = useState({
    startDate: subWeeks(new Date(), 1),
    endDate: new Date(),
    label: "Last week",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleRangeChange = (
    startDate: Date | null,
    endDate: Date | null,
    label: string,
  ) => {
    if (!startDate || !endDate) return;
    setCurrentRange({ startDate, endDate, label });

    getDashboardStatistics({
      user_id: "Wu2iLLTOHx",
      from: startDate.toISOString().split("T")[0],
      to: endDate.toISOString().split("T")[0],
      ranges: 1,
    }).catch(console.error);
  };

  useEffect(() => {
    // Initial API call
    getDashboardStatistics({
      user_id: "Wu2iLLTOHx",
      from: currentRange.startDate.toISOString().split("T")[0],
      to: currentRange.endDate.toISOString().split("T")[0],
      ranges: 1,
    })
      .then((res) => console.log(res))
      .catch(console.error);
  }, []);

  // Map API response to StatSummaryCard format
  const summaryCards = [
    {
      title: "Email Engagement",
      stats: [
        {
          label: "Opened",
          value: dashboardStatistics?.opened || 0,
          percentage: dashboardStatistics?.opened_percentage ?? 0,
          color: "#3b82f6",
        },
        {
          label: "AMP",
          value: dashboardStatistics?.total_opens || 0,
          percentage: dashboardStatistics?.total_amp_open_percentage ?? 0,
          color: "#60a5fa",
        },
      ],
    },
    {
      title: "Email Clicks",
      stats: [
        {
          label: "Clicked",
          value: dashboardStatistics?.total_clicks || 0,
          percentage: dashboardStatistics?.total_click_percentage ?? 0,
          color: "#10b981",
        },
        {
          label: "Unique",
          value: dashboardStatistics?.unique_clicks || 0,
          percentage: dashboardStatistics?.unique_click_percentage ?? 0,
          color: "#34d399",
        },
      ],
    },
    {
      title: "Bounces",
      stats: [
        {
          label: "Total",
          value: dashboardStatistics?.bounced || 0,
          percentage: dashboardStatistics?.total_bounce_percent ?? 0,
          color: "#ef4444",
        },
      ],
    },
    {
      title: "Unsubscribes",
      stats: [
        {
          label: "Total",
          value: dashboardStatistics?.unsubscribed || 0,
          percentage: dashboardStatistics?.unsubscribed_percent ?? 0,
          color: "#f59e0b",
        },
      ],
    },
    {
      title: "Complaints",
      stats: [
        {
          label: "Reported",
          value: dashboardStatistics?.complaints || 0,
          percentage: dashboardStatistics?.complaint_percentage ?? 0,
          color: "#8b5cf6",
        },
      ],
    },
  ];

  // Map API response to EmailStatusCard format
  const emailStatuses = [
    {
      label: "In Progress",
      value: dashboardStatistics?.in_progress || 0,
      icon: <Clock className="w-12 h-12 text-blue-200" />,
      color: "#3b82f6",
    },
    {
      label: "Suppressed",
      value: dashboardStatistics?.suppressed || 0,
      icon: <Ban className="w-12 h-12 text-red-200" />,
      color: "#ef4444",
    },
    {
      label: "Scheduled",
      value: dashboardStatistics?.scheduled || 0,
      icon: <CalendarClock className="w-12 h-12 text-green-200" />,
      color: "#10b981",
    },
  ];

  return (
    <>
      <PageMeta
        title="Dashboard | Zlliq"
        description="React.js Ecommerce Dashboard page"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= TOP ROW ================= */}
        <div
          className={`${sectionSpacing} grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 items-center`}
        >
          <div className="md:col-span-12 flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <h1 className="text-3xl md:text-3xl font-normal text-gray-900 dark:text-gray-100">
              {getISTGreeting(userDetails?.first_name)}
            </h1>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
              >
                <Mail className="w-5 h-5" />
                <span>Test Email</span>
              </button>

              <TimeRangeDropdown
                align="right"
                onRangeChange={handleRangeChange}
              />
            </div>
          </div>

          <div className="md:col-span-12">
            <EmailMetrics statistics={dashboardStatistics} />
          </div>
        </div>

        {/* ================= STATS SUMMARY ================= */}
        <div
          className={`${sectionSpacing} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`}
        >
          {summaryCards.map((card, i) => (
            <StatSummaryCard key={i} title={card.title} stats={card.stats} />
          ))}
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
            statuses={emailStatuses}
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

      <TestEmailModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

const mapStateToProps = (state: any) => ({
  dashboardStatistics: state.dashboardReducer.statistics,
  loading: state.dashboardReducer.loading,
  details: state.userDetailsReducer.details,
  userDetails: state.userDetailsReducer.details,
});

const mapDispatchToProps = (dispatch: any) => ({
  getDashboardStatistics: (payload: any) =>
    dispatch(getDashboardStatistics(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
