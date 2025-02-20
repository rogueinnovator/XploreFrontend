import { useState } from "react";
import { Controller } from "react-hook-form";
import FormField from "../FormField";
import { CheckIcon, PlusIcon } from "lucide-react";
import { timesList } from "../../utili/constants";

const PoliciesAndRules = ({ data, control, errors, setValue, clearErrors }) => {
  const [paymentMethods, setPaymentMethods] = useState(
    data.paymentMethods || []
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Policies And Rules</h1>

      {/* Check-in/Check-out Times */}
      <div>
        <p className="font-bold">Check-in/Check-out Times</p>
        <div className="grid grid-cols-3 gap-2">
          <Controller
            name="checkInTime"
            control={control}
            defaultValue={data.checkInTime || "00:00"}
            render={({ field }) => (
              <FormField
                label="Standard check-in"
                type="select"
                options={timesList}
                error={errors?.checkInTime?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="checkOutTime"
            control={control}
            defaultValue={data.checkOutTime || "12:00"}
            render={({ field }) => (
              <FormField
                label="Standard check-out"
                type="select"
                options={timesList}
                error={errors?.checkOutTime?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="earlyCheckInFee"
            control={control}
            defaultValue={data.earlyCheckInFee || 0}
            render={({ field }) => (
              <FormField
                label="Early check-in fee"
                type="number"
                error={errors?.earlyCheckInFee?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>

      {/* Pet Policy */}
      <div>
        <p className="font-bold">Pet policy</p>
        <div className="grid grid-cols-3 gap-2">
          <Controller
            name="isPetAllowed"
            control={control}
            defaultValue={data.isPetAllowed || "no"}
            render={({ field }) => (
              <FormField
                label="Is pet allowed"
                type="select"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                  { label: "upon request", value: "upon_request" },
                ]}
                error={errors?.isPetAllowed?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="petPricePerNight"
            control={control}
            defaultValue={data.petPricePerNight || 0}
            render={({ field }) => (
              <FormField
                label="Price per pet"
                type="number"
                error={errors?.petPricePerNight?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="petsPerRoom"
            control={control}
            defaultValue={data.petsPerRoom || 0}
            render={({ field }) => (
              <FormField
                label="Pets per room"
                type="number"
                error={errors?.petsPerRoom?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>

      {/* Child Policy */}
      <div>
        <p className="font-bold">Child policy</p>
        <div className="flex gap-2">
          <Controller
            name="freeChildrenPolicy"
            control={control}
            defaultValue={data.freeChildrenPolicy || ""}
            render={({ field }) => (
              <FormField
                label="Free Children"
                type="text"
                placeholder="Children under 12 stay free"
                error={errors?.freeChildrenPolicy?.message}
                {...field}
              />
            )}
          />
          {/*
            
             <Controller
            name="extraBedFee"
            control={control}
            defaultValue={data.extraBedFee || 0}
            render={({ field }) => (
              <FormField
                label="Extra bed fee"
                type="number"
                error={errors?.extraBedFee?.message}
                {...field}
              />
            )}
          /> */}
        </div>
        <div className="flex gap-2 mt-4">
          <Controller
            name="freeCancellationPolicy"
            control={control}
            defaultValue={data.freeCancellationPolicy || ""}
            render={({ field }) => (
              <FormField
                label="Cancellation Policy"
                type="text"
                placeholder=""
                error={errors?.freeCancellationPolicy?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="smokingPolicy"
            control={control}
            defaultValue={data.smokingPolicy || ""}
            render={({ field }) => (
              <FormField
                label="Smoking policy"
                type="text"
                placeholder="No smoking in rooms"
                error={errors?.smokingPolicy?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <p className="font-bold">Payment methods</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Visa", "Master Card", "Cash", "Easypaisa"].map((currentMethod) => (
            <button
              type="button"
              key={currentMethod}
              onClick={() => {
                setPaymentMethods((prev) => {
                  let newList = [...prev];
                  const isIncluded = prev.includes(currentMethod);

                  if (isIncluded) {
                    newList = newList.filter((val) => val !== currentMethod);
                  } else {
                    newList.push(currentMethod);
                  }

                  setValue("paymentMethods", newList);

                  if (newList.length !== 0) {
                    clearErrors("paymentMethods");
                  }

                  return newList;
                });
              }}
              className={`py-2 px-4 border rounded-full flex gap-3 ${
                paymentMethods.includes(currentMethod)
                  ? "text-white bg-[#08a5dc] font-semibold"
                  : ""
              }`}
            >
              {paymentMethods.includes(currentMethod) ? (
                <CheckIcon className="text-white" />
              ) : (
                <PlusIcon />
              )}
              {currentMethod}
            </button>
          ))}
        </div>
        <p className="text-sm text-red-500">
          {errors?.paymentMethods?.message}
        </p>
      </div>
    </div>
  );
};

export default PoliciesAndRules;
