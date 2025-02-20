import { useState } from "react";
import RoomCard from "../../components/DashBoard/Room/RoomCard.jsx";
import { useOwnerContext } from "../../context/OwnerContext.jsx";
import { useGetHotelById } from "../../api/hotel-api.js";
import { Loader2 } from "lucide-react";
import { useCreateRoom, useGetAllRooms } from "../../api/room-api.js";
import AddRoomPopupModel from "../../components/DashBoard/Room/AddRoomPopupModel.jsx";

const RoomInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const { user } = useOwnerContext();
  const { hotelData, isLoading, isError } = useGetHotelById(user?.hotelId);

  const {
    data: roomData,
    isLoading: isLoadingRooms,
    isError: isErrorRooms,
    refetch: refetchAllRooms,
  } = useGetAllRooms(user?.hotelId);

  const { createNewRoom, isLoading: isRoomLoading } = useCreateRoom();

  // console.log("user : ", user);
  // console.log("hotel : ", hotelData);

  const handleCreateRoomClick = () => {
    setIsModalOpen(true); // Open the modal when the Create Room button is clicked
  };

  const handlePopupSaveClick = async (data) => {
    // Handle the save logic here
    const response = await createNewRoom({ data, hotelId: user?.hotelId });
    if (response.success) {
      setIsModalOpen(false); // Close the modal after saving
      refetchAllRooms();
    }
  };

  const handlePopupCancelClick = () => {
    // console.log("data : ", data, "Hotel Id :", hotelData._id);
    setIsModalOpen(false); // Close the modal when cancel is clicked
  };

  if (isLoading || isLoadingRooms) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="text-blue-500 size-12 animate-spin" />
      </div>
    );
  }

  if (isError || isErrorRooms) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Some Thing Went Wrong Fetching Hotel</p>
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-auto ">
      <div className="flex-grow w-full ">
        <div className="flex items-center justify-between w-full p-2 px-4 py-2 my-5 border border-gray-100 rounded-md shadow-lg  h-14">
          <div className="text-xl font-bold">Rooms</div>
          <button
            onClick={handleCreateRoomClick}
            className="px-5 py-3 bg-[#08a5dc] text-white font-bold rounded-xl"
          >
            Create Room
          </button>
        </div>

        {/* loop through all rooms here */}
        <div className="">
          {roomData.rooms.length === 0 ? (
            <div className="flex items-center justify-center h-screen font-semibold">
              <h1>
                No rooms have been added to this hotel. Please add a room to
                display here.
              </h1>
            </div>
          ) : (
            roomData.rooms.map((room) => <RoomCard key={room.id} room={room} />)
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <AddRoomPopupModel
          isLoading={isRoomLoading}
          handlePopupCancelClick={handlePopupCancelClick}
          handlePopupSaveClick={handlePopupSaveClick}
          startingRoomNumber={hotelData?.hotelInformation.startingRoomNumber}
          endingRoomNumber={hotelData?.hotelInformation.endingRoomNumber}
        />
      )}
    </div>
  );
};

export default RoomInformation;
