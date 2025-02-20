import React from "react";
import HotelCard from "./HotelCard"; // Ensure this path is correct
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons
import { useGetPopularHotels } from "../../../api/user-api";
import CardSkeleton from "../CardSkeleton";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const PopularHotels = () => {
  const { data, isLoading, isError } = useGetPopularHotels();
  return (
    <div className="mt-14">
      <div className="flex justify-between items-center text-[#1570EF] px-4">
        <h1 className="text-xl font-semibold">
          Popular with travelers from pakistan{" "}
        </h1>
      </div>
      <div className="flex px-2 mt-5 bg-white ">
        {isError ? (
          <h1>Some Thing Went Wrong </h1>
        ) : (
          <Carousel
            responsive={responsive}
            containerClass="w-full relative"
            itemClass="px-2"
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            removeArrowOnDeviceType={["mobile", "tablet"]}
            // shouldRenderAt={["desktop"]}
          >
            {isLoading ? (
              Array(4)
                .fill()
                .map((_, index) => <CardSkeleton key={index} />)
            ) : data?.hotels?.length !== 0 ? (
              data?.hotels?.map((hotel, index) => (
                <HotelCard key={index} hotel={hotel} />
              ))
            ) : (
              <h1>No Hotels Found</h1>
            )}
          </Carousel>
        )}
      </div>
    </div>
  );
};

const CustomLeftArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="group-hover:block  z-20 absolute top-[50%] -translate-x-0 translate-y-[-50%] left-3 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer "
  >
    <ChevronLeft size={24} className="transition-transform hover:scale-110" />
  </div>
);

// Custom Right Arrow
const CustomRightArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="group-hover:block z-20 absolute top-[50%] -translate-x-0 translate-y-[-50%] right-3 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer "
  >
    <ChevronRight size={24} className="transition-transform hover:scale-110" />
  </div>
);

export default PopularHotels;
