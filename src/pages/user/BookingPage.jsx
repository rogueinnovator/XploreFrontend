import React from "react";
import { useBookRoom, useGetHotelRoom } from "../../api/user-api";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react";

const BookingPage = () => {
  const { hotelId, roomId } = useParams();
  const { data, isLoading, isError, error } = useGetHotelRoom(hotelId, roomId);
  const { mutateAsync: bookRoom, isLoading: isBookingLoading } = useBookRoom();

  // const [checkInDate, setCheckInDate] = useState();
  // const [checkOutDate, setCheckOutDate] = useState();
  // const [adults, setAdults] = useState();
  // const [childrens, setChildrens] = useState();
  const params = useSearchParams()[0];
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [specialRequests, setSpecialRequests] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      hotelId: hotelId,
      roomId: roomId,
      guestName: firstName + " " + lastName,
      numberOfGuests: params.get("guests"),
      contactNumber: phoneNumber,
      email: email,
      specialRequests: specialRequests,
      checkInDate: params.get("checkInDate"),
      checkOutDate: params.get("checkOutDate"),
    };

    await bookRoom(data);
  };

  if (isLoading) {
    return <h1>Loading.........</h1>;
  }

  if (isError) {
    // console.log(error);
    return <h1>Some thing went wrong</h1>;
  }

  return (
    <div>
      <form
        className="flex flex-col gap-5 p-5 lg:flex-row "
        onSubmit={handleSubmit}
      >
        <div className="space-y-6  lg:w-[70%]">
          {/* Room Selection Field*/}
          <div className="p-6 space-y-3 bg-white border rounded-lg shadow-md ">
            {/* Hotel Info*/}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{data.hotel.name} </h1>
              <p className="text-gray-500 ">{data.hotel.address}</p>
              <p className="flex items-center gap-1 text-gray-500">
                <Star className="text-yellow-400 size-5" />
                {data.hotel.avgReview} ({data.hotel.totalReviews} reviews)
              </p>
            </div>
            {/*  <h2 className="text-xl font-semibold ">Room Selection</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-gray-700">Check-in Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">Check-out Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 gird-col-1 md:grid-cols-2">
              <div>
                <label className="block text-gray-700">Adults</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                >
                  {[...Array(10).keys()].map((n) => (
                    <option key={n} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Childrens</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={childrens}
                  onChange={(e) => setChildrens(e.target.value)}
                >
                  {[...Array(10).keys()].map((n) => (
                    <option key={n} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}
          </div>

          {/* Guest Information */}
          <div className="p-6 space-y-3 bg-white border rounded-lg shadow-md ">
            <h2 className="text-xl font-semibold ">Guest Information</h2>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-gray-700">Special Requests</label>
              <textarea
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Enter any special requests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Payment Information */}
          <div className="p-6 space-y-3 bg-white border rounded-lg shadow-md ">
            <h2 className="text-xl font-semibold ">Payment Information</h2>

            {/* Card Number */}
            <div>
              <label className="block text-gray-600">Card Number</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            {/* Expiration Date & CVV */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-gray-600">Expiration Date</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-gray-600">CVV</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                />
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <label className="block text-gray-600">Billing Address</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter billing address"
              />
            </div>
          </div>
        </div>
        {/*Booking Summary  */}
        <div className="flex-1 w-full p-5 mx-auto overflow-hidden bg-white border rounded-lg shadow-lg h-fit">
          {/* Header */}
          <h2 className="mb-3 text-lg font-semibold">Booking Summary</h2>
          {/* Image */}
          <img
            src={`${import.meta.env.VITE_BASE_URL_IMAGES}${
              data.room.roomImages[0]
            }`}
            alt="Hotel Room"
            className="object-cover w-full h-48 rounded-lg"
          />
          {/* Booking Info*/}

          <div className="py-4 mt-4 border-b">
            <div className="flex justify-between text-gray-700">
              <span>Check in date</span>
              <span className="font-semibold">{params.get("checkInDate")}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Check out date</span>
              <span className="font-semibold">
                {params.get("checkOutDate")}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Nights</span>
              <span className="font-semibold">
                {Math.ceil(
                  (new Date(params.get("checkOutDate")) -
                    new Date(params.get("checkInDate"))) /
                    (1000 * 60 * 60 * 24)
                )}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Guests</span>
              <span className="font-semibold">{params.get("guests")}</span>
            </div>
          </div>
          {/* Pricing Details */}
          <div className="mt-4">
            <div className="flex justify-between text-gray-700">
              <span>Room Rate (per night)</span>
              <span className="font-semibold">${data.room.chargePerNight}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Taxes & Fees</span>
              <span className="font-semibold">
                ${data.room.additionalCharges}
              </span>
            </div>
            {data.room.discount !== 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Discount </span>
                <span className="font-semibold">
                  {data.room.discount}% (-$
                  {(
                    (data.room.chargePerNight * data.room.discount) /
                    100
                  ).toFixed(2)}
                  )
                </span>
              </div>
            )}
          </div>
          {/* Total Amount */}
          <div className="pt-3 mt-3 border-t">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span>
                $
                {data.room.chargePerNight +
                  data.room.additionalCharges -
                  (
                    (data.room.chargePerNight * data.room.discount) /
                    100
                  ).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Included Amenities */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-600">
              Included Amenities:
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.room.facilities.map((amenity, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs text-gray-700 bg-gray-200 rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
          {/* Cancellation Policy */}
          <div className="mt-4 text-sm text-gray-600">
            <h3 className="font-semibold">Cancellation Policy:</h3>
            <p>
              {data.hotel.cancellationPolicy === ""
                ? "No Cancellation Policy"
                : data.hotel.cancellationPolicy}
            </p>
          </div>
          {/* Action Buttons */}
          <div className="mt-5">
            <button className="w-full py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
              {isBookingLoading ? "Loading..." : "Confirm Booking"}
            </button>
            <button className="w-full py-2 mt-2 transition border rounded-lg hover:bg-gray-100">
              Save as Draft
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingPage;
