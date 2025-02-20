import { useState, useEffect } from "react";
import { amenities } from "../../utili/constants";
import { PlusIcon, CheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { facilitiesAndAmenitiesSchema } from "../../validation-schemas/hotel-schema";
import { useGetHotelById, useUpdateHotel } from "../../api/hotel-api.js";
import { useOwnerContext } from "../../context/OwnerContext.jsx";

const Facilities = () => {
  // const [facilitiesList, setFacilitiesList] = useState(
  //   [...amenities, ...data.facilities.filter((i) => !amenities.includes(i))] ||
  //     []
  // );

  const {
    setValue,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(facilitiesAndAmenitiesSchema),
  });

  const { user } = useOwnerContext();

  const [facilitiesList, setFacilitiesList] = useState([...amenities] || []);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [newFacilities, setNewFacilities] = useState([]);

  const { isLoading, isError, hotelData } = useGetHotelById(user?.hotelId);

  const { updateHotel, isLoading: isUpdateHotelLoading } = useUpdateHotel();

  const handleSaveNewFacilities = () => {
    setSelectedFacilities((prev) => {
      const newList = [...prev, ...newFacilities];
      setValue("facilities", newList);
      if (newList.length !== 0) {
        clearErrors("facilities");
      }

      return newList;
    });
    setFacilitiesList((prev) => [...prev, ...newFacilities]);
    setNewFacilities([]);
    setIsModelOpen(false);
  };

  const facilityChangeHandler = (amenity) => {
    setSelectedFacilities((prev) => {
      let newList = [...prev];
      const isIncluded = prev.includes(amenity);

      if (isIncluded) {
        newList = newList.filter((val) => val !== amenity);
      } else {
        newList.push(amenity);
      }

      setValue("facilities", newList);

      if (newList.length !== 0) {
        clearErrors("facilities");
      }

      return newList;
    });
  };

  useEffect(() => {
    if (hotelData?.facilities) {
      // update hook form values
      setValue("facilities", hotelData.facilities);
      // update local state
      setSelectedFacilities(hotelData.facilities);
      // also update facilities list . so it also include facilities added by user
      setFacilitiesList((prev) => {
        const otherFacilities = hotelData.facilities.filter(
          (i) => !prev?.includes(i)
        );

        return [...prev, ...(otherFacilities || [])];
      });
    }
  }, [hotelData, setValue]);

  const submitHandler = async (data) => {
    console.log("submit data : ", data);

    await updateHotel({
      hotelId: user?.hotelId,
      data,
      key: "",
    });
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Facilities And Amenities</h1>
        <button
          onClick={() => setIsModelOpen(true)}
          className="bg-blue-500 text-white rounded-md px-4 py-2 flex gap-2"
        >
          <PlusIcon />
          <span>Add new facility</span>
        </button>
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-wrap gap-2 mt-2">
          {facilitiesList.map((amenity) => (
            <button
              type="button"
              key={amenity}
              onClick={() => facilityChangeHandler(amenity)}
              className={`py-2 px-4 border rounded-full flex gap-3 ${
                selectedFacilities.includes(amenity)
                  ? "text-white bg-[#08a5dc] font-semibold"
                  : ""
              }`}
            >
              {selectedFacilities.includes(amenity) ? (
                <CheckIcon className="text-white" />
              ) : (
                <PlusIcon />
              )}
              {amenity}
            </button>
          ))}
        </div>
        <p className="text-sm text-red-500">{errors?.facilities?.message}</p>

        <div className="flex justify-end mt-5">
          <button
            type="submit"
            disabled={isUpdateHotelLoading}
            className="bg-blue-500 text-white py-2 px-5 rounded-md disabled:cursor-not-allowed disabled:opacity-85"
          >
            {isUpdateHotelLoading ? "Loading...." : "Update Changes"}
          </button>
        </div>
      </form>

      {isModelOpen && (
        <PopupModel
          setNewFacilities={setNewFacilities}
          newFacilities={newFacilities}
          setIsModelOpen={setIsModelOpen}
          handleSaveNewFacilities={handleSaveNewFacilities}
        />
      )}
    </div>
  );
};

const PopupModel = ({
  newFacilities,
  setNewFacilities,
  setIsModelOpen,
  handleSaveNewFacilities,
}) => {
  const [facility, setFacility] = useState("");
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/5">
        <h2 className="text-lg font-bold mb-4">Add New Facility</h2>
        <div className="flex my-3 gap-3">
          <input
            type="text"
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            placeholder="Enter facility name"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <button
            onClick={() => {
              if (facility.trim().length !== 0) {
                setNewFacilities((prev) => [...prev, facility]);
                setFacility("");
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md h-auto"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {newFacilities.map((facility) => {
            return (
              <div
                key={facility}
                className="border border-gray-500 px-4 py-2 rounded-lg bg-gray-300 "
              >
                {facility}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={() => {
              setIsModelOpen(false);
              setNewFacilities([]);
              setFacility("");
            }} // Close the modal
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-85 disabled:cursor-pointer"
            onClick={handleSaveNewFacilities}
            disabled={newFacilities.length === 0}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
