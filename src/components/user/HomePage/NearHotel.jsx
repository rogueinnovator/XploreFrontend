import HotelCard from "./HotelCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useGetNearHotels } from "../../../api/user-api";
import CardSkeleton from "../CardSkeleton";
import { Link } from "react-router-dom";

const NearHotels = () => {
  const params = {
    latitude: "34.6694478",
    longitude: "72.0505095",
    maxDistance: "5000", // in meters
  };
  const { data, isLoading, isError } = useGetNearHotels(params);
  const responsive = {
    superLargeDesktop: {
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
      partialVisibilityGutter: 30,
    },
  };

  return (
    <>
      <div className="flex justify-between items-center text-[#1570EF] px-4">
        <h1 className="text-xl font-semibold">Hotels in your area</h1>
      </div>
      <div className="flex px-2 mt-5 bg-white">
        {isError ? (
          <h1>Some Thing Went Wrong </h1>
        ) : (
          <Carousel
            responsive={responsive}
            containerClass="w-full relative"
            itemClass="px-2"
          >
            {isLoading ? (
              Array(4)
                .fill()
                .map((_, index) => <CardSkeleton key={index} />)
            ) : data?.hotels?.length !== 0 ? (
              data?.hotels?.map((hotel, index) => (
                <Link to="hotel-details">
                  {" "}
                  <HotelCard key={index} hotel={hotel} />
                </Link>
              ))
            ) : (
              <h1>No Hotels Found</h1>
            )}
          </Carousel>
        )}
      </div>
    </>
  );
};

export default NearHotels;
