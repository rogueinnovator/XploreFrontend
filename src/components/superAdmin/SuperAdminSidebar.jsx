import {
  LayoutGrid,
  HotelIcon,
  BookCheck,
  DoorOpen,
  ChartNetwork,
  Settings,
  LucideSchool,
  Mail,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const SuperAdminSideBar = () => {
  const location = useLocation();
  const menuItems = [
    {
      label: "Dashboard",
      path: "/super-admin/dashboard",
      icon: <LayoutGrid className="text-white/75" />,
    },
    {
      label: "Hotels",
      path: "/super-admin/hotels-info",
      icon: <HotelIcon className="text-white/75" />,
    },
    {
      label: "Booking",
      path: "/super-admin/booking",
      icon: <BookCheck className="text-white/75" />,
    },

    {
      label: "Rooms",
      path: "/super-admin/rooms",
      icon: <LucideSchool className="text-white/75" />,
    },
    {
      label: "Customers",
      path: "/super-admin/customers",
      icon: <ChartNetwork className="text-white/75" />,
    },
    {
      label: "Newsletter Broadcast ",
      path: "/super-admin/subscriptions",
      icon: <Mail   className="text-white/75" />,
    },
    {
      label: "Support",
      path: "/super-admin/support",
      icon: <DoorOpen className="text-white/75" />,
    },
    {
      label: "Settings & Security",
      path: "/super-admin/settings",
      icon: <Settings className="text-white/75" />,
    },
  ];

  //   <div className="w-6 h-6 bg-gray-600 rounded"></div>
  return (
    <div className="fixed w-full  min-h-[calc(100vh-20px)]   max-w-[250px] h-auto p-3 bg-[#001b1c] rounded-xl flex flex-col justify-between items-center">
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img
              className="size-10 rounded-full bg-white"
              src="/Logo_Image.png"
              alt="Logo"
            />
            <span className="text-white text-base font-medium">Logo</span>
          </div>
          <hr className="border-t border-[#8a8a8a]" />
        </div>

        <div className="flex flex-col gap-3">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div key={index} className="flex items-center gap-4 py-2 px-1">
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

      {/* <div className="relative w-full flex flex-col items-center bg-[#052525] rounded-lg border border-[#005050] p-4 mt-4">
        <img
          src="/main_logo.png"
          alt="hotel picture"
          className="size-10 rounded-full absolute -top-5 bg-white "
        ></img>
        <div className="text-center mt-3">
          <h3 className="text-white text-lg font-semibold">Hotel Profile</h3>
          <p className="text-[#bbbbbb] text-sm">Manage your Hotel profile</p>
        </div>
        <Link
          to="/dashboard/hotel-profile"
          className="mt-4 px-4 py-2 bg-[#08a5dc] text-white text-sm font-semibold rounded-lg border-2 border-white shadow"
        >
          Manage Profile
        </Link>
      </div> */}
    </div>
  );
};

export default SuperAdminSideBar;
