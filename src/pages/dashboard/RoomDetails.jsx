import Navbar from "../../components/DashBoard/Navbar.jsx";
import RoomInformationTable from "../../components/DashBoard/Room/RoomInformationTable";
import SideBar from "../../components/DashBoard/SideBar.jsx";
const RoomDetails = () => {
  return (
    <div className="p-2 flex gap-2  ">
      <div>
        <SideBar />
      </div>
      <div className="flex-grow w-full ml-[18%]">
        <Navbar />
        <RoomInformationTable />
      </div>
    </div>
  );
};

export default RoomDetails;
