import { motion } from "framer-motion";
import ReusableTable from "../../components/dashboard/ReusableTable";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const StatisticsTable = ({ columns, data, loading }: any) => {
  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading campaign statistics…
      </div>
    );
  }

  if (!data.length) {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center 
                   py-24 rounded-2xl border border-dashed
                   bg-white dark:bg-gray-900
                   border-gray-300 dark:border-gray-700"
      >
        <div className="text-5xl mb-4">📊</div>
        <h3 className="text-lg font-semibold">No campaign data found</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-sm text-center">
          Try changing the date range or click Search to fetch results.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible">
      <ReusableTable
        columns={columns}
        data={data}
        rowClassName="
          bg-white dark:bg-gray-900
          hover:bg-gray-50 dark:hover:bg-gray-800/60
          border-b border-gray-200 dark:border-gray-700
        "
      />
    </motion.div>
  );
};

export default StatisticsTable;
