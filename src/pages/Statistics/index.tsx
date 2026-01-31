import { useState, useEffect } from "react";
import { subWeeks } from "date-fns";
import { motion } from "framer-motion";
import PageMeta from "../../components/common/PageMeta";
import TimeRangeDropdown from "../../components/dashboard/TimeRangeDropdown";
import PrimaryButton from "../../components/common/PrimaryButton";
import TablePaginationFooter from "../../components/dashboard/TablePaginationFooter";
import TooltipCell from "./TooltipCell";
import StatisticsTable from "./StatisticsTable";
import { connect } from "react-redux";
import { getListOfCampaigns } from "../../actions/dashboardActions.js";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const Statistics = ({ getListOfCampaigns, user }: any) => {
  const DEFAULT_TIME_RANGE = {
    startDate: subWeeks(new Date(), 1),
    endDate: new Date(),
    label: "Last week",
  };

  const [range, setRange] = useState(DEFAULT_TIME_RANGE);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const hasData = data.length > 0;

  const format = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;

  const columns = [
    { key: "date", label: "Date", render: (r: any) => r.date },
    {
      key: "campaignId",
      label: "Campaign ID",
      render: (r: any) => r.campaignId,
    },
    { key: "sent", label: "Sent", align: "center", render: (r: any) => r.sent },
    {
      key: "delivered",
      label: "Delivered",
      align: "center",
      render: (r: any) => r.delivered,
    },
    { key: "open", label: "Open", align: "center", render: (r: any) => r.open },
    {
      key: "click",
      label: "Click",
      align: "center",
      render: (r: any) => r.click,
    },
    {
      key: "bounce",
      label: "Bounce",
      align: "center",
      render: (r: any) => r.bounce,
    },
  ];

  const fetchData = () => {
    setLoading(true);

    getListOfCampaigns({
      mail_class: user.mail_class,
      payload: {
        page_no: page,
        page_size: pageSize,
        from_date: format(range.startDate),
        to_date: format(range.endDate),
      },
    })
      .then((res: any) => {
        const rows = Object.values(res || {}).map((item: any, i) => {
          const { stats, percentageStat } = item;
          return {
            id: `${stats.send_id}-${i}`,
            date: stats.send_date,
            campaignId: stats.send_id,
            sent: stats.submitted_count,
            delivered:
              stats.delivered_count ??
              stats.submitted_count - stats.bounce_count,
            open: (
              <TooltipCell
                label="Open"
                value={stats.opened_count}
                tooltipData={{
                  "Unique Opens": stats.unique_open,
                  "Open %": `${percentageStat.unique_open_percentage}%`,
                }}
              />
            ),
            click: (
              <TooltipCell
                label="Click"
                value={stats.click_count}
                tooltipData={{
                  "Unique Clicks": stats.unique_click,
                  "Click %": `${percentageStat.unique_click_percentage}%`,
                }}
              />
            ),
            bounce: (
              <TooltipCell
                label="Bounce"
                value={stats.bounce_count}
                tooltipData={stats.bounce_details || {}}
              />
            ),
          };
        });

        setData(rows);
        setTotal(res?.total_count || rows.length);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, range]);

  return (
    <>
      <PageMeta title="Campaign Statistics" />

      <div className="my-6 grid gap-6">
        {/* Filters */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-900 border rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div className="flex flex-wrap justify-between gap-4">
            <TimeRangeDropdown
              onRangeChange={(s, e, l) =>
                s && e && setRange({ startDate: s, endDate: e, label: l })
              }
            />

            <PrimaryButton label="Search" onClick={fetchData} />
          </div>
        </motion.div>

        {/* Table */}
        <StatisticsTable columns={columns} data={data} loading={loading} />

        {/* Pagination */}
        {hasData && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3"
          >
            <TablePaginationFooter
              currentPage={page}
              totalPages={Math.ceil(total / pageSize)}
              totalItems={total}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setPage(1);
              }}
            />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default connect((s: any) => ({ user: s.settingsReducer.user }), {
  getListOfCampaigns,
})(Statistics);
