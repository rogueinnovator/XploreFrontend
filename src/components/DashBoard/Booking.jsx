import React, { useEffect, useState } from "react";
import StatusCard from "./cards/statusCard";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { useGetBookings, useGetBookingsStats } from "../../api/booking-api";
import { Loader2 } from "lucide-react";

const Booking = () => {
  const [showDay, setShowDay] = useState(false);
  const [day, setDay] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading, isError, refetch, isFetching } = useGetBookings({
    page: currentPage,
    limit: itemsPerPage,
    filterBy: day,
  });

  const {
    data: statsData,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useGetBookingsStats();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    (async () => {
      await refetch();
    })();
  }, [itemsPerPage, currentPage, day]);

  if (isError || isStatsError) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-2xl font-semibold">
        Some thing went Wrong Getting Bookings
      </div>
    );
  }

  if (isLoading || isFetching || isStatsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="text-blue-500 size-12 animate-spin" />
      </div>
    );
  }

  // console.log(statsData);
  // console.log(
  //   statsData.data.bookingData.totalGuestsByMonth.map((i) => i.totalGuests)
  // );

  return (
    <div>
      <div className=" w-full flex justify-between gap-2  mt-[20px] ">
        <StatusCard
          title="Total Guests"
          value={statsData.data.bookingData.totalGuests}
          chartLabels={statsData.data.bookingData.totalGuestsByMonth.map(
            (i) => i.name
          )}
          chartData={statsData.data.bookingData.totalGuestsByMonth.map(
            (i) => i.totalGuests
          )}
          label={"Guests"}
          type="line"
        />
        <StatusCard
          title="New Bookings Today"
          value={statsData.data.newBookingsToday}
          type="pie"
        />
      </div>
      <div className="inline-flex flex-col items-start justify-start w-full h-auto gap-4 p-4 mt-4 overflow-hidden bg-white border-b shadow-lg rounded-xl">
        <div className="inline-flex items-center self-stretch justify-between">
          <div className="text-[#001c1c] text-2xl font-semibold leading-7">
            Guest Booking List
          </div>
          <div className="flex items-center justify-end gap-3">
            <div className="text-[#3d425a] text-sm font-semibold leading-tight">
              Filter by
            </div>
            <button
              onClick={() => {
                setShowDay(!showDay);
              }}
              className="flex border px-4 py-1 rounded-xl justify-center gap-2  items-center text-[#a1a1a1] font-medium"
            >
              {day}{" "}
              <span>
                <ChevronDown
                  className={`${
                    showDay ? "rotate-180 duration-300" : ""
                  } duration-300`}
                />
              </span>
            </button>
          </div>
        </div>
        {showDay && (
          <ul className="absolute z-10 flex flex-col overflow-x-hidden bg-white border rounded-lg shadow-lg right-14 w-28 max-h-40 mt-9">
            {[
              {
                label: "All",
                item: "all",
              },
              {
                label: "Today",
                item: "today",
              },
              {
                label: "This Week",
                item: "thisweek",
              },
            ].map((item, index) => (
              <button
                onClick={() => {
                  setDay(item.item);
                  setShowDay(!showDay);
                }}
                key={index}
                className="px-3 py-1 text-left hover:bg-gray-200"
              >
                {item.label}
              </button>
            ))}
          </ul>
        )}

        {data.bookings.length === 0 ? (
          <div className="flex items-center justify-center w-full text-2xl font-semibold ">
            No bookings found
          </div>
        ) : (
          <>
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex justify-center w-full px-3 py-3 rounded-xl border border-[#e4e4e4] mb-3">
                <div className="flex items-center justify-start w-1/6 pr-4">
                  <div className="text-[#6c75a1] text-base font-medium">
                    Guest Name
                  </div>
                </div>
                <div className="flex items-center justify-start w-1/6 pr-4">
                  <div className="text-[#6c75a1] text-base font-medium">
                    Contact No
                  </div>
                </div>
                <div className="flex items-center justify-start w-1/6 pr-4">
                  <div className="text-[#6c75a1] text-base font-medium">
                    Room
                  </div>
                </div>
                <div className="flex items-center justify-start w-1/6 pr-4">
                  <div className="text-[#6c75a1] text-base font-medium">
                    Check-in Date
                  </div>
                </div>
                <div className="flex items-center justify-start w-1/6 pr-4">
                  <div className="text-[#6c75a1] text-base font-medium">
                    Check-out Date
                  </div>
                </div>
                <div className="flex items-center justify-start w-1/6 pr-4">
                  <div className="text-[#6c75a1] text-base font-medium">
                    No of Guests
                  </div>
                </div>
                <div className="flex items-center justify-start w-1/6 pr-4">
                  <div className="text-[#6c75a1] text-base font-medium">
                    Payment
                  </div>
                </div>
                <div className="flex items-center justify-start w-1/6 pr-4">
                  <div className="text-[#6c75a1] text-base font-medium">
                    Status
                  </div>
                </div>
                <div className="flex items-center justify-start w-1/6 pr-4">
                  <div className="text-[#6c75a1] text-base font-medium">
                    Total Payment
                  </div>
                </div>
              </div>

              <div className="w-full flex-col justify-start items-start gap-2.5 flex">
                {data.bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="self-stretch h-10 px-3 bg-[#fafbff] rounded-[10px] flex"
                  >
                    <div className="flex items-center justify-start w-1/6 py-2 pr-4">
                      <div className="text-[#3d425a] text-base font-medium">
                        {booking.guestName}
                      </div>
                    </div>
                    <div className="flex items-center justify-start w-1/6 py-2 pr-4">
                      <div className="text-[#3d425a] text-base font-medium">
                        {booking.contactNumber}
                      </div>
                    </div>
                    <div className="flex items-center justify-start w-1/6 py-2 pr-4">
                      <div className="text-[#3d425a] text-base font-medium ">
                        {booking.selectedRooms.length > 4
                          ? `[${booking.selectedRooms
                              .slice(0, 4)
                              .join(",")}...]`
                          : `[${booking.selectedRooms.join(",")}]`}
                      </div>
                    </div>
                    <div className="flex items-center justify-start w-1/6 py-2 pr-4">
                      <div className="text-[#3d425a] text-base font-medium">
                        {
                          new Date(booking.checkInDate)
                            .toLocaleString()
                            .split("T")[0]
                        }
                      </div>
                    </div>
                    <div className="flex items-center justify-start w-1/6 py-2 pr-4">
                      <div className="text-[#3d425a] text-base font-medium">
                        {
                          new Date(booking.checkOutDate)
                            .toLocaleString()
                            .split("T")[0]
                        }
                      </div>
                    </div>
                    <div className="flex items-center justify-start w-1/6 py-2 pr-4">
                      <div className="text-[#3d425a] text-base font-medium">
                        {booking.numberOfGuests}
                      </div>
                    </div>
                    <div className="flex items-center justify-start w-1/6 py-2 pr-4">
                      <div className="text-[#3d425a] text-base font-medium">
                        {booking.paymentDetails.paymentStatus}
                      </div>
                    </div>
                    <div className="flex items-center justify-start w-1/6 py-2 pr-4">
                      <div className="text-[#3d425a] text-base font-medium">
                        {booking.bookingStatus}
                      </div>
                    </div>
                    <div className="flex items-center justify-start w-1/6 py-2 pr-4">
                      <div className="text-[#3d425a] text-base font-medium">
                        {booking.totalPrice}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {data.totalPages > 1 && (
              <div className="flex justify-center w-full mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2 py-2 border rounded-md"
                >
                  <ChevronLeft />
                </button>
                <div className="flex items-center justify-center gap-3 px-2 mx-5 border">
                  <span>{currentPage}</span>{" "}
                  <div className="w-1 h-full border-l"></div>
                  <span>{data.totalPages}</span>
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === data.totalPages}
                  className="px-2 py-2 border rounded-md"
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Booking;
