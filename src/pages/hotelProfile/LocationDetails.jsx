import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { PlusIcon, CheckIcon } from "lucide-react";
import { locationSchema } from "../../validation-schemas/hotel-schema.js";
import FormField from "../../components/FormField.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetHotelById, useUpdateHotel } from "../../api/hotel-api.js";
import { useOwnerContext } from "../../context/OwnerContext.jsx";

const LocationDetails = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(locationSchema),
    defaultValues: {},
  });

  const { user } = useOwnerContext();
  const [accessibility, setAccessibility] = useState([]);

  const { isLoading, isError, hotelData } = useGetHotelById(user?.hotelId);

  const { updateHotel, isLoading: isUpdateHotelLoading } = useUpdateHotel();

  useEffect(() => {
    if (hotelData?.locationDetails) {
      reset(hotelData.locationDetails);
      setAccessibility(hotelData.locationDetails.accessibility);

      const { latitude, longitude } = hotelData.locationDetails.gpsCoordinates;
      setValue("gpsCoordinates", `${latitude},${longitude}`);

      //   console.log(hotelData.locationDetails);
    }
  }, [hotelData, reset]);

  const submitHandler = async (data) => {
    // console.log("submit data : ", data);
    await updateHotel({
      hotelId: user?.hotelId,
      data,
      key: "locationDetails",
    });
  };

  //   console.log("errors :", errors);

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <p className="text-lg font-bold">Location Details</p>
          <div className="flex ">
            {/* Address Field */}
            <Controller
              name="address"
              control={control}
              // defaultValue={data.address || ""}
              render={({ field }) => (
                <FormField
                  label="Address"
                  placeholder="Address"
                  type="text"
                  error={errors?.address?.message}
                  {...field}
                />
              )}
            />

            {/* City/Region Field */}
            <Controller
              name="city"
              control={control}
              // defaultValue={data.city || ""}
              render={({ field }) => (
                <FormField
                  label="City/Region"
                  placeholder="City"
                  type="text"
                  error={errors?.city?.message}
                  {...field}
                />
              )}
            />

            {/* GPS Coordinates Field */}
            <Controller
              name="gpsCoordinates"
              control={control}
              // defaultValue={data.gpsCoordinates || ""}
              render={({ field }) => (
                <FormField
                  label="GPS Cordinates"
                  placeholder="longitude,latitude"
                  type="text"
                  error={errors?.gpsCoordinates?.message}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        {/* Accessibility Section */}
        <div>
          <p className="font-bold">Accessibility</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "Road access",
              "Parking availability",
              "Shuttle service",
              "On-site parking",
            ].map((currentAccessibility) => (
              <button
                type="button"
                key={currentAccessibility}
                onClick={() => {
                  setAccessibility((prev) => {
                    let newList = [...prev];
                    const isIncluded = prev.includes(currentAccessibility);

                    if (isIncluded) {
                      newList = newList.filter(
                        (val) => val !== currentAccessibility
                      );
                    } else {
                      newList.push(currentAccessibility);
                    }

                    // Update accessibility field in form data
                    setValue("accessibility", newList);

                    clearErrors("accessibility");
                    return newList;
                  });
                }}
                className={`py-2 px-4 border rounded-full flex gap-3 ${
                  accessibility.includes(currentAccessibility)
                    ? "text-white bg-[#08a5dc] font-semibold"
                    : ""
                }`}
              >
                {accessibility.includes(currentAccessibility) ? (
                  <CheckIcon className="text-white" />
                ) : (
                  <PlusIcon />
                )}
                {currentAccessibility}
              </button>
            ))}
          </div>
          <p className="text-sm text-red-500">
            {errors?.accessibility?.message}
          </p>
        </div>
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            //   disabled={isUpdateHotelLoading}
            className="px-5 py-2 text-white bg-blue-500 rounded-md disabled:cursor-not-allowed disabled:opacity-85"
          >
            {"Update Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocationDetails;
