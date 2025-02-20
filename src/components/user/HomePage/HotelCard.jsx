import { Star } from "lucide-react";
import React, { memo } from "react";
import { Link } from "react-router-dom";
const BASE_URL_IMAGES = import.meta.env.VITE_BASE_URL_IMAGES;
const HotelCard = ({ specialDeal = false, hotel }) => {
  if (!hotel) {
    return null;
  }
  return (
    <div className="max-w-sm overflow-hidden bg-white border rounded-lg shadow-sm min-w-max">
      <Link to={`/hotel/${hotel._id}`}>
        <img
          src={`${BASE_URL_IMAGES}${hotel?.image}`}
          alt={hotel?.name}
          className="object-fill w-full overflow-hidden h-36 md:h-40 lg:h-48"
        />
        <div className="p-4">
          {specialDeal && (
            <div className="font-medium text-[#991B1B] bg-[#991B1B]/20 w-fit rounded-md px-2 py-1 my-1">
              Save {hotel?.discount} %
            </div>
          )}
          <h3 className="text-lg font-semibold">{hotel?.name}</h3>
          <p className="text-sm text-gray-500">{hotel?.city}</p>
          {/* Rating */}
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <Star className="w-4 h-4 mr-1 text-yellow-500" fill="yellow" />
            <span className="font-medium">{hotel?.avgRating ?? 0}</span>
            <span className="ml-1 text-gray-500">({hotel?.totalReviews})</span>
          </div>
          {/* Price */}
          {specialDeal ? (
            <div className="flex justify-between mt-3">
              <div className="space-x-2">
                <span className="text-2xl font-semibold text-blue-500">
                  ${hotel?.discountedPrice}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${hotel?.originalPricePerNight}
                </span>
              </div>
              <div>
                <button className="bg-[#1570EF] text-white px-4 py-2 rounded-md">
                  Book Now
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3 text-lg font-semibold">
              <span className="text-black">${hotel?.pricePerNight}</span>
              <span className="text-sm text-gray-500">/night</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default memo(HotelCard);
