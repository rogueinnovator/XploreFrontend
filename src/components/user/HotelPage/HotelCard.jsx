import { CheckCircle, Star } from "lucide-react";
import { useLocation } from "react-router-dom";
const HotelCard = () => {
  
    // const { refetch } = useGetSearchHotels(params, { enabled: false });

    const hotel = {
        hotelImages: ["https://prod-nishat-hotel.s3.eu-west-1.amazonaws.com/feature-images/173441619992.jpg"],
        hotelCategory: "Deluxe Room",
        chargePerNight: 120,
        hotelLocation: "Natia Gali pakistan",
        stars: 3,
        reviews: 124,
        bedType: "King Bed",
        facilities: ["Free WiFi", "Air Conditioning", "Swimming Pool", "Gym"]
    };
    return (
        <div className="mx-auto overflow-hidden bg-white border shadow-md rounded-xl">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3">
                    <img
                        src={hotel.hotelImages[0]}
                        alt="Deluxe Room"
                        className="object-cover w-full h-48 md:h-60"
                    />
                </div>
                <div className="flex flex-col justify-between flex-grow p-4">
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-lg font-semibold">{hotel.hotelCategory}</h1>
                                <h4 className=" text-sm text-gray-500">{hotel.hotelLocation}</h4>
                                <div className="flex flex-row">
                                    {[...Array(hotel.stars)].map((_, i) => (
                                        <Star key={i} fill="yellow" stroke="none" size={20} />
                                    ))}
                                    <h4 className="text-sm pl-3 text-gray-600">{hotel.stars} <span>({hotel.reviews} reviews)</span></h4>
                                </div>
                            </div>
                            dashboard
                            <div>
                                <p className="text-lg font-semibold">
                                    ${hotel.chargePerNight}
                                    <span className="text-sm text-gray-500">/night</span>
                                </p>
                                <p className="flex items-center gap-1 text-sm text-green-600">
                                    <CheckCircle size={16} /> Available
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {hotel.facilities?.map((feature) => (
                                <span
                                    key={feature}
                                    className="px-3 py-1 text-sm bg-gray-200 rounded-full"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button className="font-semibold text-blue-500 underline underline-offset-2">
                            View Details
                        </button>
                        <button className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HotelCard;
// SKELETON
export const SkeletonHotelCard = () => {
    return (
        <div className="mx-auto overflow-hidden bg-white border shadow-md rounded-xl animate-pulse mt-2">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 h-48 md:h-60 bg-gray-300"></div>
                <div className="flex flex-col justify-between flex-grow p-4">
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-2 w-2/3">
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                            </div>
                            <div className="w-1/3 h-5 bg-gray-300 rounded"></div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                            <div className="h-6 bg-gray-300 rounded w-16"></div>
                            <div className="h-6 bg-gray-300 rounded w-20"></div>
                            <div className="h-6 bg-gray-300 rounded w-12"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-10 bg-gray-300 rounded w-24"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
