import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { subWeeks } from "date-fns";
import { Info, MoreHorizontal } from "lucide-react";
import TimeRangeDropdown from "../../components/dashboard/TimeRangeDropdown";
import PageMeta from "../../components/common/PageMeta";
import PrimaryButton from "../../components/common/PrimaryButton";
import TablePaginationFooter from "../../components/dashboard/TablePaginationFooter";
import { connect } from "react-redux";
import { getListOfCampaigns } from "../../actions/dashboardActions.js";
import { motion, AnimatePresence } from "framer-motion";

const tableBodyVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -8 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -8 },
};

/* ==========================================================
   ✅ TooltipCell (Persistent + Top Center)
   ========================================================== */
const TooltipCell = ({ label, value, tooltipData }: any) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLSpanElement | null>(null);

  const updatePosition = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setCoords({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
    }
  };

  const handleMouseEnter = () => {
    updatePosition();
    setShowTooltip(true);
  };
  const handleMouseLeave = (e: React.MouseEvent) => {
    const related = e.relatedTarget as HTMLElement;
    if (!related?.closest(".global-tooltip")) {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    const move = () => showTooltip && updatePosition();
    window.addEventListener("scroll", move, true);
    window.addEventListener("resize", move);
    return () => {
      window.removeEventListener("scroll", move, true);
      window.removeEventListener("resize", move);
    };
  }, [showTooltip]);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer text-[#0042E4] hover:text-[#002fa1] font-medium relative"
      >
        {value}
      </span>

      {showTooltip &&
        createPortal(
          <div
            className="global-tooltip fixed z-[999999] w-80 bg-white dark:bg-gray-900 
                       border border-gray-200 dark:border-gray-700 
                       shadow-2xl rounded-xl p-4 text-sm transition-all duration-200 ease-out"
            style={{
              left: `${coords.x}px`,
              top: `${coords.y}px`,
              transform: "translate(-50%, -100%)",
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center text-base">
              {label} Details
            </h3>
            <ul className="space-y-1">
              {Object.entries(tooltipData).map(([key, val]) => (
                <li
                  key={key}
                  className="flex justify-between text-gray-700 dark:text-gray-300 text-sm"
                >
                  <span>{key}</span>
                  <span className="font-medium">{val}</span>
                </li>
              ))}
            </ul>
          </div>,
          document.body,
        )}
    </>
  );
};

/* ==========================================================
   🎛️ ColumnFilterMenu (Scroll Disabled But Scrollbar Visible)
   ========================================================== */
const ColumnFilterMenu = ({
  columns,
  visibleColumns,
  onApply,
  onReset,
}: any) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(visibleColumns);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const updatePosition = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setCoords({
        x: rect.left - 200,
        y: rect.bottom + 8,
      });
    }
  };

  const handleOpen = () => {
    updatePosition();
    setOpen((prev) => !prev);
  };

  const handleToggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key],
    );
  };

  const handleApply = () => {
    onApply(selected);
    setOpen(false);
  };

  const handleReset = () => {
    setSelected(columns.map((c: any) => c.key)); // 🔑 reset local state
    onReset();
    setOpen(false);
  };

  useEffect(() => {
    setSelected(visibleColumns);
  }, [visibleColumns]);

  /* 🧠 Smooth Scroll Disable (Keep Scrollbar Visible) */
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll"; // scrollbar stays visible
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      document.body.style.pointerEvents = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [open]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.querySelector(".global-filter-menu");
      if (
        open &&
        menu &&
        !menu.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
      >
        <MoreHorizontal className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
      <AnimatePresence>
        {open &&
          createPortal(
            <motion.div
              className="global-filter-menu fixed z-[999999] bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl w-64 p-4 text-sm"
              style={{
                left: `${coords.x}px`,
                top: `${coords.y}px`,
              }}
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} // 🔑 VERY IMPORTANT
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 text-center">
                Column Filter
              </h3>

              <div className="max-h-48 overflow-y-auto space-y-2 px-1">
                {columns.map((col: any) => (
                  <label
                    key={col.key}
                    className="flex items-center space-x-2 text-[15px] text-gray-800 dark:text-gray-200"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(col.key)}
                      onChange={() => handleToggle(col.key)}
                      className="accent-[#0042E4] scale-110"
                    />
                    <span>{col.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleReset}
                  className="px-4 py-1.5 text-[14px] rounded-md border border-[#0042E4]
            text-[#0042E4] hover:bg-[#0042E4] hover:text-white transition"
                >
                  Reset
                </button>
                <button
                  onClick={handleApply}
                  className="px-4 py-1.5 text-[14px] rounded-md bg-[#0042E4] text-white"
                >
                  Apply
                </button>
              </div>
            </motion.div>,
            document.body,
          )}
      </AnimatePresence>
    </>
  );
};

/* ==========================================================
   📊 Statistics Component (Main)
   ========================================================== */
const Statistics = ({ getListOfCampaigns }) => {
  const DEFAULT_TIME_RANGE = {
    startDate: subWeeks(new Date(), 1),
    endDate: new Date(),
    label: "Last week",
  };
  const [currentRange, setCurrentRange] = useState(DEFAULT_TIME_RANGE);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / pageSize);
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleReset = () => {
    setCurrentRange(DEFAULT_TIME_RANGE);

    setPage(1);
    setPageSize(25);

    setTableData([]);
    setResetKey((k) => k + 1); // 🔑 FORCE calendar reset

    // 🔁 Force API call AFTER state updates
    setTimeout(() => {
      handleSearch();
    }, 0);
  };

  const handleRangeChange = (
    startDate: Date | null,
    endDate: Date | null,
    label: string,
  ) => {
    if (!startDate || !endDate) return;

    setCurrentRange({
      startDate,
      endDate,
      label,
    });

    setPage(1); // reset pagination on date change
  };

  const allColumns = [
    { key: "date", label: "Date" },
    { key: "campaignId", label: "Campaign ID" },
    { key: "sent", label: "Sent" },
    { key: "delivered", label: "Delivered" }, // ✅ ADDED
    { key: "open", label: "Open" },
    { key: "click", label: "Click" },
    { key: "bounce", label: "Bounce" }, // ✅ ADDED
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    allColumns.map((c) => c.key),
  );
  const handleSearch = () => {
    const payload = {
      page_no: page,
      page_size: pageSize,
      from_date: formatDate(currentRange.startDate),
      to_date: formatDate(currentRange.endDate),
    };

    setLoading(true);
    console.log("📤 Request Payload:", payload);

    getListOfCampaigns({
      mail_class: "testdev",
      payload,
    })
      .then((res: any) => {
        console.log("✅ Campaign API Response:", res);

        const apiData = res || {};
        const apiTotal = res?.total_count ?? Object.keys(apiData).length;
        const rows = Object.values(apiData).map((item: any) => {
          const { stats, percentageStat } = item;

          return {
            date: stats.send_date,
            campaignId: stats.send_id,

            // ✅ SENT
            sent: stats.submitted_count,

            // ✅ DELIVERED (with fallback)
            delivered:
              stats.delivered_count ??
              stats.submitted_count - stats.bounce_count,

            // ✅ OPEN
            open: (
              <TooltipCell
                label="Open"
                value={stats.opened_count}
                tooltipData={{
                  "Unique Opens": stats.unique_open,
                  "Unique Open Rate": `${percentageStat.unique_open_percentage}%`,
                  "Total Opens": stats.opened_count,
                  "Total Open Rate": `${percentageStat.total_open_percentage}%`,
                }}
              />
            ),

            // ✅ CLICK
            click: (
              <TooltipCell
                label="Click"
                value={stats.click_count}
                tooltipData={{
                  "Unique Clicks": stats.unique_click,
                  "Unique Click Rate": `${percentageStat.unique_click_percentage}%`,
                  "Total Clicks": stats.click_count,
                  "Total Click Rate": `${percentageStat.total_click_percentage}%`,
                }}
              />
            ),

            // ✅ BOUNCE (with tooltip)
            bounce: (
              <TooltipCell
                label="Bounce"
                value={stats.bounce_count}
                tooltipData={{
                  "Hard Bounce": stats.bounce_details?.hard_bounce ?? 0,
                  "Soft Bounce": stats.bounce_details?.soft_bounce ?? 0,
                  "Other Bounce": stats.bounce_details?.other_bounce ?? 0,
                  "Bad Address": stats.bounce_details?.bounce_bad_address ?? 0,
                  "Total Bounce %": `${stats.bounce_details?.total_bounce_percent ?? 0}%`,
                }}
              />
            ),
          };
        });

        setTableData(rows);
        setTotalItems(apiTotal);
      })
      .catch((err: any) => {
        console.error("❌ Campaign API Error:", err);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    handleSearch();
  }, [page, pageSize, currentRange]);

  return (
    <>
      <PageMeta
        title="Campaign Statistics"
        description="View campaign performance data"
      />

      <div className="my-6 grid gap-6 text-[16px] leading-relaxed">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Filters
          </h2>

          <div className="flex justify-between items-center flex-wrap gap-4">
            <TimeRangeDropdown
              key={`timerange-${resetKey}`}
              onRangeChange={handleRangeChange}
            />

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-md border border-[#0042E4] 
  text-[#0042E4] hover:bg-[#0042E4] hover:text-white transition 
  dark:border-[#3B82F6] dark:text-[#3B82F6] dark:hover:bg-[#3B82F6] dark:hover:text-white"
              >
                Reset
              </button>

              <PrimaryButton label="Search" onClick={handleSearch} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
          <table className="min-w-full text-[15px] text-gray-800 dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <motion.tr>
                {allColumns
                  .filter((col) => visibleColumns.includes(col.key))
                  .map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-left font-semibold"
                    >
                      {col.label}
                    </th>
                  ))}
                <th className="px-4 py-3 text-right">
                  <ColumnFilterMenu
                    columns={allColumns}
                    visibleColumns={visibleColumns}
                    onApply={(cols: string[]) => setVisibleColumns(cols)}
                    onReset={() =>
                      setVisibleColumns(allColumns.map((c) => c.key))
                    }
                  />
                </th>
              </motion.tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody
                variants={tableBodyVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {loading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center">
                      Loading campaigns…
                    </td>
                  </tr>
                )}

                {!loading && tableData.length === 0 && (
                  <motion.tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No data found
                    </td>
                  </motion.tr>
                )}

                {!loading &&
                  tableData.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                    >
                      {allColumns
                        .filter((col) => visibleColumns.includes(col.key))
                        .map((col) => (
                          <td key={col.key} className="px-4 py-3">
                            {row[col.key as keyof typeof row]}
                          </td>
                        ))}
                    </tr>
                  ))}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
          <TablePaginationFooter
            currentPage={page}
            totalPages={Math.ceil(totalItems / pageSize)}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  getListOfCampaigns: (payload: any) => dispatch(getListOfCampaigns(payload)),
});

export default connect(null, mapDispatchToProps)(Statistics);
