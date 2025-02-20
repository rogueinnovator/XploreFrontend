import { Controller } from "react-hook-form";
import FormField from "../FormField";

const ContactInformation = ({ data, control, errors }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-xl">Contact Information</h1>
      <div className="grid grid-cols-3 gap-2">
        {/* Phone No Field */}
        <Controller
          name="phone"
          control={control}
          defaultValue={data?.phone || ""}
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
          defaultValue={data?.email || ""}
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
          defaultValue={data?.website || ""}
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
              defaultValue={data?.socialLinks?.[name.split(".")[1]] || ""}
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
    </div>
  );
};

export default ContactInformation;
