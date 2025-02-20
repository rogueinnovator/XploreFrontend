import {
  Ban,
  Blocks,
  CigaretteOff,
  Clock,
  CreditCard,
  Edit,
  PawPrintIcon,
  PersonStanding,
  PlusIcon,
  CheckIcon,
  Hourglass,
} from "lucide-react";
import {
  checkinoutPolicySchema,
  freeCancellationPolicySchema,
  freeChildrenPolicySchema,
  paymentMethodsPolicySchema,
  petPolicySchema,
  smokingPolicySchema,
} from "../../validation-schemas/hotel-schema";

import FormField from "../../components/FormField.jsx";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetHotelById, useUpdateHotel } from "../../api/hotel-api";
import { useState } from "react";
import { times, timesList } from "../../utili/constants";
import { data } from "react-router-dom";
import { useOwnerContext } from "../../context/OwnerContext.jsx";

const PoliciesAndRules = () => {
  const { user } = useOwnerContext();
  const { isLoading, isError, hotelData } = useGetHotelById(user?.hotelId);

  //   console.log(hotelData);

  if (isLoading) {
    return <div></div>;
  }

  const policies = [
    {
      icon: Clock,
      title: "Check-in/Check-out Times",
      type: "checkinoutpolicy",
      schema: checkinoutPolicySchema,

      content: (
        <div>
          <div className="flex justify-between">
            <p className="text-gray-500 font-semibold">Standard Check-in</p>
            <p className="font-semibold">
              {hotelData.policiesAndRules.checkInTime}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500 font-semibold">Standard Check-out</p>
            <p className="font-semibold">
              {hotelData.policiesAndRules.checkOutTime}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500 font-semibold">Early Check-in Fee</p>
            <p className="font-semibold">
              {hotelData.policiesAndRules.earlyCheckInFee}
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: Ban,
      schema: freeCancellationPolicySchema,
      title: "Cancellation Policy",
      type: "cancellationPolicy",

      content: (
        <p className="font-semibold text-gray-500">
          {hotelData.policiesAndRules.freeCancellationPolicy}
        </p>
      ),
    },
    {
      icon: PawPrintIcon,
      title: "Pets Policy",
      schema: petPolicySchema,
      type: "petsPolicy",

      content: (
        <div>
          <p className="font-semibold text-gray-500">
            Pets Allowed: {hotelData.policiesAndRules.isPetAllowed}
          </p>
          <p className="font-semibold text-gray-500">
            ${hotelData.policiesAndRules.petPricePerNight}/night per pet
          </p>
          <p className="font-semibold text-gray-500">
            Maximum {hotelData.policiesAndRules.petsPerRoom} pets per room
          </p>
        </div>
      ),
    },
    {
      icon: PersonStanding,
      title: "Child Policy",
      schema: freeChildrenPolicySchema,
      type: "childPolicy",

      content: (
        <div>
          <p className="font-semibold text-gray-500">
            {hotelData.policiesAndRules.freeChildrenPolicy}
          </p>
          <p className="font-semibold text-gray-500">
            Extra Bed Fee: ${hotelData.policiesAndRules.extraBedFee}/night
          </p>
        </div>
      ),
    },
    {
      icon: CigaretteOff,
      title: "Smoking Policy",
      schema: smokingPolicySchema,
      type: "smokingPolicy",

      content: (
        <div>
          <p className="font-semibold text-gray-500">
            {hotelData.policiesAndRules.smokingPolicy}
          </p>
        </div>
      ),
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      type: "paymentmethod",

      schema: paymentMethodsPolicySchema,
      content: (
        <p className="font-semibold text-gray-500">
          {hotelData.policiesAndRules.paymentMethods.join(", ")}
        </p>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {policies.map((policy, index) => (
        <Card
          key={index}
          icon={policy.icon}
          title={policy.title}
          content={policy.content}
          schema={policy.schema}
          type={policy.type}
          hotelData={hotelData}
        />
      ))}
    </div>
  );
};

const Card = ({ icon: Icon, title, content, schema, type, hotelData }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleClose = () => {
    setIsModelOpen(false);
  };
  return (
    <div className="p-5 border border-gray-300 rounded-lg shadow-md">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          {Icon && <Icon className="text-blue-500" />}
          <p className="text-lg font-semibold text-gray-700">{title}</p>
        </div>
        {
          <div>
            <button onClick={() => setIsModelOpen(true)}>
              <Edit className="text-blue-500" />
            </button>
          </div>
        }
      </div>
      <div className="mt-5">{content}</div>

      {isModelOpen && (
        <PopupModel
          handleClose={handleClose}
          icon={Icon}
          title={title}
          schema={schema}
          type={type}
          hotelData={hotelData}
          setIsModelOpen={setIsModelOpen}
        />
      )}
    </div>
  );
};

const PopupModel = ({
  handleClose,
  icon: Icon,
  title,
  schema,
  type,
  hotelData,
  setIsModelOpen,
}) => {
  const [paymentMethods, setPaymentMethods] = useState(
    hotelData?.policiesAndRules?.paymentMethods || []
  );

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: hotelData.policiesAndRules,
  });

  const { user } = useOwnerContext();
  const { updateHotel, isLoading } = useUpdateHotel();

  //   console.log(data);

  const submitHandler = async (data) => {
    await updateHotel({
      data,
      hotelId: user?.hotelId,
      key: "policiesAndRules",
    });
    setIsModelOpen(false);
  };

  const checkInOutContent = (
    <div className="grid grid-cols-3 gap-2">
      <Controller
        name="checkInTime"
        control={control}
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
  );

  const cancellationPolicyContent = (
    <div>
      <Controller
        name="freeCancellationPolicy"
        control={control}
        render={({ field }) => (
          <FormField
            label="Free Cancellation"
            type="text"
            placeholder="Free cancellation until 24 hours before check-in"
            error={errors?.freeCancellationPolicy?.message}
            {...field}
          />
        )}
      />
    </div>
  );

  const petPolicyContent = (
    <div className="grid grid-cols-3 gap-2">
      <Controller
        name="isPetAllowed"
        control={control}
        render={({ field }) => (
          <FormField
            label="Is pet allowed"
            type="select"
            options={[
              { label: "yes", value: "yes" },
              { label: "no", value: "no" },
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
  );

  const childPolicyContent = (
    <div className="flex gap-2">
      <Controller
        name="freeChildrenPolicy"
        control={control}
        render={({ field }) => (
          <FormField
            label="Free children"
            type="text"
            placeholder="Children under 12 stay free"
            error={errors?.freeChildrenPolicy?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="extraBedFee"
        control={control}
        render={({ field }) => (
          <FormField
            label="Extra bed fee"
            type="number"
            error={errors?.extraBedFee?.message}
            {...field}
          />
        )}
      />
    </div>
  );

  const smokingPolicyContent = (
    <Controller
      name="smokingPolicy"
      control={control}
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
  );

  const paymentMethodContent = (
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
      <p className="text-sm text-red-500">{errors?.paymentMethods?.message}</p>
    </div>
  );

  let content;

  if (type === "checkinoutpolicy") {
    content = checkInOutContent;
  } else if (type === "cancellationPolicy") {
    content = cancellationPolicyContent;
  } else if (type === "petsPolicy") {
    content = petPolicyContent;
  } else if (type === "childPolicy") {
    content = childPolicyContent;
  } else if (type === "smokingPolicy") {
    content = smokingPolicyContent;
  } else {
    content = paymentMethodContent;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/5">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {Icon && <Icon className="text-blue-500" />}
              <p className="text-lg font-semibold text-gray-700">{title}</p>
            </div>
          </div>
          <div className="my-5">{content}</div>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={handleClose} // Close the modal
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-85 disabled:cursor-pointer"
            >
              {isLoading ? "Loading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PoliciesAndRules;
