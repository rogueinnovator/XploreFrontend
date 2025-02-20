import React from "react";
import StatusBar from "./StatusBar";
import RoomAvailabilityCard from "./RoomAvailabilityCard";
import RevenueChart from "./RevenueItem";
import MonthlyBooking from "./MonthlyBooking";
import { useGetDashboardStats } from "../../api/hotel-api";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const getMonthName = (number) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[number];
};

const HotelOwnerDashBoard = () => {
  const [selectedRange, setSelectedRange] = useState({
    label: "12 Months",
    value: 12,
    type: "month",
  });

  const currentMonth = new Date().getMonth();
  const months = Array.from({ length: currentMonth + 1 }, (_, i) =>
    getMonthName(i)
  );

  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  const { data, isLoading, isError } = useGetDashboardStats({
    revenueDuration: selectedRange.value,
    revenueDurationType: selectedRange.type,
    bookingMonth: selectedMonth,
  });

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-2xl font-semibold">
        Some thing went Wrong Getting Dashboard Stats
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="text-blue-500 size-12 animate-spin" />
      </div>
    );
  }

  console.log(data);

  return (
    <div className="flex flex-col flex-1 justify-between items-center gap-[20px]">
      <StatusBar
        revenue={data?.revenueData?.reduce(
          (prev, curr) => prev + curr.totalAmount,
          0
        )}
        checkIn={data?.bookingData?.checkInToday}
        checkOut={data?.bookingData?.checkOutToday}
        newBooking={data?.bookingData?.newBookingsToday}
      />
      <div className="flex justify-center w-full gap-5">
        <div className="flex w-1/2">
          <RoomAvailabilityCard
            totalRooms={data?.roomAvailabilityData?.totalRooms}
            bookedRooms={data?.roomAvailabilityData?.totalBookedRooms}
            availableRooms={data?.roomAvailabilityData?.availableRooms}
          />
        </div>
        <div className="flex w-full">
          <RevenueChart
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
            revenueData={data?.revenueData}
          />
        </div>
      </div>
      <MonthlyBooking
        bookingData={data?.monthlyBookingData}
        setSelectedMonth={setSelectedMonth}
        selectedMonth={selectedMonth}
        months={months}
      />
    </div>
  );
};

export default HotelOwnerDashBoard;
