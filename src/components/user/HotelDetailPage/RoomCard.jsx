import { Bed, Ruler, Users, CheckCircle } from "lucide-react";
import { useState } from "react";
import RoomModal from "./RoomModal";
import { Link } from "react-router-dom";

const RoomCard = ({ room, hotelId, checkInDate, checkOutDate, guests }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mx-auto overflow-hidden bg-white border shadow-md rounded-xl">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/4 lg:w-[30%]">
          <img
            src={`${import.meta.env.VITE_BASE_URL_IMAGES}${room.roomImages[0]}`} // Replace with actual image URL
            alt="Deluxe Room"
            className="object-cover w-full h-48 md:h-60"
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between flex-grow p-4">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">{room.roomCategory}</h1>
              <div>
                <p className="text-lg font-semibold">
                  ${room.chargePerNight}
                  <span className="text-sm text-gray-500">/night</span>
                </p>
                <p className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle size={16} /> Available
                </p>
              </div>
            </div>
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Ruler size={16} /> <span>{room.roomSize} m²</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={16} />{" "}
                <span>Up to {room.maximumOccupancy} guests</span>
              </div>
              <div className="flex items-center gap-1">
                <Bed size={16} /> <span>{room.bedType}</span>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mt-3">
              {room.facilities?.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 text-sm bg-gray-200 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="font-semibold text-blue-500 underline underline-offset-2"
            >
              Room More Details
            </button>
            <Link
              to={`/booking/${hotelId}/${room._id}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guests}`}
              className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {showModal && (
        <RoomModal
          room={room}
          setShowModal={setShowModal}
          isVisible={showModal}
        />
      )}
    </div>
  );
};

export default RoomCard;
