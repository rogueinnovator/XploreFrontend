import { Bed, DoorOpen, Calendar1, DoorClosed } from "lucide-react";
import React from "react";
const RoomAvailabilityCard = ({ totalRooms, bookedRooms, availableRooms }) => {
  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-lg border flex flex-col gap-6 h-[359px]">
      <div className="text-zinc-900 text-xl font-bold ">Room Availability</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            label: "Total rooms",
            value: totalRooms,
            trend: "10%",
            status: "vs last month",
            logo: <DoorOpen />,
          },
          {
            label: "Booked room",
            value: bookedRooms,
            trend: "10%",
            status: "vs last month",
            logo: <Bed />,
          },
          {
            label: "Available",
            value: availableRooms,
            trend: "10%",
            status: "vs last month",
            logo: <Calendar1 />,
          },
          {
            label: "Not ready",
            value: "5",
            trend: "10%",
            status: "vs last month",
            logo: <DoorClosed />,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-2 bg-white rounded-md border border-gray-200 flex flex-col gap-3 h-[128px]"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-[#08A5DC]">
                {item.logo}
              </div>
              <div className="text-xs text-gray-500">
                <span className="text-black font-medium">{item.trend}</span>{" "}
                <span className="flex justify-center font-light">
                  {item.status}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm text-gray-600 font-medium">
                {item.label}
              </div>
              <div className="text-xl text-black font-medium">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomAvailabilityCard;
