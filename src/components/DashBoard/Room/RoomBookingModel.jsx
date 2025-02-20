import { Controller, useForm } from "react-hook-form";
import { bookingStatus, paymentStatus } from "../../../utili/constants";
import FormField from "../../FormField";
import NumberDropdown from "./NumberDropdown";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "../../../validation-schemas/booking-schema";
import { useCreateBooking, useGetBookedRooms } from "../../../api/booking-api";
import { useOwnerContext } from "../../../context/OwnerContext";
import { isError } from "react-query";

const RooomBookingModel = ({ closeModal, room }) => {
  const { user } = useOwnerContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: "",
      contactNumber: "",
      numberOfGuests: 0,
      checkInDate: "",
      checkOutDate: "",
      bookingStatus: bookingStatus[0].value,
      paymentStatus: paymentStatus[0].value,
      selectedRooms: [],
    },
  });

  const checkInDate = watch("checkInDate");
  const checkOutDate = watch("checkOutDate");

  const [selectedRooms, setSelectedRooms] = useState([]);
  const {
    data,
    isLoading: isLoadingBookedRooms,
    isError: isErrorBookedRooms,
    refetch: refetchBookedRooms,
  } = useGetBookedRooms({
    roomId: room?._id,
    checkInDate,
    checkOutDate,
  });

  const { createNewBooking, isLoading } = useCreateBooking();

  const handleRoomClick = (number, field) => {
    setSelectedRooms((prev) => {
      let newList = prev.includes(number)
        ? prev.filter((num) => num !== number)
        : [...prev, number];

      field.onChange(newList);
      return newList;
    });
  };

  const onSubmit = async (data) => {
    // console.log("booking submit  data:", data);

    await createNewBooking({
      ...data,
      hotelId: user.hotelId,
      roomId: room._id,
    });

    closeModal();
  };

  useEffect(() => {
    if (checkInDate && checkOutDate && checkInDate <= checkOutDate) {
      refetchBookedRooms();
    }
  }, [checkInDate, checkOutDate]);

  // console.log("Booking loading : ", isLoadingBookedRooms);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg w-[40%] overflow-y-auto h-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <h2 className="mb-2 text-xl font-bold">Add New Booking</h2>
        <div className="flex justify-between mb-2">
          <p className="text-lg font-bold">Add Guest Detail below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                name: "guestName",
                label: "Guest Name",
                type: "text",
                rules: { required: "Guest Name is required" },
              },
              {
                name: "contactNumber",
                label: "Contact Number",
                type: "number",
                rules: {
                  required: "Contact Number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Contact Number must be numeric",
                  },
                },
              },

              {
                name: "checkInDate",
                label: "Check-in Date",
                type: "date",
                minDate: new Date().toISOString().split("T")[0],
                rules: { required: "Check-in Date is required" },
              },
              {
                name: "checkOutDate",
                label: "Check-out Date",
                type: "date",
                minDate: checkInDate || new Date().toISOString().split("T")[0],
                rules: { required: "Check-out Date is required" },
              },
              {
                name: "numberOfGuests",
                label: "Number of Guests",
                type: "number",
                rules: {
                  required: "Number of Guests is required",
                  min: { value: 1, message: "At least one guest is required" },
                },
              },
              {
                name: "bookingStatus",
                label: "Booking Status",
                type: "select",
                options: bookingStatus,
              },

              {
                name: "paymentStatus",
                label: "Payment Status",
                type: "select",
                options: paymentStatus,
              },
            ].map((fieldConfig) => (
              <div key={fieldConfig.name}>
                <Controller
                  name={fieldConfig.name}
                  control={control}
                  rules={fieldConfig.rules || {}}
                  render={({ field }) =>
                    fieldConfig.type === "select" ? (
                      <FormField
                        label={fieldConfig.label}
                        type="select"
                        options={fieldConfig.options}
                        error={errors[fieldConfig.name]?.message}
                        {...field}
                      />
                    ) : (
                      <FormField
                        label={fieldConfig.label}
                        type={fieldConfig.type}
                        error={errors[fieldConfig.name]?.message}
                        minDate={fieldConfig.minDate}
                        {...field}
                      />
                    )
                  }
                />
              </div>
            ))}
          </div>

          <div className="p-2">
            {checkInDate && checkOutDate && (
              <Controller
                name="selectedRooms"
                control={control}
                render={({ field }) => (
                  <NumberDropdown
                    numbersList={room.selectedRooms}
                    errors={errors}
                    disabledList={data?.bookedRooms || []}
                    selectedNumbers={selectedRooms}
                    handleNumberClick={(number) =>
                      handleRoomClick(number, field)
                    }
                    label="Select Rooms"
                    isLoading={isLoadingBookedRooms}
                    isError={isErrorBookedRooms}
                  />
                )}
              />
            )}
          </div>

          <div className="flex justify-between gap-3 mt-5">
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#08A5DC] text-white rounded-lg disabled:opacity-85 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RooomBookingModel;
