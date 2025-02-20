import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useOwnerContext } from "../../context/OwnerContext";
import { Navigate } from "react-router-dom";

const DashBoard = () => {
  const { user } = useOwnerContext();

  if (!user?.hotelId) {
    return <Navigate to="/hotel/onboarding"></Navigate>;
  }

  return (
    <div className="flex h-screen overflow-auto">
      {/* Sidebar */}
      <div className="w-64 my-1 ml-1">
        <SideBar />
      </div>
      {/* Main container */}
      <div className="flex-1 px-4 pt-1">
        {/* Navbar */}
        <Navbar />
        {/* the gap works only if the display is flex or grid  */}
        {/* Content with gap */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
