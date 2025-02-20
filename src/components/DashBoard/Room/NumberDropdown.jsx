import { useState } from "react";
import { useOwnerContext } from "../../../context/OwnerContext";
import { useGetSelectedRooms } from "../../../api/room-api";

const NumberDropdown = ({
  numbersList,
  handleNumberClick,
  selectedNumbers,
  disabledList,
  errors,
  label = "",
  isLoading,
  isError,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      <p className="text-[#3D425A] text-sm font-semibold my-1">{label}</p>
      <p className="text-sm text-red-500">{errors.selectedRooms?.message}</p>
      <div className="relative w-full h-12 px-2.5 bg-[#F2F6FF] rounded-lg shadow-md border text-[#A1A1A1] text-base ">
        {/* Dropdown Toggle */}

        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full h-full flex justify-between items-center"
        >
          {selectedNumbers.length > 0
            ? `Selected: ${selectedNumbers.length}`
            : "Select Numbers"}
          <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
        </button>

        {/* Dropdown Content */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full mt-2 border rounded-md bg-white shadow-lg max-h-64 overflow-y-auto">
            <div className="flex flex-wrap gap-2 p-4">
              {isError ? (
                <h1>Error getting rooms</h1>
              ) : isLoading ? (
                "Loading"
              ) : (
                numbersList.map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => handleNumberClick(number)}
                    // disabled={data?.roomsList.includes(number)}
                    disabled={disabledList.includes(number)}
                    className={`w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer disabled:bg-red-300 disabled:cursor-not-allowed
                    ${
                      selectedNumbers.includes(number)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {number}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberDropdown;
