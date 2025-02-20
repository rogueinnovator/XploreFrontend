import { User, BedDouble, Bath, X, Check } from "lucide-react";
import React from "react";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const RoomModal = ({ room, setShowModal, isVisible }) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        setShowModal(false);
      }}
      className="fixed inset-0 z-50 flex items-end justify-end bg-black/50 "
    >
      {/* Main Content*/}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: "none",
        }}
        className={`relative bg-white h-[80%] w-full rounded-tl-xl rounded-tr-xl overflow-y-auto md:w-[30%] md:h-screen md:rounded-none `}
      >
        {/* Images */}
        <div className="relative">
          {/* Cross Button*/}
          <div
            onClick={() => setShowModal(false)}
            className="absolute z-50 flex items-center justify-center rounded-full cursor-pointer top-2 left-2 size-10 bg-black/70"
          >
            <X className="text-white " />
          </div>
          <Carousel
            responsive={responsive}
            arrows={false}
            showDots={true}
            customDot={<CustomDot />}
          >
            {room.roomImages.map((image, index) => {
              return (
                <img
                  key={index}
                  src={`${import.meta.env.VITE_BASE_URL_IMAGES}${image}`}
                  alt="Deluxe Room"
                  className="object-cover w-full h-48 md:h-60"
                />
              );
            })}
          </Carousel>
        </div>

        {/* Room Info */}
        <div className="px-2 mt-5 space-y-2 ">
          <div className="flex justify-between flex-1">
            <p className="flex-1 font-semibold text-gray-900">Room Category </p>
            <p className="flex-1 text-start">{room.roomCategory}</p>
          </div>
          <div className="flex justify-between ">
            <p className="flex-1 font-semibold text-gray-900 ">Room Type </p>
            <p className="flex-1 text-start">{room.roomType}</p>
          </div>
          <div className="flex justify-between ">
            <p className="flex-1 font-semibold text-gray-900">Bed Type </p>
            <p className="flex-1 text-start">{room.bedType}</p>
          </div>
          <div className="flex justify-between ">
            <p className="flex-1 font-semibold text-gray-900">
              Maximum Occupancy
            </p>
            <p className="flex-1 text-start">{room.maximumOccupancy}</p>
          </div>
          <div className="flex justify-between ">
            <p className="flex-1 font-semibold text-gray-900">Room Size</p>
            <p className="flex-1 text-start">{room.roomSize}</p>
          </div>

          <div>
            <hr className="my-4 border-gray-300" />
          </div>
        </div>

        {/* Amenities */}

        <div className="px-2 mb-56">
          <h1 className="text-xl font-semibold text-gray-900">Amenities</h1>
          <div className="grid grid-cols-2 gap-3 p-2">
            {room?.facilities.map((facility, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-1 text-nowrap"
                >
                  <Check className="text-blue-500" />
                  <p>{facility}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Price and other info */}
        <div className=" fixed bottom-0 bg-white right-0 z-50 w-full md:w-[30%]  p-5  space-y-3  border-t border-gray-200  shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <div className="flex gap-3 ">
            {room.discount > 0 && (
              <div className="px-4 py-1 font-semibold text-green-600 bg-green-200 rounded-md w-fit">
                {room.discount}% discount applied
              </div>
            )}

            {room.additionalCharges > 0 && (
              <div className="px-4 py-1 font-semibold text-orange-500 bg-orange-200 rounded-md w-fit">
                ${room.additionalCharges}/extra person
              </div>
            )}
          </div>

          <div>
            {room.discount === 0 ? (
              <p className="text-2xl font-bold text-blue-500 md:text-4xl ">
                ${room.chargePerNight}
              </p>
            ) : (
              <div>
                <p className="text-2xl font-bold text-blue-500 md:text-4xl ">
                  <span className="text-lg font-normal text-gray-500 line-through">
                    ${room.chargePerNight}
                  </span>{" "}
                  $
                  {room.chargePerNight -
                    (room.chargePerNight * room.discount) / 100}
                </p>
              </div>
            )}
          </div>

          <div>
            <div></div>
          </div>
          <button className="w-full py-2 text-white bg-blue-500 rounded-md">
            See Options
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomDot = ({ onMove, index, onClick, active }) => {
  return (
    <li
      className={`size-3 mx-1 rounded-full mb-5 ${
        active ? "bg-blue-500" : "bg-gray-400"
      }`}
      onClick={() => onClick()}
    ></li>
  );
};

export default RoomModal;
