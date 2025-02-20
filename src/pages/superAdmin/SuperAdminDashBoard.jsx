import { useGetDashboardStats } from "../../api/superAdmin-api";
import { Loader2, ArrowUp, ArrowDown } from "lucide-react";

const SuperAdminDashBoard = () => {
  const { data, isLoading, isError } = useGetDashboardStats();

  if (isError) {
    return (
      <div className="h-screen w-full flex justify-center items-center font-semibold text-2xl">
        Some thing went wrong getting dashboard stats
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="size-12 animate-spin text-blue-500" />
      </div>
    );
  }

  //console.log(data);
  return (
    <div className="w-full mt-4 p-4 bg-white rounded-xl shadow-md border-b flex flex-col gap-4 overflow-hidden">
      <div className="flex justify-between items-center">
        <h2 className="text-[#3d425a] text-xl font-semibold">Overview</h2>
      </div>
      <hr className="border-gray-300" />
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            title: "Total Hotels",
            value: data.hotelData.totalHotels,
            change: data.hotelData.hotelPercentage,
          },
          {
            title: "Total Bookings",
            value: data.bookingData.totalBookings,
            change: data.bookingData.bookingPercentage,
          },
          {
            title: "Total Rooms",
            value: data.roomData.totalRooms,
            change: data.roomData.roomPercentage,
          },
          {
            title: "Total Visitors",
            value: data.userData.totalUsers,
            change: data.userData.userPercentage,
          },
        ].map(({ title, value, change }, index) => (
          <div
            key={index}
            className="p-3 bg-white rounded-xl shadow-sm border border-[#f2f6ff] flex flex-col gap-1"
          >
            <span className="text-[#6c75a1] text-[26px] font-medium">
              {title}
            </span>
            <div className="flex justify-between items-end">
              <span
                className={`${
                  change >= 0 ? "text-green-500" : "text-red-500"
                } text-xl font-medium flex items-center gap-1`}
              >
                {change?.toString()}
                {change >= 0 ? (
                  <ArrowUp className=" text-green-500 text-xs" />
                ) : (
                  <ArrowDown className=" text-red-500 text-xs" />
                )}
              </span>
              <span className="text-[#3d425a] text-4xl  font-medium font-['Bebas Neue']">
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminDashBoard;
