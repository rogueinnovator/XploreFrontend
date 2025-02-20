import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetHotelById } from "../../api/hotel-api";
import { Loader2 } from "lucide-react";
import { useOwnerContext } from "../../context/OwnerContext";
import SideBar from "../../components/DashBoard/SideBar";

const links = [
  {
    label: "About Hotel",
    path: "about-hotel",
  },
  {
    label: "Location",
    path: "location-details",
  },
  {
    label: "Contact",
    path: "contact-information",
  },
  {
    label: "Policies & Rules ",
    path: "policies",
  },
  {
    label: "Facilities ",
    path: "facilities",
  },
  {
    label: "Photos",
    path: "hotel-images",
  },
  {
    label: "Reviews",
    path: "reviews",
  },
];

const HotelProfileMain = () => {
  const location = useLocation();
  const { user } = useOwnerContext();
  const { isLoading, isError, hotelData } = useGetHotelById(user?.hotelId);

  if (isLoading || !hotelData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="text-blue-500 size-12 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Some Thing Went Wrong Fetching Hotel</p>
      </div>
    );
  }

  return (
    <div className="flex gap-2 p-2 ">
      <div>
        <SideBar />
      </div>
      <div className="flex-grow w-full ml-[19%]">
        {/*  Header*/}
        <div className="p-5 border border-gray-300 rounded-md shadow-md ">
          {/* Images   */}
          <div className="overflow-hidden border border-gray-300 rounded-lg ">
            <div className="h-[150px]">
              <img
                className="object-cover w-full h-full overflow-hidden"
                src={`${import.meta.env.VITE_BASE_URL_IMAGES}${
                  hotelData?.hotelImages[0]
                }`}
              ></img>
            </div>
            <div className="relative flex items-center gap-5 border-2 border-white">
              <div className="size-[130px] overflow-hidden rounded-full absolute -top-[70px] left-[25px] ">
                <img
                  className="object-cover w-full h-full"
                  src={`${import.meta.env.VITE_BASE_URL_IMAGES}${
                    hotelData?.hotelImages[0]
                  }`}
                ></img>
              </div>
              <div className="ml-[160px] py-7">
                <h1 className="text-3xl font-bold text-gray-700">
                  {hotelData.hotelInformation.name}
                </h1>
                <p className="text-gray-500">
                  {hotelData.locationDetails.address}
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center mt-5 border border-gray-300 rounded-md">
            {links.map((link, i) => {
              const isActivePath = location.pathname.endsWith(link.path);
              return (
                <Link
                  key={i}
                  to={link.path}
                  className={`font-semibold text-lg text-nowrap border-r border-r-gray-300 p-2 px-5 cursor-pointer ${
                    isActivePath && "bg-gray-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        {/* Component in this step  */}
        <div className="p-5 mt-10 mb-10 border border-gray-300 rounded-lg shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HotelProfileMain;
