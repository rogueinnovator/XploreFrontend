const ContactInformation = ({ register, errors }) => {
  return (
    <div className="flex flex-col w-11/12">
      <h2 className="text-xl font-bold text-start">Contact</h2>
      <div>
        <div className="flex flex-col ">
          <label>Email</label>
          <input
            {...register("contact.email")}
            type="email"
            className="rounded-md py-1 border border-gray-500"
          ></input>
          {errors?.contact?.email?.message && (
            <p className="text-sm text-red-500">
              {errors.contact.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col ">
          <label>Phone Number</label>
          <input
            {...register("contact.phone")}
            type="number"
            className="rounded-md py-1 border border-gray-500"
          ></input>
          {errors?.contact?.phone?.message && (
            <p className="text-sm text-red-500">
              {errors.contact.phone.message}
            </p>
          )}
        </div>
        <div className="flex flex-col ">
          <label>Website Url</label>
          <input
            {...register("contact.websiteUrl")}
            type="text"
            className="rounded-md py-1 border border-gray-500"
          ></input>
        </div>
        <h2 className="text-xl font-bold text-start">Social Links</h2>

        <div className="flex flex-col ">
          <label>Facebook</label>
          <input
            {...register("contact.socialLinks.facebook")}
            type="text"
            className="rounded-md py-1 border border-gray-500"
          ></input>
        </div>
        <div className="flex flex-col ">
          <label>Instagram</label>
          <input
            {...register("contact.socialLinks.instagram")}
            type="text"
            className="rounded-md py-1 border border-gray-500"
          ></input>
        </div>
        <div className="flex flex-col ">
          <label>Linkedin</label>
          <input
            {...register("contact.socialLinks.linkedin")}
            type="text"
            className="rounded-md py-1 border border-gray-500"
          ></input>
        </div>
        <div className="flex flex-col ">
          <label>Twitter</label>
          <input
            {...register("contact.socialLinks.twitter")}
            type="text"
            className="rounded-md py-1 border border-gray-500"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
