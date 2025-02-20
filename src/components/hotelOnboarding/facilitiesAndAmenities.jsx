import {
  CarIcon,
  DollarSign,
  DumbbellIcon,
  ForkKnife,
  PlusIcon,
  CheckIcon,
  TreePineIcon,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import { amenities } from "../../utili/constants";

// const FacilitiesAndAmenities = () => {
//   return (
//     <div className="">
//       <div className="flex justify-between items-center">
//         <h1 className="font-bold text-lg">Facilities And Amenities</h1>
//         <button className="bg-blue-500 text-white rounded-md px-4 py-2 flex gap-2">
//           <PlusIcon />
//           <span>Add new facility</span>
//         </button>
//       </div>

//       <div className="grid grid-cols-3 mt-5 ">
//         <FacilityCard
//           icon={<CarIcon className="text-[rgb(8,165,220)]" />}
//           iconBgColor={"bg-[rgba(8,165,220,0.5)]"}
//           title={"Parking"}
//           checkboxes={[
//             {
//               value: "free parking",
//               id: "parking_free",
//             },
//             {
//               value: "paid parking",
//               id: "parking_paid",
//             },
//           ]}
//         />
//         <FacilityCard
//           icon={<Wifi className="text-[rgb(147,51,234)]" />}
//           iconBgColor={"bg-[rgba(147,51,234,0.5)]"}
//           title={"Wifi"}
//           checkboxes={[
//             {
//               value: "yes",
//               id: "wifi_yes",
//             },
//             {
//               value: "No",
//               id: "Wifi_no",
//             },
//           ]}
//         />
//         <FacilityCard
//           icon={<ForkKnife className="text-[rgb(22,163,74)]" />}
//           iconBgColor={"bg-[rgba(22,163,74,0.5)]"}
//           title={"Dining"}
//           checkboxes={[
//             {
//               value: "Restaurant",
//               id: "resttaurant",
//             },
//             {
//               value: "Room service",
//               id: "room_service",
//             },
//           ]}
//         />
//       </div>
//       <div className="grid grid-cols-3 mt-16">
//         <FacilityCard
//           icon={<DumbbellIcon className="text-[rgb(220,38,38)]" />}
//           iconBgColor={"bg-[rgba(220,38,38,0.5)]"}
//           title={"Welness"}
//           checkboxes={[
//             {
//               value: "Swiminig pool",
//               id: "swiminig_pool",
//             },
//             {
//               value: "Gym",
//               id: "gym",
//             },
//             {
//               value: "Spa",
//               id: "spa",
//             },
//           ]}
//         />
//         <FacilityCard
//           icon={<DollarSign className="text-[rgb(202,138,4)]" />}
//           iconBgColor={"bg-[rgba(202,138,4,0.5)]"}
//           title={"Business"}
//           checkboxes={[
//             {
//               value: "Confrence Room",
//               id: "confrence_room",
//             },
//             {
//               value: "Meeting spaces",
//               id: "meeting_spaces",
//             },
//           ]}
//         />
//         <FacilityCard
//           icon={<TreePineIcon className="text-[rgb(13,148,136)]" />}
//           iconBgColor={"bg-[rgba(13,148,136,0.5)]"}
//           title={"Outdoor"}
//           checkboxes={[
//             {
//               value: "Garden",
//               id: "garden",
//             },
//             {
//               value: "Open area",
//               id: "open_area",
//             },
//           ]}
//         />
//       </div>
//     </div>
//   );
// };

// const FacilityCard = ({ icon, title, checkboxes, iconBgColor }) => {
//   return (
//     <div className="">
//       <div className="flex justify-start items-center gap-2">
//         <span className={`p-2 rounded-lg ${iconBgColor}`}>{icon}</span>
//         <p className="font-bold">{title}</p>
//       </div>
//       <div>
//         {checkboxes.map((checkbox) => {
//           return (
//             <div className="flex gap-2">
//               <input type="checkbox" value={checkbox.value} id={checkbox.id} />
//               <label htmlFor={checkbox.id}>{checkbox.value}</label>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

const FacilitiesAndAmenities = ({
  data,
  control,
  errors,
  setValue,
  clearErrors,
}) => {
  // console.log(data)

  //  list of amenities . and also those facilities that were added by user .
  const [facilitiesList, setFacilitiesList] = useState(
    [...amenities, ...data.facilities.filter((i) => !amenities.includes(i))] ||
      []
  );
  const [selectedFacilities, setSelectedFacilities] = useState(
    data.facilities || []
  );
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [newFacilities, setNewFacilities] = useState([]);

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

      <div className="flex flex-wrap gap-2 mt-2">
        {facilitiesList.map((amenity) => (
          <button
            type="button"
            key={amenity}
            onClick={() => {
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
            }}
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
export default FacilitiesAndAmenities;
