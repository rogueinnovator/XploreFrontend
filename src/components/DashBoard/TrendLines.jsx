import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const TrendLines = ({ label, chartLabels, chartData,pieLabel, }) => {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: label,
        data: chartData,
        borderColor: "#08a5dc",
        backgroundColor: "transparent",
        borderWidth: 2,
        tension: 0.4, // Curve the line
        pointStyle: false,
      },
    ],
  };
  // Define chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: true }, // Hide x-axis
      y: { display: true }, // Hide y-axis
    },
  };

  return <Line data={data} options={options} />;
};

export default TrendLines;
