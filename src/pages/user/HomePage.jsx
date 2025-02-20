import React, { lazy, Suspense } from "react";
import MountainImage from "../../../public/mountain-image.jpg";
import ExploreSection from "../../components/user/HomePage/ExploreSection";
import NearHotels from "../../components/user/HomePage/NearHotel";
import PopularHotels from "../../components/user/HomePage/PopularHotels";
import SearchSection from "../../components/user/HomePage/SearchSection";
import SpecialDeals from "../../components/user/HomePage/SpecialsDeals";

const HomePage = () => {
  return (
    <div>
      {/* IMAGE*/}
      <div className="relative flex flex-col items-center justify-center w-full text-white lg:h-screen">
        {/* BG IMG */}
        <div className="absolute inset-0">
          <img
            src={MountainImage}
            alt="Mountain Image"
            className="object-cover w-full h-full"
          />
          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        {/* TEXT */}
        <h1 className="relative z-10 mt-5 text-2xl font-bold text-center md:text-4xl lg:text-6xl ">
          Xplore Hotel Booking Platform
        </h1>
        <p className="relative z-10 mt-4 font-medium text-center">
          Revitalizing Tourism in Dir, Malakand, Swat, Mardan, Jabba & Kumrat
          Valley
        </p>
        {/* SEARCH SECTION */}
        <div className="w-full px-4 md:px-0 flex justify-center relative z-10 mt-5 -bottom-10">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-2xl w-full max-w-lg md:max-w-2xl lg:max-w-4xl">
            <SearchSection />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-16">
        {/* HOTEL IN UR AREA */}
        <NearHotels />
        {/* EXPLORE SECTION */}
        <div className="mt-14 ">
          <ExploreSection />
        </div>

        {/* POPULAR SECTION  */}
        <div className="mt-14 ">
          <PopularHotels />
        </div>
        {/* SPECIAL DEALS  */}
        <div className="mt-14">
          <SpecialDeals />
        </div>
      </div>
    </div>

  );
};

export default HomePage;
