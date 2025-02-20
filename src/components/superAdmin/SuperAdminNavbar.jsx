import { Bell, LogOut, Settings } from "lucide-react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useOwnerContext } from "../../context/OwnerContext";
const SuperAdminNavbar = () => {
  const location = useLocation();
  const [showDetails, setShowDetails] = useState(false);
  const pathName = location.pathname;
  const { user, logOut } = useOwnerContext();
  const titles = {
    'hotels-info': "Hotels",
    "booking": "Booking",
    "rooms": "Rooms",
    "support": "Support",
    "customers": "Customers",
    "dashboard": "Dashboard"
  };
  const currentTitle = titles[pathName.split("/").pop()];
  return (
    <div>
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden p-3 flex border justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-lg flex items-center">
            <span className="text-gray-800 text-sm font-medium">
              {pathName === "/dashboard"
                ? "Dashboard"
                : pathName === "/dashboard/room-information"
                  ? "Room information"
                  : pathName === "/dashboard/booking"
                    ? "Booking"
                    : ""}
            </span>
          </div>
          <h4 className="rounded-lg  py-1  font-semibold">
            {currentTitle}

          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 flex justify-center items-center text-gray-400 ">
            <Bell className="animate-pulse" />
          </button>
          <div className="w-px h-6 bg-gray-400 mx-2" />
          <div className="flex items-center gap-2 pr-4">

            <span className="text-black text-sm font-medium">{user?.name}</span>
            <button onClick={() => { setShowDetails(!showDetails); }}>
              <img
                className={`h-6 w-6 rounded-full duration-500 ${showDetails ? "rotate-180 duration-500" : ""}`}
                src="/grow.jpg"
                alt="Profile"
              />
            </button>
          </div>
        </div>
      </div>
      {showDetails && (<ul className="absolute right-4 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
        <li >
          <button className="flex flex-row justify-center items-center  w-full px-4 py-1 text-left">Settings <span><Settings className="w-4 h-5 ml-2 animate-spin" /></span> </button>
          <hr />
          <button onClick={() => {
            logOut();
          }} className="flex flex-row justify-center items-center text-red-600 w-full px-4 py-1 text-left">Logout <span><LogOut className="w-4 h-5 ml-2 animate-pulse" /></span> </button>
        </li>
      </ul>)}
    </div>
  );
};
export default SuperAdminNavbar;

// <div className="w-[249px] h-[38px] px-1.5 py-1 bg-[#f2f6ff] rounded-lg justify-start items-center gap-1 inline-flex">
//   <div className="w-4 h-4 relative" />
//   <div className="text-[#6c75a1] text-sm font-normal font-['Poppins'] leading-tight">
//     Search
//   </div>
// </div>;
