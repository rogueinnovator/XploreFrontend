import { Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { roomFacilities } from "../../../utili/constants";
import { CheckIcon, PlusIcon } from "lucide-react";
import FormField from "../../FormField";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import RoomSchema from "../../../validation-schemas/room-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  roomCategory,
  bedType,
  roomView,
  roomType,
} from "../../../utili/constants";

import { useOwnerContext } from "../../../context/OwnerContext";
import { useGetSelectedRooms } from "../../../api/room-api";
import NumberDropdown from './NumberDropdown';

const AddRoomPopupModel = ({
  handlePopupCancelClick,
  handlePopupSaveClick,
  startingRoomNumber,
  endingRoomNumber,
  isLoading,
}) => {
  const fileInputRef = useRef();
  // Room Category options

  const [facilities, setFacilities] = useState([]);
  const [selectedImagesPreview, setSelectedImagesPreview] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const { user } = useOwnerContext();
  const {
    data,
    isLoading: isLoadingGetSelectedRooms,
    isError: isErrorGettingSelectedRooms,
  } = useGetSelectedRooms(user?.hotelId);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    clearErrors,
  } = useForm({
    resolver: zodResolver(RoomSchema),
  });

  const handleImagesPreview = (files) => {
    const newPreviews = [];
    for (const file of files) {
      const tempPath = URL.createObjectURL(file);
      newPreviews.push({ file, url: tempPath, isOld: false });
    }
    setSelectedImagesPreview((prev) => [...prev, ...newPreviews]);
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;
    // Update previews
    handleImagesPreview(files);
    // console.log("fiels", files);
    setSelectedImages((prev) => {
      const newList = [...prev, ...files];

      if (newList.length >= 2) {
        clearErrors("roomImages");
      }

      // console.log("new list :", newList);
      setValue("roomImages", newList);
      //   setData({ images: newList });
      return newList;
    });

    // Reset file input value to allow re-selection of the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleDeletePhoto = (image) => {
    setSelectedImagesPreview((prev) => prev.filter((i) => i.url !== image.url));
    // console.log(image);
    setSelectedImages((prev) => {
      const newList = prev.filter((i) => i !== image.file);
      setValue("roomImages", newList);
      return newList;
    });
    fileInputRef.current.value = "";
  };

  const handleFacilityChange = (facility) => {
    setFacilities((prev) => {
      let newList = [...prev];
      const isIncluded = prev.includes(facility);
      if (isIncluded) {
        newList = newList.filter((val) => val !== facility);
      } else {
        newList.push(facility);
      }

      setValue("facilities", newList);

      if (newList.length > 0) {
        clearErrors("facilities");
      }
      return newList;
    });
  };

  const handleNumberClick = (number) => {
    setSelectedNumbers((prev) => {
      const newList = prev.includes(number)
        ? prev.filter((num) => num !== number)
        : [...prev, number];

      setValue("selectedRooms", newList);

      if (newList.length > 0) {
        clearErrors("selectedRooms");
      }
      return newList;
    });
  };

  const generateGrid = (start, end) => {
    const numbers = [];
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const submitHandler = async (data) => {
    await handlePopupSaveClick(data);
  };

  // console.log(data);
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 ">
        <div
          className="bg-white p-6 rounded-lg w-[40%] overflow-y-auto h-[90%]"
          style={{ scrollbarWidth: "none" }}
        >
          <h2 className="text-lg font-bold mb-4">Add Room</h2>
          <div className="flex justify-between">
            <p className="font-bold">Add room details below</p>
          </div>
          {/* Fields */}

          <div className="my-3">
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  name: "roomCategory",
                  label: "Room category",
                  type: "select",
                  options: roomCategory,
                  defaultValue: roomCategory[0].value,
                },
                {
                  name: "bedType",
                  label: "Type beds",
                  type: "select",
                  options: bedType,
                  defaultValue: bedType[0].value,
                },
                {
                  name: "maximumOccupancy",
                  label: "Maximum Occupancy",
                  type: "number",
                  defaultValue: 0,
                },
                {
                  name: "roomView",
                  label: "Room view",
                  type: "select",
                  options: roomView,
                  defaultValue: roomView[0].value,
                },
                {
                  name: "discount",
                  label: "Discount",
                  type: "number",
                  defaultValue: 0,
                },
                {
                  name: "roomType",
                  label: "Room Type",
                  type: "select",
                  options: roomType,
                  defaultValue: roomType[0].value,
                },
                {
                  name: "chargePerNight",
                  label: "Charges per night",
                  type: "number",
                  defaultValue: 0,
                },
                {
                  name: "roomSize",
                  label: "Room size (sq ft)",
                  type: "number",
                  defaultValue: 0,
                },
                {
                  name: "numberOfRooms",
                  label: "Number of rooms",
                  type: "number",
                  defaultValue: 0,
                },
                {
                  name: "additionalCharges",
                  label: "Additional charges",
                  type: "number",
                  defaultValue: 0,
                },
              ].map(({ name, label, type, options, defaultValue }, index) => (
                <div key={name}>
                  <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field }) => (
                      <FormField
                        label={label}
                        type={type}
                        options={options}
                        error={errors[name]?.message}
                        {...field}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
            {/* Numbers Grid  */}
            <div className="mt-2 p-2">
              <NumberDropdown
                numbersList={generateGrid(startingRoomNumber, endingRoomNumber)}
                handleNumberClick={handleNumberClick}
                selectedNumbers={selectedNumbers}
                disabledList={data?.roomsList || []}
                errors={errors}
                label={"Select room numbers for this category"}
                isLoading={isLoadingGetSelectedRooms}
                isError={isErrorGettingSelectedRooms}
              />
            </div>
          </div>

          {/* Facilities*/}
          <div className="my-4">
            <p className="font-bold">Room Facilities</p>
            <p className="text-sm text-red-500">{errors.facilities?.message}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {roomFacilities.map((facility) => {
                return (
                  <button
                    type="button"
                    key={facility}
                    onClick={() => handleFacilityChange(facility)}
                    className={`py-2 px-4  border rounded-full flex gap-3 ${
                      facilities.includes(facility)
                        ? "text-white bg-[#08A5DC] font-semibold  "
                        : ""
                    }`}
                  >
                    {facilities.includes(facility) ? (
                      <CheckIcon className="text-white" />
                    ) : (
                      <PlusIcon />
                    )}
                    {facility}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Images div */}
          <div className="">
            <p className="font-bold">Add room Images</p>
            <p className="text-sm text-red-500">{errors.roomImages?.message}</p>
            <div
              className="my-4 gap-4 flex overflow-x-auto scrollbar-hide p-4 " // Enable horizontal scrolling and hide scrollbar
              id="1"
              style={{
                scrollbarWidth: "none",
              }}
            >
              {/* Image Input Div */}
              <div className="relative size-32 border border-gray-500 rounded-lg bg-gray-200 flex flex-col gap-4 justify-center items-center cursor-pointer flex-shrink-0">
                <PlusIcon className="text-gray-500" />
                <input
                  ref={fileInputRef}
                  type="file"
                  draggable
                  multiple
                  onChange={handleFileChange}
                  className="bg-red-500 absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                />
              </div>
              {/* Images Preview */}
              {selectedImagesPreview.map((image) => (
                <div
                  className="relative flex-shrink-0" // Prevent shrinking
                  key={image.url}
                >
                  <img
                    src={image.url}
                    alt="image preview"
                    className="size-32 rounded-md object-cover"
                  />
                  <button
                    onClick={() => handleDeletePhoto(image)}
                    className="absolute -top-3 -right-3 size-8 rounded-full p-2 bg-red-500 flex justify-center items-center cursor-pointer"
                  >
                    <p className="text-white">X</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Buttons div*/}
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg"
              onClick={handlePopupCancelClick}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#08A5DC] text-white rounded-lg disabled:opacity-85 disabled:cursor-not-allowed"
              // onClick={handlePopupSaveClick}
            >
              {isLoading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default AddRoomPopupModel;
