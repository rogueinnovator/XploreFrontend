import { Controller } from "react-hook-form";
import FormField from "../../components/FormField";
import { useForm } from "react-hook-form";
import { useGetHotelById, useUpdateHotel } from "../../api/hotel-api";
import { contactInformationSchema } from "../../validation-schemas/hotel-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useOwnerContext } from "../../context/OwnerContext";

const ContactInformation = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
  } = useForm({
    resolver: zodResolver(
      // user me have old docs and may not want to update registration docs so they are not required will check while submitting
      contactInformationSchema
    ),
    defaultValues: {},
  });

  const { user } = useOwnerContext();

  const { isLoading, isError, hotelData } = useGetHotelById(user?.hotelId);

  const { updateHotel, isLoading: isUpdateHotelLoading } = useUpdateHotel();

  useEffect(() => {
    if (hotelData?.contactInformation && !isLoading) {
      reset(hotelData.contactInformation);
    }
  }, [hotelData, reset]);

  const submitHandler = async (data) => {
    // console.log("submit data", data);
    await updateHotel({
      hotelId: user?.hotelId,
      data,
      key: "contactInformation",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Contact Information</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-3 gap-2">
          {/* Phone No Field */}
          <Controller
            name="phone"
            control={control}
            //   defaultValue={data?.phone || ""}
            render={({ field }) => (
              <FormField
                label="Phone No"
                placeholder="+92 0323231"
                type="text"
                error={errors?.phone?.message}
                {...field}
              />
            )}
          />

          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            //   defaultValue={data?.email || ""}
            render={({ field }) => (
              <FormField
                label="Email"
                placeholder="email@email.com"
                type="text"
                error={errors?.email?.message}
                {...field}
              />
            )}
          />

          {/* Website URL Field */}
          <Controller
            name="websiteUrl"
            control={control}
            //   defaultValue={data?.website || ""}
            render={({ field }) => (
              <FormField
                label="Website Url"
                placeholder="https://url.com"
                type="text"
                error={errors?.website?.message}
                {...field}
              />
            )}
          />
        </div>

        {/* Social Links Section */}
        <div>
          <p className="font-bold">Social Links</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                name: "socialLinks.facebook",
                label: "Facebook",
                placeholder: "https://Facebook.com",
              },
              {
                name: "socialLinks.instagram",
                label: "Instagram",
                placeholder: "https://Instagram.com",
              },
              {
                name: "socialLinks.linkedin",
                label: "LinkedIn",
                placeholder: "https://LinkedIn.com",
              },
              {
                name: "socialLinks.twitter",
                label: "Twitter/X",
                placeholder: "https://Twitter.com",
              },
              {
                name: "socialLinks.youtube",
                label: "Youtube",
                placeholder: "https://youtube.com",
              },
              {
                name: "socialLinks.googleMapLocation",
                label: "Google map location",
                placeholder: "https://googleMapLocation.com",
              },
            ].map(({ name, label, placeholder }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                //   defaultValue={data?.socialLinks?.[name.split(".")[1]] || ""}
                render={({ field }) => (
                  <FormField
                    label={label}
                    placeholder={placeholder}
                    type="text"
                    error={errors?.socialLinks?.[name.split(".")[1]]?.message}
                    {...field}
                  />
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            disabled={isUpdateHotelLoading}
            className="px-5 py-2 text-white bg-blue-500 rounded-md disabled:cursor-not-allowed disabled:opacity-85"
          >
            {isUpdateHotelLoading ? "Loading...." : "Update Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactInformation;
