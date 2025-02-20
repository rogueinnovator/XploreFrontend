import { useParams } from "react-router-dom";
import { useGetHotelById } from "../../api/hotel-api";
import { Loader2, FileText } from "lucide-react";
import { useUpdateHotelStatus } from "../../api/superAdmin-api.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SuperAdminHotelDetail = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [replyModelIsOpen, setReplyModelIsOpen] = useState(false);

  const { hotelData, isLoading, isError } = useGetHotelById(hotelId);
  const { updateHotelStatus, isLoading: isUpdateHotelStatusLoading } =
    useUpdateHotelStatus();

  const handleStatusUpdate = async (status, rejectionMessage = "") => {
    if (status === "Approved") {
      const response = await updateHotelStatus({ hotelId, status });
      if (response.success) {
        navigate("/super-admin/hotels-info");
      }
    } else if (status === "Rejected") {
      const response = await updateHotelStatus({
        hotelId,
        status,
        rejectionMessage,
      });
      if (response.success) {
        navigate("/super-admin/hotels-info");
      }
    }
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-2xl font-semibold">
        Some thing went wrong getting bookings
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="text-blue-500 size-12 animate-spin" />
      </div>
    );
  }

  //console.log(hotelData);

  return (
    <div>
      <div className="flex gap-4 mt-5">
        <div className="flex flex-col flex-1 gap-5 p-6 bg-white border-b shadow-lg rounded-xl">
          <div className="flex flex-col gap-5">
            <h2 className="text-[#3d425a] text-[32px] font-semibold leading-7">
              Pending Hotel Details
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { label: "Hotel ID:", value: hotelData._id },
                {
                  label: "Hotel Name:",
                  value: hotelData.hotelInformation.name,
                },
                {
                  label: "Hotel Location:",
                  value: hotelData.locationDetails.address,
                },
                {
                  label: "Contact:",
                  value: hotelData.contactInformation.phone,
                },
                {
                  label: "Status:",
                  value: hotelData.status,
                  textClass: "text-green-500",
                },
                { label: "Application Date:", value: hotelData.createdAt },
                {
                  label: "Total Rooms:",
                  value:
                    hotelData.hotelInformation.endingRoomNumber -
                    hotelData.hotelInformation.startingRoomNumber,
                },
                {
                  label: "Hotel Registration Number:",
                  value: "[Registration Number]",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="w-[150px] text-[#3d425a] text-base font-semibold">
                    {item.label}
                  </span>
                  <span
                    className={`text-[#3d425a] text-base font-normal ${
                      item.textClass || ""
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/*
            
            <div className="flex flex-col gap-5">
            <h3 className="text-[#3d425a] text-xl font-semibold">
              Additional Charges and Discounts
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { label: "Total Payable Now:", value: "15,000 PKR" },
                { label: "Balance Payable at Hotel:", value: "16,000 PKR" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-10">
                  <span className="w-40 text-[#3d425a] text-base font-semibold">
                    {item.label}
                  </span>
                  <span className="text-[#3d425a] text-base font-normal">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
            */}

          <div>
            <h3 className="text-[#3d425a] text-xl font-semibold">
              Hotel Registration Documents
            </h3>
            <div className="flex flex-wrap gap-3 mt-3">
              {hotelData?.hotelInformation?.registrationDocs?.map((doc, i) => (
                <div
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md"
                  key={i}
                >
                  <span>
                    <FileText className="text-red-500" />
                  </span>
                  <span className="px-3 py-2 text-gray-600 rounded-md ">
                    Name : {doc}
                  </span>
                  <a
                    href={`${import.meta.env.VITE_BASE_URL_IMAGES}${doc}`}
                    target="_blank"
                    className="ml-2 text-sm text-blue-500 cursor-pointer"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 ">
          <div>
            <img
              className="h-[50vh] w-full rounded-lg shadow-2xl"
              src={`${import.meta.env.VITE_BASE_URL_IMAGES}${
                hotelData?.hotelImages[0]
              }`}
              alt="hotel-image"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-5 pb-5 mt-5 font-bold ">
        <button
          disabled={
            isUpdateHotelStatusLoading || hotelData.status === "Rejected"
          }
          onClick={() => setReplyModelIsOpen(true)}
          className="px-5 py-2 text-blue-500 border border-blue-500 rounded-md disabled:cursor-not-allowed disabled:opacity-85"
        >
          Reject
        </button>
        <button
          disabled={
            isUpdateHotelStatusLoading || hotelData.status === "Approved"
          }
          onClick={() => handleStatusUpdate("Approved")}
          className="px-5 py-2 text-white bg-blue-500 rounded-md disabled:opacity-85 disabled:cursor-not-allowed"
        >
          {isUpdateHotelStatusLoading ? "Loading...." : "Approve"}
        </button>
      </div>

      {/* Reply Model */}
      <ReplyModel
        isOpen={replyModelIsOpen}
        setIsOpen={setReplyModelIsOpen}
        handleStatusUpdate={handleStatusUpdate}
        isUpdateHotelStatusLoading={isUpdateHotelStatusLoading}
      />
    </div>
  );
};

const ReplyModel = ({
  isOpen,
  setIsOpen,
  handleStatusUpdate,
  isUpdateHotelStatusLoading,
}) => {
  const [replyMessage, setReplyMessage] = useState("");

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-4/5 p-5 bg-white rounded-lg shadow-lg">
            {/* Close Button */}
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">
                Reasone Why The Request is Rejected
              </h2>
              <button
                className="p-2 bg-gray-200 rounded-full size-10"
                onClick={() => setIsOpen(!isOpen)}
              >
                ✕
              </button>
            </div>

            <div className="mt-5">
              <textarea
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full h-full px-4 py-3 text-base bg-gray-100 border rounded-lg shadow-md"
                placeholder="Enter Reasone Why The Request is Rejected"
              />
            </div>

            <div className="flex justify-end mt-5">
              <button
                disabled={isUpdateHotelStatusLoading}
                onClick={() => handleStatusUpdate("Rejected", replyMessage)}
                className="px-5 py-2 text-white bg-blue-500 rounded-md disabled:cursor-not-allowed disabled:opacity-85"
              >
                {isUpdateHotelStatusLoading ? "Loading..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminHotelDetail;
