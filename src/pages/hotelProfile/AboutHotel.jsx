import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hotelInformationUpdateSchema } from "../../validation-schemas/hotel-schema";
import FormField from "../../components/FormField";
import { UploadCloudIcon, TrashIcon, EyeIcon } from "lucide-react";
import { useGetHotelById, useUpdateHotel } from "../../api/hotel-api";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useOwnerContext } from "../../context/OwnerContext";

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

const AboutHotel = () => {
  const fileInputRef = useRef();
  const { user } = useOwnerContext();
  const { hotelData } = useGetHotelById(user?.hotelId);

  const [oldDocs, setOldDocs] = useState([]);
  const [newDocs, setNewDocs] = useState([]);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
  } = useForm({
    resolver: zodResolver(
      // user me have old docs and may not want to update registration docs so they are not required will check while submitting
      hotelInformationUpdateSchema
    ),
    defaultValues: {},
  });

  const { updateHotel, isLoading: isUpdateHotelLoading } = useUpdateHotel();
  useEffect(() => {
    if (hotelData?.hotelInformation) {
      reset(hotelData.hotelInformation);
      // Store old docs in state
      setOldDocs(
        hotelData.hotelInformation.registrationDocs.map((doc) => ({
          name: doc,
          isOld: true,
        }))
      );
      setValue("registrationDocs", []);
    }
  }, [hotelData, reset]);

  const handleFileChange = (e) => {
    if (e.target.files.length !== 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        isOld: false,
      }));
      setNewDocs((prev) => {
        return [...prev, ...newFiles];
      });

      setValue("registrationDocs", [
        ...getValues("registrationDocs"),
        ...e.target.files,
      ]);
    }
  };

  const handleRemoveDoc = (doc, isOld) => {
    if (isOld) {
      setOldDocs((prev) => prev.filter((oldDoc) => oldDoc.name !== doc.name));
    } else {
      setNewDocs((prev) => prev.filter((newDoc) => newDoc.file !== doc.file));
    }

    const updatedDocs = getValues("registrationDocs").filter((d) => {
      d !== doc.file; // Remove the specific doc
    });

    // console.log(updatedDocs);

    setValue("registrationDocs", updatedDocs);

    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
  };

  const submitHandler = async (data) => {
    if (oldDocs.length + data.registrationDocs.length <= 0) {
      return setError("registrationDocs", {
        message: "Please Provide at least one registration docs",
      });
    }

    data.oldDocs = oldDocs.map((doc) => doc.name);
    delete data.startingRoomNumber;
    delete data.endingRoomNumber;

    await updateHotel({
      hotelId: user?.hotelId,
      data,
      key: "hotelInformation",
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex justify-between">
          <Controller
            name="name"
            control={control}
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

        {/* File Upload Section */}
        <div className="flex items-center justify-between mt-5">
          <p className="flex-grow text-lg font-bold">Hotel registration docs</p>
          <div className="relative flex items-center justify-between flex-grow p-3 bg-white border border-gray-500 rounded-lg cursor-pointer">
            <div className="p-2 border border-gray-500 rounded-md">
              <UploadCloudIcon className="text-gray-500" />
            </div>
            <div className="text-center text-gray-600">
              <p>
                <span className="font-bold text-blue-500">
                  Click to upload{" "}
                </span>
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

        {/* Display Uploaded Docs */}
        <div className="flex flex-wrap gap-3 mt-3">
          {oldDocs.map((doc, i) => (
            <div
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md"
              key={i}
            >
              <span className="px-3 py-2 rounded-md ">{doc.name}</span>
              <a
                href={`${import.meta.env.VITE_BASE_URL_IMAGES}${doc.name}`}
                target="_blank"
              >
                <EyeIcon className="ml-2 text-blue-500 cursor-pointer" />
              </a>
              <TrashIcon
                className="ml-2 text-red-500 cursor-pointer"
                onClick={() => handleRemoveDoc(doc, true)}
              />
            </div>
          ))}
          {newDocs.map((doc, i) => (
            <div
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md"
              key={i}
            >
              <span className="px-3 py-2 rounded-md ">{doc.file.name}</span>
              <a
                href={`${import.meta.env.VITE_BASE_URL_IMAGES}${doc.file.name}`}
                target="_blank"
              >
                <EyeIcon className="ml-2 text-blue-500 cursor-pointer" />
              </a>

              <TrashIcon
                className="ml-2 text-red-500 cursor-pointer"
                onClick={() => handleRemoveDoc(doc, false)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-5">
          <button
            type="submit"
            disabled={isUpdateHotelLoading}
            className="px-5 py-2 text-white bg-blue-500 rounded-md disabled:cursor-not-allowed disabled:opacity-85"
          >
            {isUpdateHotelLoading ? "Loading...." : "Update Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutHotel;
