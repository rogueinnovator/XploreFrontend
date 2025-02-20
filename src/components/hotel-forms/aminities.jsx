import { appendErrors } from "react-hook-form";
import { amenities } from "../../utili/constants";

const GuestsFacilities = ({
  formData,
  setFormData,
  errors,
  register,
  setValue,
}) => {
  return (
    <div className="flex flex-col w-11/12">
      <h2 className="text-xl font-bold text-start">
        What can guests use at your hotel?
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <label
            key={amenity}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <input
              type="checkbox"
              checked={formData?.amenities.includes(amenity)}
              value={amenity}
              onChange={(e) => {
                const { value, checked } = e.target;

                setFormData((prev) => {
                  const updatedAminities = checked
                    ? [...prev.amenities, value] // Add amenity if checked
                    : prev.amenities.filter((item) => item !== value); // Remove if unchecked

                  setValue("amenities", updatedAminities);
                  return {
                    ...prev,
                    amenities: updatedAminities,
                  };
                });
              }}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span>{amenity}</span>
          </label>
        ))}
      </div>
      {errors?.amenities?.message && (
        <p className="text-red-500 text-sm">{errors?.amenities?.message}</p>
      )}
    </div>
  );
};

export default GuestsFacilities;