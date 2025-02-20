import { UploadCloudIcon } from "lucide-react";
import FormField from "../FormField";
import { Controller } from "react-hook-form"; // Import Controller
import { useRef, useState } from "react";
import { facilitiesAndAmenitiesSchema } from "../../validation-schemas/hotel-schema";
import currenciesList from "./../../countries_currency.json";

const HotelInformation = ({
  data,
  setData,
  errors,
  control,
  setValue,
  clearErrors,
}) => {
  const hotelRatingOptions = [
    { label: "5 star", value: 5 },
    { label: "4 star", value: 4 },
    { label: "3 star", value: 3 },
    { label: "2 star", value: 2 },
    { label: "1 star", value: 1 },
  ];

  const hotelTypesOptions = [
    { label: "Hotel", value: "hotel" },
    { label: "Hostel", value: "hostel" },
    { label: "Bed and breakfast", value: "bed and breakfast" },
  ];

  const fileInputRef = useRef();

  // Handle file input change for registration docs
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length !== 0) {
      setValue("registrationDocs", [
        ...data.registrationDocs,
        ...e.target.files,
      ]);

      setData({
        ...data,
        registrationDocs: [...data.registrationDocs, ...e.target.files],
      });

      clearErrors("registrationDocs");
    }
  };

  const handleDeletRegistrationDoc = (doc) => {
    const newList = data.registrationDocs.filter((i) => i !== doc);

    setValue("registrationDocs", newList);
    setData({
      ...data,
      registrationDocs: newList,
    });

    // clear input to allow reselection of file after deleting
    // console.log(fileInputRef.current.value);
    fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <Controller
          name="name"
          control={control}
          defaultValue={data.name || ""}
          render={({ field }) => (
            <FormField
              label="Hotel Name"
              type="text"
              placeholder="Hotel Name"
              error={errors?.name?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="hotelType"
          control={control}
          defaultValue={data.hotelType || "hotel"}
          render={({ field }) => (
            <FormField
              label="Hotel Type"
              type="select"
              options={hotelTypesOptions}
              error={errors?.hotelType?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="rating"
          control={control}
          defaultValue={data.hotelRanking || 1}
          render={({ field }) => (
            <FormField
              label="Hotel Rating"
              type="select"
              options={hotelRatingOptions}
              error={errors?.rating?.message}
              {...field}
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="description"
          control={control}
          defaultValue={data.description || ""}
          render={({ field }) => (
            <FormField
              label="Hotel Description"
              type="text"
              placeholder="Hotel Description"
              error={errors?.description?.message}
              {...field}
            />
          )}
        />
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="flex-grow text-lg font-bold">Hotel registration docs</p>
        <div className="relative flex items-center justify-between flex-grow p-3 bg-white border border-gray-500 rounded-lg cursor-pointer">
          <div className="p-2 border border-gray-500 rounded-md">
            <UploadCloudIcon className="text-gray-500" />
          </div>
          <div className="text-center text-gray-600">
            <p>
              <span className="font-bold text-blue-500">Click to upload </span>
              or drag and drop
            </p>
            <p>SVG, PNG, JPG, PDF or GIF</p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            draggable="true"
            multiple
            onChange={handleFileChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {data.registrationDocs.length !== 0 &&
          data.registrationDocs.map((doc, i) => (
            <div className="relative" key={i}>
              <div
                onClick={() => handleDeletRegistrationDoc(doc)}
                className="group rounded-full py-2 px-4 bg-gray-300 border border-gray-300 shadow-md hover:bg-[rgba(0,0,0,0.7)] hover:cursor-pointer flex items-center justify-center"
              >
                {doc?.name}
                <span className="absolute hidden text-white group-hover:block ">
                  ✕
                </span>
              </div>
            </div>
          ))}
        <p className="text-sm text-red-500">
          {errors?.registrationDocs?.message}
        </p>
      </div>

      <div className="py-5 mt-5 border-t border-b border-gray-300">
        <div>
          <p className="text-xl font-bold">
            Add Numbers for rooms of the hotel
          </p>
        </div>

        <div className="flex justify-between mt-5">
          <Controller
            name="startingRoomNumber"
            control={control}
            // defaultValue={data.startingRoomNumber || 100}
            render={({ field }) => (
              <FormField
                label="Starting number for room"
                type="number"
                // placeholder={100}
                error={errors?.startingRoomNumber?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="endingRoomNumber"
            control={control}
            // defaultValue={data.endingRoomNumber || 150}
            render={({ field }) => (
              <FormField
                label="Ending number for room"
                type="number"
                // placeholder={150}
                error={errors?.endingRoomNumber?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="currency"
            control={control}
            // defaultValue={data.endingRoomNumber || 150}
            render={({ field }) => (
              <FormField
                label="Select Currency"
                type="currency"
                options={currenciesList}
                // placeholder={150}
                error={errors?.currency?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelInformation;
