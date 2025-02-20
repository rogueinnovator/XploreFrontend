import { useState } from "react";
import { Edit, Trash2, ArrowLeft, ArrowRight } from "lucide-react";

const RoomInformationTable = () => {
  const tableHeaders = [
    "Room No",
    "Room Type",
    "Type bed",
    "Charges per night",
    "Room size",
    "Room view",
    "Facilities",
    "Action",
  ];

  const tableData = [
    {
      "Room No": 1,
      "Room Type": "Single",
      "Type bed": "King",
      "Charges per night": 100,
      "Room size": 350,
      "Room view": "City View",
      Facilities: "TV, AC",
      Action: "Edit/delete",
    },
    {
      "Room No": 2,
      "Room Type": "Double",
      "Type bed": "Queen",
      "Charges per night": 150,
      "Room size": 400,
      "Room view": "Sea View",
      Facilities: "TV, AC, WiFi",
      Action: "Edit/delete",
    },
  ];

  return (
    <div className="w-full rounded-md shadow-lg my-7 border border-gray-100 py-3 px-4">
      {/* Header */}
      <div className="h-14 flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">Room Information</p>
        <button className="h-12 px-4 py-2 bg-[#08a5dc] text-white rounded-lg shadow-lg font-bold">
          Create Number for Rooms
        </button>
      </div>

      {/* Table */}
      <div className="w-full">
        {/* Table Header */}
        <div className="grid grid-cols-8 border-t border-gray-300 p-2 font-semibold text-gray-500">
          {tableHeaders.map((header, index) => (
            <div key={index} className="text-center">
              {header}
            </div>
          ))}
        </div>

        {/* Table Data */}
        {tableData.map((dataItem, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-8 gap-2 bg-gray-200 rounded-lg my-4 py-2 text-center"
          >
            {Object.entries(dataItem).map(([key, value], colIndex) => (
              <div key={colIndex} className="">
                {key === "Facilities" && value.length > 5 ? (
                  `${value.substring(0, 6)}...`
                ) : key === "Action" ? (
                  <div className="flex justify-center gap-3">
                    <Edit className="cursor-pointer text-green-500" />
                    <Trash2 className="cursor-pointer text-red-500" />
                  </div>
                ) : (
                  value
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Pagination Component */}
        <div className="h-10 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="p-2.5 bg-white rounded-lg border border-[#929292] flex">
              <ArrowLeft className="text-gray-500" />
            </div>

            <div className="h-8 flex">
              <div className="flex items-center justify-center px-[15px] py-[3px] text-sm font-normal">
                <div className="text-black">1</div>
              </div>
              <div className="flex items-center justify-center px-[13px] py-[3px] text-sm opacity-70 text-[#727272]">
                <div>2</div>
              </div>
              <div className="flex items-center justify-center px-[13px] py-[3px] text-sm opacity-70 text-[#727272]">
                <div>3</div>
              </div>
              <div className="flex items-center justify-center px-[13px] py-2 text-xs opacity-70 text-[#727272]">
                <div className="font-semibold">...</div>
              </div>
              <div className="flex items-center justify-center px-2.5 py-[3px] text-sm opacity-70 text-[#727272]">
                <div>99</div>
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-[#929292] flex">
              <ArrowRight className="text-gray-500" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="opacity-70 text-[#727272] text-sm">
              Showing 6 of 50 entries
            </div>
            <div className="pl-4 pr-2.5 py-2.5 bg-white rounded-lg border border-[#d6ddeb] flex items-center gap-3">
              <div className="opacity-70 text-black text-base font-bold">
                Show 10
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInformationTable;
