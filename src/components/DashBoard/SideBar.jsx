import { BookOpen, DoorOpen, LayoutGrid } from "lucide-react";

import Logo from "../../../public/logo_1.svg";

import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutGrid className="text-white/75" />,
    },
    {
      label: "Room information",
      path: "/dashboard/room-information",
      icon: <DoorOpen className="text-white/75" />,
    },
    {
      label: "Bookings",
      path: "/dashboard/booking",
      icon: <BookOpen className="text-white/75" />,
    },
    // {
    //   label: "Hotel staff",
    //   path: "/dashboard/hotelstaff",
    //   icon: <Users className="text-white/75" />,
    // },
  ];

  //   <div className="w-6 h-6 bg-gray-600 rounded"></div>
  return (
    <div className="fixed w-full  min-h-[calc(100vh-20px)]   max-w-[250px] h-auto p-3 bg-[#001b1c] rounded-xl flex flex-col justify-between items-center">
      <div className="flex flex-col w-full gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img src={Logo} alt="Logo" className="text-white" />
            </Link>
          </div>
          <hr className="border-t border-[#8a8a8a]" />
        </div>

        <div className="flex flex-col gap-3">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div key={index} className="flex items-center gap-4 px-1 py-2">
                {isActive && (
                  <span className="fixed w-1 h-8 rounded-md bg-white/75"></span>
                )}
                <Link
                  to={item.path}
                  className="text-[#aaaaaa] text-sm font-medium flex justify-center items-center ml-2"
                >
                  {" "}
                  <span className="px-1">{item.icon}</span>
                  {item.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative w-full flex flex-col items-center bg-[#052525] rounded-lg border border-[#005050] p-4 mt-4">
        {/* <img
          src={}
          alt="hotel picture"
          className="absolute bg-white rounded-full size-10 -top-5 "
        ></img>*/}
        <div className="mt-3 text-center">
          <h3 className="text-lg font-semibold text-white">Hotel Profile</h3>
          <p className="text-[#bbbbbb] text-sm">Manage your Hotel profile</p>
        </div>
        <Link
          to="/dashboard/hotel-profile"
          className="mt-4 px-4 py-2 bg-[#08a5dc] text-white text-sm font-semibold rounded-lg border-2 border-white shadow"
        >
          Manage Profile
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
