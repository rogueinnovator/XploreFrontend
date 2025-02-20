import React, { useState } from "react";
import { ShoppingCart, RulerIcon, EditIcon } from "lucide-react";
import FormField from "../../FormField";
import RooomBookingModel from "./RoomBookingModel";
import EditRoomPopupModel from "./EditRoomPopupModel";
const RoomCard = ({ room }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModelOpen(false);
  };

  return (
    <div className="flex items-center justify-start gap-6 p-2 my-5 bg-white border shadow-xl rounded-3xl">
      <img
        className="w-[385px] h-[250px] rounded-3xl shadow-md"
        src={`${import.meta.env.VITE_BASE_URL_IMAGES}${room.roomImages[0]}`}
        alt="Room Image"
      />
      <div className="flex flex-col flex-grow">
        {/* Room Details */}
        <div className="flex justify-between flex-1 w-full">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-[#001b1c] text-2xl font-semibold font-['Poppins']">
                {room.roomCategory}
              </h3>
              <div>
                <span className="text-[#001b1c] text-4xl font-semibold">
                  ${room.chargePerNight}
                </span>
                <span className="text-[#001b1c] text-lg font-semibold">/</span>
                <span className="text-[#001b1c] text-lg font-normal">
                  night
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <ShoppingCart />
                <span className="text-[#001b1c] text-sm font-medium">
                  Number of rooms: {room.numberOfRooms}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RulerIcon />
                <span className="text-[#001b1c] text-sm font-medium">
                  {room.roomSize} sq ft
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="h-12 p-4 text-[#08a5dc] font-bold text-lg rounded-lg shadow-lg flex justify-center items-center gap-2 border overflow-hidden"
              onClick={openModal}
            >
              Book now
            </button>
            <EditIcon
              className="text-gray-500 cursor-pointer"
              onClick={() => setIsEditModelOpen(true)}
            />
          </div>
        </div>
        {/* Additional Details */}
        <div
          className="flex justify-between flex-1 w-full mt-2"
          id="additional details"
        >
          <div className="flex flex-col justify-center w-1/3 gap-2">
            <div className="flex justify-between bg-[#f2f6ff] rounded-lg p-2">
              <span className="text-[#5c5c5c] text-lg font-medium">
                Discount
              </span>
              <span className="text-[#001b1c] text-lg font-bold">
                {room.discount}%
              </span>
            </div>
            <div className="flex justify-between bg-[#f2f6ff] rounded-lg p-2">
              <span className="text-[#5c5c5c] text-lg font-medium">
                Additional charges
              </span>
              <span className="text-[#001b1c] text-lg font-bold">
                ${room.additionalCharges}
              </span>
            </div>
            <div className="flex justify-between bg-[#f2f6ff] rounded-lg p-2">
              <span className="text-[#5c5c5c] text-lg font-medium">
                Capacity (beds)
              </span>
              <span className="text-[#001b1c] text-lg font-bold">2</span>
            </div>
          </div>
          <div className="flex flex-col w-1/3">
            <h4 className="mb-1 text-2xl font-semibold text-black">
              Facilities
            </h4>
            <div className="p-3 mr-5 bg-gray-100 rounded-lg">
              <ul className="text-[#001b1c]  font-semibold space-y-1 list-disc px-5 overflow-auto">
                {room.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <RooomBookingModel closeModal={closeModal} room={room} />}
      {isEditModelOpen && (
        <EditRoomPopupModel
          closeModel={() => setIsEditModelOpen(false)}
          room={room}
        />
      )}
    </div>
  );
};

export default RoomCard;
