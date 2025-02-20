import React, { useState } from "react";
import { ChevronDown, SearchIcon } from "lucide-react";
import { roomType } from "../../utili/constants";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useGetAllCustomers,useSearchCustomers } from "../../api/superAdmin-api";
const SuperAdminCustomers = () => {
  const [showDay, setShowDay] = useState(false);
  const [day, setDay] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
 const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, refetch, isFetching } = useGetAllCustomers({
    page: currentPage,
    dateRange: day.item,
  });

   const {
      data: searchData,
      isLoading: isSearchLoading,
      isError: isSearchError,
      refetch: refetchSearch,
    } = useSearchCustomers({ searchQuery, page: currentPage });

      useEffect(() => {
        (async () => {
          await refetch();
        })();
      }, [currentPage, day]);



  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    (async () => {
     // console.log(searchQuery);
      if (searchQuery.trim() === "") return;
      await refetchSearch();
    })();
  }, [searchQuery, currentPage]);

  if (isError) {
    return (
      <div className="h-screen w-full flex justify-center items-center font-semibold text-2xl">
        Some thing went wrong getting Customers
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="size-12 animate-spin text-blue-500" />
      </div>
    );
  }

  // console.log(data);

  return (
    <div className="w-full h-auto p-4 bg-white rounded-xl shadow-lg border-b flex-col justify-start items-start gap-4 inline-flex overflow-hidden mt-4">
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="flex items-center gap-4 text-[#001c1c] text-2xl font-semibold leading-7">
          <div>Customers</div>
          <div className="w-[249px] h-[38px] px-2 py-1 bg-[#f2f6ff] rounded-lg shadow-lg flex items-center gap-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <SearchIcon className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-gray-300 text-base  outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="justify-end items-center gap-3 flex">
          <div className="text-[#3d425a] text-sm font-semibold leading-tight">
            Filter by
          </div>
          <button
            onClick={() => {
              setShowDay(!showDay);
            }}
            className="flex border px-4 py-1 rounded-xl justify-center gap-2  items-center text-[#a1a1a1] font-medium"
          >
            {day.label}
            <span>
              <ChevronDown
                className={`${
                  showDay ? "rotate-180 duration-300" : ""
                } duration-300`}
              />
            </span>
          </button>
        </div>
      </div>
      {showDay && (
        <ul className="absolute flex flex-col  right-14 w-28 max-h-40 mt-9 bg-white border shadow-lg z-10 overflow-x-hidden rounded-lg">
          {[
            {
              label: "Today",
              item: "today",
            },
            {
              label: "Yesterday",
              item: "yesterday",
            },
            {
              label: "Week",
              item: "week",
            },
            {
              label: "Month",
              item: "month",
            },
          ].map((item, index) => (
            <button
              onClick={() => {
                setDay(item);
                setShowDay(!showDay);
              }}
              key={index}
              className="px-3 py-1 text-left hover:bg-gray-200 overflow-y-auto"
            >
              {item.label}
            </button>
          ))}
        </ul>
      )}

      {data?.customers?.length === 0 ? (
        <div className=" w-full flex justify-center items-center font-semibold text-2xl">
          No Customers found
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full flex flex-col items-start">
            {/* Header */}
            <div className="flex w-full px-4 py-3 rounded-xl border border-[#e4e4e4] mb-3">
              {["Name ", "Phone", "Email", "Address"].map((item, index) => (
                <div
                  key={index}
                  className="w-1/5 text-center text-[#08a5dc] text-base font-medium"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Rows */}
            <div className="w-full flex flex-col items-start gap-2.5">
              { (searchData?.customers || data?.customers)?.map((customer, index) => (
                <div
                  key={index}
                  className="flex items-center w-full h-10 px-4 bg-[#fafbff] rounded-[10px]"
                >
                  {["name", "phone", "email", ""].map((key, i) => (
                    <div key={i} className="w-1/5 text-center py-2">
                      <div className="text-[#3d425a] text-base font-medium">
                        {customer[key]}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {data.totalPages > 1 && (
            <div className="w-full flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-2  rounded-md border"
              >
                <ChevronLeft />
              </button>
              <div className="flex justify-center items-center gap-3 mx-5 border px-2">
                <span>{currentPage}</span>{" "}
                <div className="w-1 h-full border-l"></div>
                <span>{data.totalPages}</span>
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === data.totalPages}
                className="px-2 py-2  rounded-md border"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

 
export default SuperAdminCustomers;
