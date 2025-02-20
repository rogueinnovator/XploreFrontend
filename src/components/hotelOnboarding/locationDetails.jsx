import { Controller } from "react-hook-form";
import FormField from "../FormField.jsx";
import { useState } from "react";
import { PlusIcon, CheckIcon } from "lucide-react";

const LocationDetails = ({
  data,
  setData,
  errors,
  control,
  setValue,
  clearErrors,
}) => {
  const [accessibility, setAccessibility] = useState(data.accessibility || []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-bold text-lg">Location Details</p>
        <div className="flex ">
          {/* Address Field */}
          <Controller
            name="address"
            control={control}
            defaultValue={data.address || ""}
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
            defaultValue={data.city || ""}
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
            defaultValue={data.gpsCoordinates || ""}
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
        <p className="text-sm text-red-500">{errors?.accessibility?.message}</p>
      </div>
    </div>
  );
};

export default LocationDetails;
