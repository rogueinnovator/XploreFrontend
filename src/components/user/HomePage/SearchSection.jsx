import { useState } from "react";
import { Calendar, Search, User } from "lucide-react";
import { useGetSearchHotels } from "../../../api/user-api";
import { useLocation, useNavigate } from "react-router-dom";

function SearchSection() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const [params, setParams] = useState({
    checkInDate: "",
    checkOutDate: "",
    maxGuests: "1",
    searchLocation: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // const { refetch } = useGetSearchHotels(params, { enabled: false });
  const submitForm = async (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(params).toString();
    navigate(`/hotels-page?${queryParams}`);
  };

  return (
    <div>
      {/* grid grid-cols-1 md:grid-cols-4 */}
      <form onSubmit={submitForm}>
        <div className={`grid  md:inline-grid ${pathName === "/" ? "md:grid-cols-4" : "md:grid-flow-col w-full"}  gap-4`}>
          <div className="flex flex-col">
            <label className="text-sm pl-2 font-medium text-gray-600">Location</label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="searchLocation"
                value={params.searchLocation}
                onChange={handleChange}
                required
                placeholder="Where are you going?"
                className="w-full border text-gray-700 outline-transparent rounded-lg pl-10 py-[9px] text-sm focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          {/* CHECK_IN */}
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            <div className="flex flex-col">
              <label className="text-sm pl-2 font-medium text-gray-600">Check In</label>
              <div className="relative">
                <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="checkInDate"
                  value={params.checkInDate}
                  onChange={handleChange}
                  required
                  className="w-full border text-gray-700 outline-transparent rounded-lg pl-10 py-2 text-sm focus:ring focus:ring-blue-300 cursor-pointer"
                />
              </div>
            </div>
            {/* CHECK_IN */}
            <div className="flex flex-col">
              <label className="text-sm pl-2 font-medium Userstext-gray-600">Check Out</label>
              <div className="relative">
                <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="checkOutDate"
                  value={params.checkOutDate}
                  onChange={handleChange}
                  required
                  className="w-full border text-gray-700 outline-transparent rounded-lg pl-10 py-2 text-sm focus:ring focus:ring-blue-300 cursor-pointer"
                />
              </div>
            </div>
          </div>
          {/* GUEST */}
          <div className="flex flex-col">
            <label className="text-sm pl-2 font-medium text-gray-600">Guests</label>
            <div className="relative">
              <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="maxGuests"
                value={params.maxGuests}
                onChange={handleChange}
                className="w-full border text-gray-700 bg-white rounded-lg pl-10 py-[10px] text-sm cursor-pointer focus:ring focus:ring-blue-300 outline-transparent"
                required
              >
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
                <option value="3">3 Persons</option>
                <option value="4">4 Persons</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className={`col-span-1  ${pathName === "/" ? "md:col-span-4  " : "md:col-span-1 "} bg-blue-600 text-white font-semibold rounded-lg mt-4 py-2 hover:bg-blue-700 transition`}
          >
            Search Hotels
          </button>

        </div>
      </form>
    </div>
  );
}

export default SearchSection;
