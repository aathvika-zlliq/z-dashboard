import { useEffect, useMemo, useState } from "react";
import { Info, ChevronDown } from "lucide-react";
import { connect } from "react-redux";

import PageMeta from "../../components/common/PageMeta";
import TimeRangeDropdown from "../../components/dashboard/TimeRangeDropdown";
import MultiSelectDropdown from "../../components/dashboard/forms/MultiSelectDropdown";
import TablePaginationFooter from "../../components/dashboard/TablePaginationFooter";
import ReusableTable from "../../components/dashboard/ReusableTable";

import {
  EVENT_OPTIONS,
  EVENT_DEPENDENT_OPTIONS,
  DEFAULT_TIME_RANGE,
} from "../liveFeed/data";

import { generateExportReport } from "../../actions";

import { columnOptions, DEFAULT_PAGE_SIZE } from "./export.config";
import { buildPayload, mapExportRows } from "./export.helpers";

const Export = ({ generateExportReport, data, userDetails, user }: any) => {
  const [currentRange, setCurrentRange] = useState(DEFAULT_TIME_RANGE);

  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
  const [statusTypeOptions, setStatusTypeOptions] = useState<any[]>([]);
  const [selectedStatusTypes, setSelectedStatusTypes] = useState<any[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [selectedColumns, setSelectedColumns] = useState(
    columnOptions.filter((c) => c.default).map((c) => c.key),
  );

  const [rows, setRows] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [hasSearched, setHasSearched] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(0);

  /* ================= DEPENDENT STATUS ================= */

  useEffect(() => {
    if (!selectedEvents.length) {
      setStatusTypeOptions([]);
      setSelectedStatusTypes([]);
      return;
    }

    const eventValues = selectedEvents.map((e) =>
      typeof e === "string" ? e : e.value,
    );

    const merged = eventValues.flatMap(
      (ev) => EVENT_DEPENDENT_OPTIONS[ev] || [],
    );

    const unique = Array.from(
      new Map(merged.map((o) => [o.value, o])).values(),
    );

    setStatusTypeOptions(unique);
  }, [selectedEvents]);

  /* ================= SEARCH ================= */

  const handleSearch = async (pageNo = page, size = pageSize) => {
    try {
      await generateExportReport(
        buildPayload({
          page: pageNo,
          pageSize: size,
          selectedColumns,
          selectedEvents,
          selectedStatusTypes,
          currentRange,
          user_id: user?.account_id,
          mail_class: user?.mail_class,
        }),
      );
    } catch (error) {
      console.error("Export API failed", error);
    }
  };

  /* ================= AUTO API (LIKE LIVEFEED) ================= */

  useEffect(() => {
    handleSearch(page, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchTrigger]);

  /* ================= REDUX → UI ================= */

  useEffect(() => {
    if (!data || !Array.isArray(data.logs)) {
      setRows([]);
      setTotalItems(0);
      return;
    }

    setRows(mapExportRows(data.logs));
    setTotalItems(Number(data?.total_count?.["count()"] ?? 0));
  }, [data]);

  /* ================= RESET ================= */

  const handleReset = () => {
    // Clear filters
    setSelectedEvents([]);
    setSelectedStatusTypes([]);
    setStatusTypeOptions([]);

    // Reset column selection
    setSelectedColumns(
      columnOptions.filter((c) => c.default).map((c) => c.key),
    );

    // Reset date range
    setCurrentRange(DEFAULT_TIME_RANGE);

    // Reset UI state
    setShowAdvancedFilters(false);
    setHasSearched(false);

    // Force controlled components to remount
    setResetKey((k) => k + 1);

    // Reset pagination
    setPage(1);

    // 🔥 IMPORTANT: trigger API like refresh
    setSearchTrigger((v) => v + 1);
  };

  /* ================= COLUMNS ================= */

  const visibleColumns = useMemo(
    () =>
      columnOptions
        .filter((c) => selectedColumns.includes(c.key))
        .map(({ key, label }) => ({ key, label })),
    [selectedColumns],
  );

  const hasData = rows.length > 0;

  useEffect(() => {
    setPage(1);
  }, [selectedEvents, selectedStatusTypes, selectedColumns, currentRange]);

  /* ================= RENDER ================= */

  return (
    <>
      <PageMeta title="Export | Dashboard" />

      <div className="grid grid-cols-1 gap-6 my-6">
        {/* ================= FILTERS ================= */}
        <div className="bg-white dark:bg-gray-900 border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TimeRangeDropdown
              key={`timerange-${resetKey}`}
              onRangeChange={(s, e, label) =>
                s && e && setCurrentRange({ startDate: s, endDate: e, label })
              }
            />

            <MultiSelectDropdown
              key={`events-${resetKey}`}
              placeholder="Events"
              options={EVENT_OPTIONS}
              value={selectedEvents}
              onChange={setSelectedEvents}
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

            <button
              onClick={() => setShowAdvancedFilters((v) => !v)}
              className="flex items-center gap-1 text-[#0042E4] text-sm font-medium"
            >
              + Advanced Filters
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showAdvancedFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* ================= ADVANCED FILTERS ================= */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              showAdvancedFilters
                ? "max-h-[600px] opacity-100 mt-6"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-gray-50 dark:bg-gray-800 border rounded-xl p-4">
              <h3 className="font-semibold mb-3">Export Columns</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {columnOptions.map((col) => (
                  <label key={col.key} className="flex gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(col.key)}
                      onChange={() =>
                        setSelectedColumns((prev) =>
                          prev.includes(col.key)
                            ? prev.filter((c) => c !== col.key)
                            : [...prev, col.key],
                        )
                      }
                    />
                    {col.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-between items-center mt-5">
            <div className="flex items-center text-blue-600 text-sm">
              <Info className="mr-2 h-4 w-4" />
              Fetch export logs
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="border px-4 py-2 rounded"
              >
                Reset
              </button>

              <button
                onClick={() => {
                  setHasSearched(true);
                  setPage(1);
                  setSearchTrigger((v) => v + 1);
                }}
                className="bg-[#0042E4] text-white px-4 py-2 rounded"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* ================= TABLE / EMPTY ================= */}
        <div className="bg-white dark:bg-gray-900 border rounded-2xl p-6">
          {hasSearched && !hasData ? (
            <div className="flex flex-col items-center justify-center py-24 border border-dashed rounded-xl text-center bg-gray-50 dark:bg-gray-800/50">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold">No results found</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-sm">
                Try adjusting filters, selecting different events, or expanding
                the date range.
              </p>
            </div>
          ) : (
            <>
              <ReusableTable columns={visibleColumns} data={rows} />

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
            </>
          )}
        </div>
      </div>
    </>
  );
};

/* ================= REDUX ================= */

const mapStateToProps = (state: any) => ({
  data: state.exportReducer.data,
  user: state.settingsReducer.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  generateExportReport: (payload: any) =>
    dispatch(generateExportReport(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Export);
