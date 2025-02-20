import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
const RevenueChart = ({ selectedRange, setSelectedRange, revenueData }) => {
  const timeRanges = [
    {
      label: "12 Months",
      value: 12,
      type: "month",
    },
    {
      label: "6 Months",
      value: 6,
      type: "month",
    },
    {
      label: "30 Days",
      value: 30,
      type: "day",
    },
    {
      label: "7 Days",
      value: 7,
      type: "day",
    },
  ];
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: revenueData?.map((item) => item.name || item.day),
            datasets: [
              {
                label: "Revenue",
                data: revenueData?.map((item) => item.totalAmount),
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointHoverBackgroundColor: "#3b82f6",
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 2,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                mode: "index",
                intersect: false,
                backgroundColor: "#fff",
                titleColor: "#000",
                bodyColor: "#000",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                padding: 8,
                displayColors: false,
                callbacks: {
                  title: (tooltipItems) => {
                    return `${tooltipItems[0].label} 2021`;
                  },
                  label: (context) => {
                    return `Rs ${context.parsed.y.toLocaleString()}`;
                  },
                },
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: "#e5e7eb",
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                  callback: (value) => {
                    if (value === 0) return "0 PKR";
                    if (value >= 1000 && value < 10000)
                      return `${value / 1} PKR`;
                    if (value >= 10000 && value < 100000)
                      return `${value / 1} PKR`;
                    return `${value / 1} PKR`;
                  },
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [revenueData]);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200 h-[359px]">
      <div className="flex items-center justify-between p-6 pb-0">
        <h2 className="text-base font-medium text-gray-900">Revenue</h2>
        <div className="flex space-x-2">
          {timeRanges?.map((range, index) => (
            <button
              key={index}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 text-sm rounded-md ${selectedRange.label === range.label
                  ? "bg-transparent border text-black font-semibold"
                  : "bg-transparent text-[#6c75a1] hover:bg-gray-100"
                }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="h-[290px]">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
