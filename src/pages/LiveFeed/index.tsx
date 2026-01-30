import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Info } from "lucide-react";
import { connect } from "react-redux";

import PageMeta from "../../components/common/PageMeta";
import TimeRangeDropdown from "../../components/dashboard/TimeRangeDropdown";
import MultiSelectDropdown from "../../components/dashboard/forms/MultiSelectDropdown";
import FloatingTextField from "../../components/dashboard/forms/FloatingTextField";
import PrimaryButton from "../../components/common/PrimaryButton";
import ReusableTable from "../../components/dashboard/ReusableTable";
import TablePaginationFooter from "../../components/dashboard/TablePaginationFooter";
import Popup from "../../components/common/Popup";
import PopupDetails from "./detailsContent";

import {
  getSendingDomainList,
  searchBySends,
  getSendProfileDetails,
} from "../../actions";

import {
  pageVariants,
  sectionVariants,
  tableContainerVariants,
  tableRowVariants,
  popupContentVariants,
  EVENT_OPTIONS,
  EVENT_DEPENDENT_OPTIONS,
  DEFAULT_TIME_RANGE,
  LIVE_FEED_DUMMY_DATA,
} from "./data";

const LiveFeed = ({
  getSendingDomainList,
  getSendProfileDetails,
  searchBySends,
  data,
}: any) => {
  /* ================= STATE ================= */
  console.log(data);
  const [currentRange, setCurrentRange] = useState(DEFAULT_TIME_RANGE);

  const [recipientDomain, setRecipientDomain] = useState("");
  const [clickTrackingId, setClickTrackingId] = useState("");
  const [email, setEmail] = useState("");
  const [tableData, setTableData] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [fromAddressOptions, setFromAddressOptions] = useState<any[]>([]);
  const [selectedFromAddress, setSelectedFromAddress] = useState<any[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
  const [statusTypeOptions, setStatusTypeOptions] = useState<any[]>([]);
  const [selectedStatusTypes, setSelectedStatusTypes] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  // const totalItems = 648758;
  const totalPages = Math.ceil(totalItems / pageSize);

  const [resetKey, setResetKey] = useState(0);
  const hasData = tableData.length > 0;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsData, setDetailsData] = useState<any>(null);

  /* ================= HANDLERS ================= */

  const handleRangeChange = (
    startDate: Date | null,
    endDate: Date | null,
    label: string,
  ) => {
    if (!startDate || !endDate) return;
    setCurrentRange({ startDate, endDate, label });
  };

  const handleViewDetails = async (row: any) => {
    setIsPopupOpen(true);
    setSelectedRow(row);
    setDetailsLoading(true);
    setDetailsData(null);

    try {
      const res = await getSendProfileDetails({
        user_id: 1001,
        mail_class: "testdev",
        send_id: row.raw.send_id,
        click_tracking_id: row.raw.click_tracking_id,
      });

      const api = res;
      console.log("api", api);
      if (!api) {
        setDetailsData(null);
        return;
      }

      // ✅ NORMALIZE DATA FOR UI
      const mappedDetails = {
        request_id: api.click_tracking_id, // fallback id
        message_id: api.message_id,
        date: new Date(api.sent_on).toLocaleString(),
        subject: api.subject,
        sender: api.sender_address,
        recipients: api.results || [],
      };

      setDetailsData(mappedDetails);
    } catch (err) {
      console.error("Profile details fetch failed", err);
      setDetailsData(null);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleResetFilters = () => {
    setRecipientDomain("");
    setClickTrackingId("");
    setEmail("");

    setSelectedFromAddress([]);
    setSelectedEvents([]);
    setSelectedStatusTypes([]);
    setStatusTypeOptions([]);

    setCurrentRange(DEFAULT_TIME_RANGE);
    setResetKey((k) => k + 1);
    setPage(1);
  };

  /* ================= EFFECTS ================= */

  useEffect(() => {
    getSendingDomainList()
      .then((res: any) => {
        const domains = res?.sending_domains || [];
        setFromAddressOptions(
          domains.map((d: string) => ({
            label: d,
            value: d,
          })),
        );
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (!selectedEvents.length) {
      setStatusTypeOptions([]);
      setSelectedStatusTypes([]);
      return;
    }

    const eventValues = selectedEvents.map((e) =>
      typeof e === "string" ? e : e.value,
    );

    const mergedOptions = eventValues.flatMap(
      (event) => EVENT_DEPENDENT_OPTIONS[event] || [],
    );

    const uniqueOptions = Array.from(
      new Map(mergedOptions.map((o) => [o.value, o])).values(),
    );

    setStatusTypeOptions(uniqueOptions);
  }, [selectedEvents]);

  /* ================= TABLE COLUMNS ================= */

  const columns = [
    {
      key: "fromTo",
      label: "From → To",
      minWidth: "320px",
      render: (row: any) => (
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-start mt-1 pl-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="h-5 border-l-2 border-dotted border-gray-300 dark:border-gray-600 ml-[3px]" />
            <div className="flex items-center ml-[3px] relative -top-[4px]">
              <span className="w-4 border-t-2 border-dotted border-gray-300 dark:border-gray-600" />
              <ChevronRight
                size={14}
                className="text-gray-400 dark:text-gray-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {row.from}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {row.to}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "date",
      label: "Requested Date / Time",
      render: (row: any) => (
        <span className="text-gray-800 dark:text-gray-200">{row.date}</span>
      ),
    },
    {
      key: "opens",
      label: "Opens",
      align: "center",
      render: () => (
        <span className="text-gray-400 dark:text-gray-500">--</span>
      ),
    },
    {
      key: "clicks",
      label: "Clicks",
      align: "center",
      render: () => (
        <span className="text-gray-400 dark:text-gray-500">--</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row: any) => (
        <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      minWidth: "120px",
      render: (row: any) => (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleViewDetails(row)}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            View Details
          </button>
        </div>
      ),
    },
  ];
  const buildSearchPayload = () => {
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    return {
      page_size: pageSize,
      page_no: page,

      search_email: email || "",

      events: selectedEvents.map((e) => (typeof e === "string" ? e : e.value)),

      from_date: formatDate(currentRange.startDate),
      to_date: formatDate(currentRange.endDate),

      is_amp: 0,

      tracking_id: clickTrackingId || "",
      recipient_domain: recipientDomain || "",

      sending_domain: selectedFromAddress
        .map((d) => (typeof d === "string" ? d : d.value))
        .join(","),

      status: selectedStatusTypes.map((s) =>
        typeof s === "string" ? s : s.value,
      ),

      bounce_type: selectedStatusTypes
        .filter((s) => ["h", "s", "o"].includes(s.value))
        .map((s) => s.value),
    };
  };
  const handleSearch = () => {
    searchBySends(buildSearchPayload());
  };

  const mapApiToTable = (results: any[]) => {
    console.log(results);
    return results.map((item, index) => ({
      id: `${item.click_tracking_id}-${item.event_type}-${index}`,

      // 🔑 REQUIRED for ReusableTable
      fromTo: `${item.last_from_address} → ${item.email}`,

      from: item.last_from_address,
      to: item.email,
      date: new Date(item.latest_created_at).toLocaleString(),
      status: item.last_status,
      raw: item,
    }));
  };
  useEffect(() => {
    handleSearch();
  }, [page, pageSize]);
  useEffect(() => {
    if (!data || !Array.isArray(data.Results)) {
      setTableData([]);
      setTotalItems(0);
      return;
    }

    setTableData(mapApiToTable(data.Results));
    setTotalItems(data.table_count || 0);
  }, [data]);

  /* ================= RENDER ================= */

  return (
    <>
      <PageMeta title="Live Feed | Dashboard" />

      <AnimatePresence mode="wait">
        <motion.div
          key="livefeed"
          className="grid grid-cols-1 gap-6 md:gap-8 my-6"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* ================= FILTERS ================= */}
          <motion.div
            variants={sectionVariants}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <TimeRangeDropdown
                key={`timerange-${resetKey}`}
                onRangeChange={handleRangeChange}
              />

              <MultiSelectDropdown
                key={`from-${resetKey}`}
                placeholder="From Address"
                options={fromAddressOptions}
                value={selectedFromAddress}
                onChange={setSelectedFromAddress}
              />

              <FloatingTextField
                label="Recipient Domain"
                value={recipientDomain}
                onChange={setRecipientDomain}
              />

              <MultiSelectDropdown
                key={`events-${resetKey}`}
                placeholder="Select Events"
                options={EVENT_OPTIONS}
                value={selectedEvents}
                onChange={setSelectedEvents}
              />
              <FloatingTextField
                label="From Email"
                value={email}
                onChange={setEmail}
              />

              <FloatingTextField
                label="Click Tracking ID"
                value={clickTrackingId}
                onChange={setClickTrackingId}
              />

              {statusTypeOptions.length > 0 && (
                <MultiSelectDropdown
                  key={`status-${resetKey}`}
                  placeholder="Status / Type"
                  options={statusTypeOptions}
                  value={selectedStatusTypes}
                  onChange={setSelectedStatusTypes}
                />
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 px-2">
              <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                <Info className="mr-2 h-4 w-4" />
                Emails sent in last 60 days are shown below.
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleResetFilters}
                  className="border px-4 py-2 rounded-md"
                >
                  Reset
                </button>
                <PrimaryButton
                  label="Search"
                  onClick={() => {
                    setPage(1); // 🔑 reset page
                    handleSearch();
                  }}
                />
              </div>
            </div>
          </motion.div>
          <AnimatePresence>
            {!hasData && (
              <motion.div
                key="no-data"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-2xl"
              >
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl mb-4">📭</div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    No data found
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
                    Try adjusting your filters or selecting a different date
                    range to see email activity.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {hasData && (
            <motion.div
              variants={tableContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <ReusableTable
                columns={columns}
                data={tableData}
                rowClassName="group bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                rowWrapper={(row, children) => (
                  <motion.tr
                    variants={tableRowVariants}
                    whileHover={{
                      y: -2,
                      boxShadow: "0 10px 28px rgba(0,0,0,0.15)",
                    }}
                  >
                    {children}
                  </motion.tr>
                )}
              />
            </motion.div>
          )}

          {hasData && (
            <motion.div
              variants={sectionVariants}
              className="rounded-xl bg-gray-50 dark:bg-gray-800/60 p-3 border"
            >
              <TablePaginationFooter
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setPage(1);
                }}
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ================= POPUP ================= */}
      <AnimatePresence>
        {selectedRow && isPopupOpen && (
          <Popup
            title="Email details"
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            widthClass="w-full max-w-6xl"
          >
            <motion.div
              variants={popupContentVariants}
              initial="hidden"
              animate="visible"
            >
              <PopupDetails
                rowData={detailsData}
                loading={detailsLoading}
                onClose={() => setIsPopupOpen(false)}
              />
            </motion.div>
          </Popup>
        )}
      </AnimatePresence>
    </>
  );
};

/* ================= REDUX ================= */
const mapStateToProps = (state: any) => ({
  data: state.smtpReducer.data,
});

const mapDispatchToProps = (dispatch: any) => ({
  getSendingDomainList: (payload: any) =>
    dispatch(getSendingDomainList(payload)),
  searchBySends: (payload: any) => dispatch(searchBySends(payload)),
  getSendProfileDetails: (payload: any) =>
    dispatch(getSendProfileDetails(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveFeed);
