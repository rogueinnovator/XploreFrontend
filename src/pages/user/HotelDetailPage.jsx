import React, { useEffect, useState } from "react";
import { useGetUserHotelById } from "../../api/user-api";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { Star, MapPin, Check, Phone, Mail, Globe } from "lucide-react";
import RoomCard from "../../components/user/HotelDetailPage/RoomCard";

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

const responsiveSimillarHotels = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 20,
  },
};

const HotelDetailPage = () => {
  const { id } = useParams();
  const params = useSearchParams()[0];
  const [checkInDate, setCheckInDate] = useState(
    params.get("checkInDate") || new Date().toISOString().split("T")[0]
  );
  const [checkOutDate, setCheckOutDate] = useState(
    params.get("checkOutDate") ||
      new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0]
  );

  const [guests, setGuests] = useState(params.get("guests") || 7);

  const { data, isError, isLoading, error, refetch } = useGetUserHotelById(
    id,
    checkInDate,
    checkOutDate,
    guests
  );
  const [showMoreRooms, setShowMoreRooms] = useState(false);
  const [showMoreReviews, setShowMoreReviews] = useState(false);

  const handleSearch = async () => {
    const res = await refetch();
    // console.log("reftech res:", res);
  };

  useEffect(() => {
    (async () => {
      await refetch();
    })();
  }, []);

  if (isError) {
    // console.log(error);
    return <h1>Error Fetching user hotel</h1>;
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!data?.hotel) {
    return <LoadingSkeleton />;
  }

  const roomsLength = data?.hotel?.rooms?.length;
  const reviewsLength = data?.hotel?.reviews?.length;

  return (
    <div className="">
      {/* Image Section ******************/}
      <div className="mx-0 md:mt-10 md:mx-10">
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={["mobile"]}
          showDots={true}
          customDot={<CustomDot />}
        >
          {data?.hotel?.hotelImages?.map((image, index) => {
            return (
              <img
                key={index}
                src={`${import.meta.env.VITE_BASE_URL_IMAGES}${image}`}
                alt="hotel image"
                className="object-fill w-full h-56 overflow-hidden border-2 md:object-cover md:h-80 lg:h-96 md:rounded-md "
              ></img>
            );
          })}
        </Carousel>
      </div>

      <div className="mx-4 md:mx-10">
        {/* Hotel info section *****************/}
        <div className="flex items-start justify-between mt-2 ">
          <div>
            <h1 className="text-2xl font-bold">
              {data?.hotel.hotelInformation.name}
            </h1>
            <div className="flex items-center gap-2">
              <span className="flex gap-1">
                {[...Array(5)].map((_, index) => {
                  const fillPercentage = Math.max(
                    0,
                    Math.min(1, data?.hotel.avgRating - index)
                  );

                  return (
                    <div key={index} className="relative size-5">
                      <Star
                        className="absolute top-0 left-0 text-[#e4e4e4] size-5"
                        fill="none"
                        stroke="#e4e4e4"
                      />
                      <div
                        className="absolute top-0 left-0 overflow-hidden"
                        style={{
                          width: `${fillPercentage * 100}%`,
                          height: "100%",
                        }}
                      >
                        <Star
                          size={20}
                          className="text-yellow-400"
                          fill="#facc15"
                        />
                      </div>
                    </div>
                  );
                })}
              </span>
              <span className="flex gap-1 text-gray-500">
                {`${data.hotel.avgRating} (${data.hotel.totalReviews} reviews)`}
              </span>
            </div>
            <p className="flex items-center gap-1 text-gray-500">
              <MapPin className="size-5" />
              <p>{data.hotel.locationDetails.address}</p>
            </p>
          </div>
          <div>
            <p className="text-gray-500">
              from{" "}
              <span className="text-xl font-medium text-black">
                ${data.hotel.minPrice}
              </span>{" "}
              per night
            </p>
          </div>
        </div>
        {/* Hotel search */}
        <div className="flex flex-col items-center justify-between w-full p-4 mx-auto my-5 space-y-2 bg-white border rounded-lg shadow-lg md:flex-row md:items-end">
          {/* Check-in Date */}
          <div className="flex flex-col flex-1 w-full">
            <label className="text-sm text-gray-600">Check-in</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full p-2 text-gray-700 border rounded-md "
            />
          </div>

          {/* Check-out Date */}
          <div className="flex flex-col flex-1 w-full md:ml-4">
            <label className="text-sm text-gray-600">Check-out</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full p-2 text-gray-700 border rounded-md "
            />
          </div>

          {/* Guests Selection */}
          <div className="flex flex-col flex-1 w-full md:ml-4">
            <label className="text-sm text-gray-600">Guests</label>
            <input
              type="number"
              min="0"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full p-2 text-gray-700 border rounded-md "
            />
          </div>

          {/* Modify Search Button */}
          <button
            onClick={handleSearch}
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md sm:w-auto md:mt-0 md:ml-4 hover:bg-blue-600"
          >
            Modify Search
          </button>
        </div>
        {/*Room Types **************** */}
        <div className="space-y-2">
          <h1 className="text-xl font-bold">Room Types</h1>
          <div className="space-y-5">
            {[
              ...Array(
                showMoreRooms ? roomsLength : roomsLength > 2 ? 2 : roomsLength
              ),
            ].map((_, index) => {
              return (
                <RoomCard
                  room={data?.hotel.rooms[index]}
                  hotelId={data?.hotel._id}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  guests={guests}
                  key={index}
                />
              );
            })}
          </div>

          {roomsLength > 2 && (
            <div className="flex justify-center my-4">
              <button
                onClick={() => setShowMoreRooms(!showMoreRooms)}
                className="px-2 py-1 font-semibold text-blue-500 border border-blue-500 rounded-md"
              >
                {showMoreRooms ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </div>
        {/*Reviews */}
        <div className="space-y-2">
          <h1 className="text-xl font-bold">Reviews</h1>
          <div className="space-y-5">
            {[
              ...Array(
                showMoreReviews
                  ? reviewsLength
                  : reviewsLength > 2
                  ? 2
                  : reviewsLength
              ),
            ].map((_, index) => {
              const review = data?.hotel?.reviews[index];
              return (
                <div
                  key={index}
                  className={`p-2 border shadow-md rounded-xl border-md transition duration-1000 translate-x-0 `}
                >
                  <h1 className="font-semibold ">
                    {review.reviewerName}{" "}
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </h1>
                  <p className="flex items-center gap-1">
                    <Star className="text-yellow-400 size-5 " />
                    <p className="text-sm font-semibold">{review.rating}</p>
                  </p>
                  <p>{review.reviewDescription}</p>
                </div>
              );
            })}
          </div>

          {reviewsLength > 2 && (
            <div className="flex justify-center my-4">
              <button
                onClick={() => setShowMoreReviews(!showMoreReviews)}
                className="px-2 py-1 font-semibold text-blue-500 border border-blue-500 rounded-md"
              >
                {showMoreReviews ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </div>
        {/* Amenities ***************/}
        <div className="space-y-2">
          <h1 className="text-xl font-bold">Facilities And Amenities</h1>
          <div className="grid grid-cols-2 gap-3 p-6 md:grid-cols-3 lg:grid-cols-4">
            {data?.hotel?.facilities?.map((facility, index) => {
              return (
                <div key={index} className="flex items-center gap-1">
                  <Check className="text-blue-500" />
                  <p>{facility}</p>
                </div>
              );
            })}
          </div>
        </div>
        {/* Location *****************/}
        <div className="space-y-2">
          <h1 className="text-xl font-bold">Location</h1>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Address & Coordinates */}
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Address & Coordinates
              </h3>
              <div className="space-y-2 text-gray-500">
                <p>{data?.hotel.locationDetails.address}</p>
                <p>
                  GPS Coordinates:{" "}
                  {data?.hotel.locationDetails.gpsCordinates.longitude}° N,{" "}
                  {data?.hotel.locationDetails.gpsCordinates.latitude}° E
                </p>
              </div>
            </div>

            {/* Accessibility */}
            <div>
              <h3 className="mb-2 text-lg font-semibold">Accessibility</h3>
              <ul className="space-y-2 text-gray-500">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-500" /> Easy road access
                  from main highways
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-500" /> Complimentary
                  on-site parking
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-500" /> Airport shuttle
                  service available
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-500" /> Valet parking
                  service
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Contact Information
              </h3>

              <div className="space-y-2 text-gray-500">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-500" /> +92 51 111 505 505
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />{" "}
                  reservations@pchotels.com
                </p>
                <p className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" /> www.pchotels.com
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* simillar hotels */}
        {data?.simillarHotels?.length !== 0 && (
          <div className="space-y-2">
            <h1 className="text-xl font-bold">Simillar Hotels</h1>
            <Carousel
              responsive={responsiveSimillarHotels}
              removeArrowOnDeviceType={["mobile"]}
              partialVisbile={data?.simillarHotels?.length === 1 ? false : true}
              itemClass="px-1"
            >
              {data.simillarHotels.map((hotel) => (
                <div className="max-w-sm overflow-hidden bg-white rounded-lg shadow-lg">
                  {/* Hotel Image */}
                  <img
                    src={`${import.meta.env.VITE_BASE_URL_IMAGES}${
                      hotel.image
                    }`} // Replace with actual image
                    alt={hotel.name}
                    className="object-fill w-full h-48"
                  />

                  {/* Hotel Details */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{hotel.name}</h2>

                    {/* Rating & Reviews */}
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="ml-1 font-medium">
                        {hotel.avgRating}
                      </span>
                      <span className="ml-1">
                        ({hotel.totalReviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <p className="mt-1 text-gray-500">
                      From ${hotel.minPrice} per night
                    </p>

                    {/* Button */}
                    <Link
                      to={`/hotel/${hotel._id}`}
                      className="hidden w-full py-2 mt-3 font-medium text-center text-blue-600 transition border border-blue-600 rounded-lg md:block hover:bg-blue-600 hover:text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Image Section Skeleton */}
      <div className="mx-0 md:mt-10 md:mx-10">
        <div className="w-full h-56 bg-gray-300 rounded-md md:h-80 lg:h-96"></div>
      </div>

      {/* Room Types Skeleton */}
      <div className="mx-4 mt-6 space-y-4 md:mx-10">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="p-4 space-y-3 bg-gray-100 rounded-lg">
            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Location Skeleton */}
      <div className="mx-4 mt-6 space-y-4 md:mx-10">
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Hotels Skeleton */}
      <div className="mx-4 mt-6 space-y-4 md:mx-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-4 space-y-3 bg-gray-100 rounded-lg">
              <div className="h-32 bg-gray-300 rounded"></div>
              <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CustomDot = ({ onMove, index, onClick, active }) => {
  return (
    <li
      className={`size-3 mx-1 rounded-full mb-5 ${
        active ? "bg-white" : "bg-gray-400"
      }`}
      onClick={() => onClick()}
    ></li>
  );
};

export default HotelDetailPage;
