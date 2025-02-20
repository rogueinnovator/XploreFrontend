import { Pie } from "react-chartjs-2";
import TrendLines from "../TrendLines";
import PropTypes from "prop-types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, scales } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, Title);


const StatusCard = ({
  title,
  value,
  isHighlighted,
  chartLabels = null,
  chartData = null,
  label = "",
  type,
}) => {
  return type === "line" ? (
    <div
      className={`h-[182px] relative w-full rounded-lg bg-white p-4 shadow-lg border ${isHighlighted ? "ring-2 ring-blue-500" : ""}`}>
      <div className="mb-2 text-sm text-gray-500">{title}</div>
      <div className="flex justify-between items-baseline gap-2">
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      {chartLabels && chartData && (
        <div className="mt-3 h-12">
          <TrendLines
            chartLabels={chartLabels}
            chartData={chartData}
            label={label}
          />
        </div>
      )}
    </div>
  ) : (
    <div className={`h-[182px] flex flex-row justify-center w-full rounded-lg bg-white p-4 shadow-lg border ${isHighlighted ? "ring-2 ring-blue-500" : ""}`}>
      {/* <div className="mb-2 text-sm text-gray-500">{title}</div> */}
      <div>
        <Pie data={{ ...data, labels: [title, 'Check In', 'Checkout'] }} options={options} />
      </div>

    </div>
  );
};

// PIE DATA
const data = {
  // labels: [title, 'Check In', 'Checkout',],
  datasets: [
    {
      label: 'Dataset1',
      data: [10, 20, 30],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 2)',
        'rgba(255, 159, 64, 2)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 0.5,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'left',
    },
  },
};

//PropTypes
StatusCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.number.isRequired,
  // trend: PropTypes.oneOf(["up", "down"]).isRequired,
  isHighlighted: PropTypes.bool,
  chartLabels: PropTypes.array,
  chartData: PropTypes.number,
  label: PropTypes.string,
  type: PropTypes.oneOf(["line", "pie"]),
};

export default StatusCard;
