const LocationDetails = ({ formData, setFormData, register, errors }) => {
  return (
    <div className="flex flex-col w-11/12 ">
      <div className="flex flex-col">
        <label>Country</label>
        <input
          type="text"
          {...register("location.country")}
          className="rounded-md py-1 border border-gray-500"
        />
        {errors.location?.country && (
          <span className="text-red-500">
            {errors.location.country.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label>Address</label>
        <input
          type="text"
          {...register("location.address")}
          className="rounded-md py-1 border border-gray-500"
        />
        {errors.location?.address && (
          <span className="text-red-500">
            {errors.location.address.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label>City</label>
        <input
          type="text"
          {...register("location.city")}
          className="rounded-md py-1 border border-gray-500"
        />
        {errors.location?.city && (
          <span className="text-red-500">{errors.location.city.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label>State</label>
        <input
          type="text"
          {...register("location.state")}
          className="rounded-md py-1 border border-gray-500"
        />
        {errors.location?.state && (
          <span className="text-red-500">{errors.location.state.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label>Postal Code</label>
        <input
          type="text"
          {...register("location.zipcode")}
          className="rounded-md py-1 border border-gray-500"
        />
        {errors.location?.zipcode && (
          <span className="text-red-500">
            {errors.location.zipcode.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label>Longitude</label>
        <input
          type="number"
          step="any"
          {...register("location.coordinates.longitude", {
            setValueAs: (value) =>
              value !== "" ? parseFloat(value) : undefined,
          })}
          className="rounded-md py-1 border border-gray-500"
        />
        {errors.location?.coordinates?.longitude && (
          <span className="text-red-500">
            {errors.location.coordinates.longitude.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label>Latitude</label>
        <input
          type="number"
          step="any"
          {...register("location.coordinates.latitude", {
            setValueAs: (value) =>
              value !== "" ? parseFloat(value) : undefined,
          })}
          className="rounded-md py-1 border border-gray-500"
        />
        {errors.location?.coordinates?.latitude && (
          <span className="text-red-500">
            {errors.location.coordinates.latitude.message}
          </span>
        )}
      </div>
    </div>
  );
};
export default LocationDetails;
