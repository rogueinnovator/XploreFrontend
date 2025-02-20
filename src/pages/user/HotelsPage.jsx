import React, { useEffect, useState } from "react";
import { useGetSearchHotels } from "../../api/user-api";
import { useLocation } from "react-router-dom";
import SearchSection from "../../components/user/HomePage/SearchSection";
import { Filter, FilterPopUp } from "../../components/user/HotelPage/Filter";
import HotelCard, {
  SkeletonHotelCard,
} from "../../components/user/HotelPage/HotelCard";
import { ChevronDown } from "lucide-react";
const HotelsPage = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [values, setValues] = useState([]);
  const search = useLocation().search;
  const filterTypes = ["Stars Rating", "Property Type", "Amenities"];

  const handleFilterClick = (e, item) => {
    e.preventDefault();
    // setFilterType(item);
    if (item === "Stars Rating") {
      setCheckBox(false);
      setShowPopUp(true);
      setValues("starRating");
    } else if (item === "Property Type") {
      setCheckBox(false);
      setShowPopUp(true);
      setValues("propertyType");
    } else if (item === "Amenities") {
      setShowPopUp(true);
      setCheckBox(true);
      setValues("amenities");
    }
  };
  const params = new URLSearchParams(search);
  useEffect(() => {});
  const { data, isLoading } = useGetSearchHotels(params);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = data?.totalPages || 3;
  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {showPopUp && (
        <div className="z-20 w-screen h-screen mt-2 border-t shadow-xl  rounded-xl">
          <FilterPopUp
            setShowPopUp={setShowPopUp}
            filterOption={values}
            checkBox={checkBox}
          />
        </div>
      )}
      {!showPopUp && (
        <div className="mb-96 mx-[32px]">
          <div className="p-3 my-3 border shadow-md rounded-xl">
            <SearchSection />
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="md:block">
              <Filter />
            </div>
            <div
              className="w-full h-12 overflow-x-auto bg-white border rounded-lg shadow-md md:hidden"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div
                className="flex items-center px-2 py-1 space-x-3 w-max"
                style={{
                  overflowX: "scroll",
                  whiteSpace: "nowrap",
                }}
              >
                {filterTypes.map((item, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      handleFilterClick(e, item);
                    }}
                    className="px-2 py-1 border rounded-lg shadow-lg"
                  >
                    <span className="flex flex-row items-center justify-center gap-2">
                      {item} <ChevronDown size={16} />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 md:ml-4">
              <div className="items-center hidden w-full h-16 px-4 mb-4 bg-white border rounded-lg shadow-sm md:flex md:justify-between">
                <h2 className="font-semibold">Hotels found</h2>
              </div>

              {/* {isLoading ? (
                        <>
                            <SkeletonHotelCard />
                            <SkeletonHotelCard />
                            <SkeletonHotelCard />
                        </>
                    ) : (
                        data?.hotels?.length > 0 ? (
                            data.hotels.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)
                        ) : (
                            <p className="text-lg font-semibold text-center">No hotels found</p>
                        )
                    )} */}

              {/* Pagination Controls */}
              <div className="flex justify-center w-full mt-4 space-x-2">
                <button
                  className={`px-3 py-2 border rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "hover:bg-[#1570EF] hover:text-white text-black/75"
                  }`}
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      className={`px-3 py-2 border rounded-lg ${
                        currentPage === pageNumber
                          ? "bg-[#1570EF] text-white"
                          : "hover:bg-[#1570EF] hover:text-white text-black/75"
                      }`}
                      onClick={() => goToPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  className={`px-3 py-2 border rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "hover:bg-[#1570EF] hover:text-white text-black/75"
                  }`}
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelsPage;
