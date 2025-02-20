const RoomsInformation = ({ register, errors }) => {
  return (
    <div className="flex flex-col w-11/12">
      <h2 className="text-xl font-bold text-start">Rooms Information</h2>
      <div>
        <div className="flex flex-col ">
          <label>Available Start Date</label>
          <input
            {...register("availability.startDate")}
            type="date"
            className="rounded-md py-1 border border-gray-500"
          ></input>
          {errors?.availability?.startDate?.message && (
            <p className="text-sm text-red-500">
              {errors.availability.startDate.message}
            </p>
          )}
        </div>

        <div className="flex flex-col ">
          <label>Available End Date</label>
          <input
            {...register("availability.endDate")}
            type="date"
            className="rounded-md py-1 border border-gray-500"
          ></input>
          {errors?.availability?.endDate?.message && (
            <p className="text-sm text-red-500">
              {errors.availability.endDate.message}
            </p>
          )}
        </div>
        <div className="flex flex-col ">
          <label>Rooms Available</label>
          <input
            {...register("availability.roomsAvailable", {
              setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)), // Convert to number
            })}
            type="number"
            className="rounded-md py-1 border border-gray-500"
          ></input>
          {errors?.availability?.roomsAvailable?.message && (
            <p className="text-sm text-red-500">
              {errors.availability.roomsAvailable.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomsInformation;
