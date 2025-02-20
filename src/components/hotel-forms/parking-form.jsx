const ParkingDetails = ({ formData, setFormData, register, errors }) => {
  return (
    <div className="flex flex-col w-11/12 ">
      <h2 className="text-xl font-bold text-start">Parking Details</h2>
      <h3 className="text-lg font-semibold">Is Parking Available to guests</h3>
      <div className="space-x-2">
        <input
          {...register("parkingDetails.isParkingAvailable")}
          type="radio"
          id="yes_free"
          name="isParkingAvailable"
          value="yes_free"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              parkingDetails: {
                ...prev.parkingDetails,
                isParkingAvailable: "yes_free",
              },
            }))
          }
        ></input>
        <label htmlFor="yes_free">Yes free</label>
      </div>
      <div className="space-x-2">
        <input
          {...register("parkingDetails.isParkingAvailable")}
          type="radio"
          id="yes_paid"
          name="isParkingAvailable"
          value="yes_paid"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              parkingDetails: {
                ...prev.parkingDetails,
                isParkingAvailable: "yes_paid",
              },
            }))
          }
        ></input>
        <label htmlFor="yes_paid">Yes paid</label>
      </div>
      <div className="space-x-2">
        <input
          {...register("parkingDetails.isParkingAvailable")}
          type="radio"
          id="no"
          name="isParkingAvailable"
          value="no"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              parkingDetails: {
                ...prev.parkingDetails,
                isParkingAvailable: "no",
              },
            }))
          }
        ></input>
        <label htmlFor="no">No</label>
        {errors?.parkingDetails?.isParkingAvailable?.message && (
          <p className="text-red-500 text-sm">
            {errors.parkingDetails.isParkingAvailable.message}
          </p>
        )}
      </div>
      {/*  Additional parking fields conditionally shown */}
      {(formData.parkingDetails.isParkingAvailable === "yes_paid" ||
        formData.parkingDetails.isParkingAvailable === "yes_free") && (
        <div className="space-y-3">
          {formData.parkingDetails.isParkingAvailable === "yes_paid" && (
            <div>
              <label className="text-lg font-semibold">
                How much does parking cost?
              </label>
              <div className="space-x-1">
                <input
                  {...register("parkingDetails.parkingCost")}
                  type="number"
                  className="rounded-md border border-gray-500"
                ></input>
                <select
                  defaultValue="per_day"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      parkingDetails: {
                        ...prev.parkingDetails,
                        parkingCost: e.target.value,
                      },
                    }))
                  }
                  className="rounded-md border border-gray-500"
                >
                  <option value="per_day">Per day</option>
                  <option value="per_hour">Per hour </option>
                  <option value="per_stay">Per stay</option>
                </select>
                {errors?.parkingDetails?.parkingCost?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.parkingDetails.parkingCost.message}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">
              Do they need to reserve a parking spot?
            </h2>

            <div className="space-x-1">
              <input
                {...register("parkingDetails.needReservation")}
                id="needReservationtrue"
                type="radio"
                name="needReservation"
                value={"true"}
              ></input>
              <label htmlFor="needReservationtrue">Reservation needed</label>
            </div>

            <div className="space-x-1">
              <input
                {...register("parkingDetails.needReservation")}
                id="needReservationfalse"
                type="radio"
                name="needReservation"
                value={"false"}
              ></input>
              <label htmlFor="needReservationfalse">
                No reservation needed
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">Where is parking located?</h2>
            <div className="space-x-1">
              <input
                {...register("parkingDetails.parkingLocation")}
                id="parkingLocationonsite"
                type="radio"
                name="parkingLocation"
                value="onsite"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    parkingDetails: {
                      ...prev.parkingDetails,
                      parkingLocation: "onsite",
                    },
                  }))
                }
              ></input>
              <label htmlFor="parkingLocationonsite">On site</label>
            </div>

            <div className="space-x-1">
              <input
                {...register("parkingDetails.parkingLocation")}
                id="parkingLocationoffsite"
                type="radio"
                name="parkingLocation"
                value="offsite"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    parkingDetails: {
                      ...prev.parkingDetails,
                      parkingLocation: "offsite",
                    },
                  }))
                }
              ></input>
              <label htmlFor="parkingLocationoffsite">Off site</label>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">
              What type of parking is it?
            </h2>
            <div className="space-x-1">
              <input
                {...register("parkingDetails.parkingType")}
                id="parkingTypeprivate"
                type="radio"
                name="parkingType"
                value="private"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    parkingDetails: {
                      ...prev.parkingDetails,
                      parkingType: "private",
                    },
                  }))
                }
              ></input>
              <label htmlFor="parkingTypeprivate">Private</label>
            </div>

            <div className="space-x-1">
              <input
                {...register("parkingDetails.parkingType")}
                id="parkingTypepublic"
                type="radio"
                name="parkingType"
                value="public"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    parkingDetails: {
                      ...prev.parkingDetails,
                      parkingType: "public",
                    },
                  }))
                }
              ></input>
              <label htmlFor="parkingTypepublic">Public</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingDetails;