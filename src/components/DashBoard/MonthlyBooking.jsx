import React, { useState, useRef, useEffect, useMemo } from "react";
import Chart from "chart.js/auto";
import { ChevronDown } from "lucide-react";

const MonthlyBooking = ({
  bookingData,
  selectedMonth,
  setSelectedMonth,
  months,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [showMonths, setShowMonths] = useState(false);

  useEffect(() => {
    const data = {
      labels: bookingData?.map((item) => item.day),
      datasets: [
        {
          label: "Bookings",
          data: bookingData?.map((item) => item.totalBookings), // Use selected month's data
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
    };

    const options = {
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
            callback: (value) => `${value}`,
          },
        },
      },
    };

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data,
          options,
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedMonth, bookingData]);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200 h-auto">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">Monthly Booking</h2>
        <div className="relative">
          <button
            className="border rounded-xl py-1 px-3 flex items-center space-x-9 text-black font-bold"
            onClick={() => {
              setShowMonths(!showMonths);
            }}
          >
            <span>{selectedMonth}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showMonths ? "rotate-180" : ""
              }`}
            />
          </button>
          {showMonths && (
            <ul className="absolute right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
              {months?.map((month) => (
                <li key={month}>
                  <button
                    className="block w-full px-4 py-1 text-sm text-left hover:bg-gray-100 focus:bg-gray-200"
                    onClick={() => {
                      setSelectedMonth(month);
                      setShowMonths(false);
                    }}
                  >
                    {month}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="p-2">
        <div className="h-[calc(100%-56px)]">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBooking;
