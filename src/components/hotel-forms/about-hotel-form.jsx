const AboutHotel = ({ formData, setFormData, register, errors }) => {
    return (
      <div className="flex flex-col w-11/12 ">
        <h2 className="text-xl font-bold text-start">About Hotel</h2>
        <div className="flex flex-col ">
          <label>Hotel Name</label>
          <input
            {...register("name")}
            type="text"
            name="name"
            className="rounded-md py-1 border border-gray-500"
          />
          {errors?.name?.message && (
            <p className="text-red-500 text-sm">{errors?.name?.message}</p>
          )}
        </div>
        <div className="flex flex-col ">
          <label>Rating of your hotel</label>
          <input
            {...register("rating")}
            type="number"
            name="rating"
            step="any"
            className="rounded-md py-1 border border-gray-500"
          />
          {errors?.rating?.message && (
            <p className="text-red-500 text-sm">{errors?.rating?.message}</p>
          )}
        </div>
        <div className="flex flex-col ">
          <label>Description</label>
          <textarea
            {...register("description")}
            name="description"
            className="rounded-md py-1 border border-gray-500"
          />
          {errors?.description?.message && (
            <p className="text-red-500 text-sm">{errors?.description?.message}</p>
          )}
        </div>
      </div>
    );
  };
  
  export default AboutHotel;