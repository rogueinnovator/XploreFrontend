import React from "react";
import { breakfastTypesList } from "../../utili/constants";

const BreakfastDetails = ({
  formData,
  setFormData,
  register,
  errors,
  setValue,
}) => {
  return (
    <div className="flex flex-col w-11/12 ">
      <h2 className="text-xl font-bold text-start">Breakfast Details</h2>
      <h3 className="text-lg font-semibold">Do you serve guests breakfast?</h3>
      <div>
        <div className="space-x-1">
          <input
            id="offersBreakfasttrue"
            type="radio"
            name="offersBreakfast"
            value={"true"}
            className="rounded-md py-1"
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                breakfastDetails: {
                  ...prev.breakfastDetails,
                  offersBreakfast: true,
                },
              }));
            }}
          />
          <label htmlFor="offersBreakfasttrue">Yes</label>
        </div>

        <div className="space-x-1">
          <input
            id="offersBreakfastfalse"
            type="radio"
            name="offersBreakfast"
            value={"false"}
            className="rounded-md py-1"
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                breakfastDetails: {
                  ...prev.breakfastDetails,
                  offersBreakfast: false,
                },
              }));
            }}
          />
          <label htmlFor="offersBreakfastfalse">No</label>
        </div>

        {formData.breakfastDetails.offersBreakfast && (
          <div className="space-y-3">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">
                Is breakfast included in guests pay?
              </h2>
              <div className="space-x-1">
                <input
                  id="isIncludedInPricetrue"
                  type="radio"
                  name="isIncludedInPrice"
                  value={"true"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      breakfastDetails: {
                        ...prev.breakfastDetails,
                        isIncludedInPrice: true,
                      },
                    }))
                  }
                ></input>
                <label htmlFor="isIncludedInPricetrue">
                  Yes, it's included
                </label>
              </div>

              <div className="space-x-1">
                <input
                  id="isIncludedInPricefalse"
                  type="radio"
                  name="isIncludedInPrice"
                  value={"false"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      breakfastDetails: {
                        ...prev.breakfastDetails,
                        isIncludedInPrice: false,
                      },
                    }))
                  }
                ></input>
                <label htmlFor="isIncludedInPricefalse">
                  No, it costs extra
                </label>
              </div>
            </div>
            {!formData.breakfastDetails.isIncludedInPrice && (
              <div>
                <label className="text-lg font-semibold">
                  Breakfast price per person, per day
                </label>
                <div className="space-x-1">
                  <span className="text-gray-600">PKR</span>
                  <input
                    type="number"
                    className="rounded-md border border-gray-500 "
                  ></input>
                </div>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">
                What type of breakfast do you offer?
              </h3>
              <p className="text-gray-600">Select All that apply</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {breakfastTypesList.map((breakfast) => {
                  return (
                    <button
                      type="button"
                      key={breakfast}
                      onClick={() => {
                        setFormData((prev) => {
                          let newList = [
                            ...prev.breakfastDetails.breakfastType,
                          ];
                          const isIncluded =
                            prev.breakfastDetails.breakfastType.includes(
                              breakfast
                            );

                          if (isIncluded) {
                            newList = newList.filter(
                              (val) => val !== breakfast
                            );
                          } else {
                            newList.push(breakfast);
                          }

                          setValue("breakfastDetails.breakfastType", newList);
                          return {
                            ...prev,
                            breakfastDetails: {
                              ...prev.breakfastDetails,
                              breakfastType: newList,
                            },
                          };
                        });
                      }}
                      className={`py-2 px-4  border rounded-full ${
                        formData.breakfastDetails.breakfastType.includes(
                          breakfast
                        )
                          ? "border-blue-400 text-blue-600 font-semibold bg-blue-100 "
                          : ""
                      }`}
                    >
                      {breakfast}{" "}
                      {formData.breakfastDetails.breakfastType.includes(
                        breakfast
                      ) && <span className="ml-2">X</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BreakfastDetails;
