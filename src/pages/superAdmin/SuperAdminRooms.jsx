import { Search, ChevronDown } from "lucide-react";
import React, { useState } from "react";
const SupperAdminRooms = () => {
  const [showDay, setShowDay] = useState(false);
  const [day, setDay] = useState("");
  // Dummy data
  const data = {
    support: [
      {
        _id: "1",
        roomType: "Single",
        noOfHotels: "5",
        subRooms: "2",
      },
      {
        _id: "2",
        roomType: "Double",
        noOfHotels: "3",
        subRooms: "1",
      },
      {
        _id: "3",
        roomType: "Suite",
        noOfHotels: "2",
        subRooms: "3",
      },
      {
        _id: "4",
        roomType: "Deluxe",
        noOfHotels: "4",
        subRooms: "2",
      },
      {
        _id: "5",
        roomType: "Family",
        noOfHotels: "1",
        subRooms: "1",
      },
    ],
  };

  return (
    <div className="w-full h-auto flex-col justify-start items-start flex border rounded-lg p-3 my-2 shadow-md">
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="flex items-center gap-4 text-[#001c1c] text-2xl font-semibold leading-7">
          <h2>Rooms</h2>
          <div className="w-[249px] h-[38px] px-2 py-1 bg-[#f2f6ff] rounded-lg shadow-lg flex items-center gap-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <Search className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-gray-300 text-base  outline-none"
            />
          </div>
        </div>

        <div className="justify-end items-center gap-3 flex">
          <div className="text-[#3d425a] text-sm font-semibold leading-tight">
            Filter by
          </div>
          <button
            onClick={() => {
              setShowDay(!showDay);
            }}
            className="flex border px-4 py-1 rounded-xl justify-center gap-2  items-center text-[#a1a1a1] font-medium"
          >
            {day.label}
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
        <ul className="absolute flex flex-col  right-14 w-28 max-h-40 mt-9 bg-white border shadow-lg z-10 overflow-x-hidden rounded-lg">
          {[
            {
              label: "Today",
              item: "today",
            },
            {
              label: "Yesterday",
              item: "yesterday",
            },
            {
              label: "Week",
              item: "week",
            },
            {
              label: "Month",
              item: "month",
            },
          ].map((item, index) => (
            <button
              onClick={() => {
                setDay(item);
                setShowDay(!showDay);
              }}
              key={index}
              className="px-3 py-1 text-left hover:bg-gray-200 overflow-y-auto"
            >
              {item.label}
            </button>
          ))}
        </ul>
      )}
      {/* Header row */}
      {/* <hr className="w-full border-t-1 border-gray-300 mt-4" /> */}
      <div className="flex justify-between w-full px-3 py-3 rounded-xl border border-[#e4e4e4] my-3">
        {["No", "Room Type", "No. of Hotels", "Sub rooms"].map(
          (header, index) => (
            <div
              key={index}
              className="w-1/6 pr-4 flex justify-between items-center"
            >
              <div className="text-[#08A5DC] text-base font-medium">
                {header}
              </div>
            </div>
          )
        )}
      </div>

      {/* Booking rows */}
      <div className="flex w-full flex-col justify-between ">
        {data.support.map((support, index) => (
          <div
            key={index}
            className="h-12 px-3 bg-[#f2f6ff] rounded-[10px] flex justify-between mb-1"
          >
            <div className="w-1/6 pr-4 py-2 flex justify-between items-center">
              <div className="text-[#3d425a] text-base font-medium">
                {support._id}
              </div>
            </div>
            <div className="w-1/6 pr-4 py-2 flex justify-between items-center">
              <div className="text-[#3d425a] text-base font-medium">
                {support.roomType}
              </div>
            </div>
            <div className="w-1/6 pr-4 py-2 flex justify-between items-center">
              <div className="text-[#3d425a] text-base font-medium">
                {support.noOfHotels}
              </div>
            </div>
            <div className="w-1/6 pr-4 py-2 flex justify-between items-center">
              <div className="text-[#3d425a] text-base font-medium">
                {support.subRooms}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupperAdminRooms;
