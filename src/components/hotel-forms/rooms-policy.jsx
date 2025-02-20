const Policies = ({ register, errors }) => {
    return (
      <div className="flex flex-col w-11/12">
        <h2 className="text-xl font-bold text-start">Policies</h2>
        <div>
          <div className="flex flex-col ">
            <label>checkIn</label>
            <input
              {...register("policies.checkIn")}
              type="text"
              className="rounded-md py-1 border border-gray-500"
            ></input>
            {errors?.policies?.checkIn?.message && (
              <p className="text-sm text-red-500">
                {errors.policies.checkIn.message}
              </p>
            )}
          </div>
  
          <div className="flex flex-col ">
            <label>checkOut</label>
            <input
              {...register("policies.checkOut")}
              type="text"
              className="rounded-md py-1 border border-gray-500"
            ></input>
            {errors?.policies?.checkOut?.message && (
              <p className="text-sm text-red-500">
                {errors.policies.checkOut.message}
              </p>
            )}
          </div>
          <div className="flex flex-col ">
            <label>Cancellation policy</label>
            <input
              {...register("policies.cancellation")}
              type="text"
              className="rounded-md py-1 border border-gray-500"
            ></input>
             {errors?.policies?.cancellation?.message && (
              <p className="text-sm text-red-500">
                {errors.policies.cancellation.message}
              </p>
            )}
          </div> 
          
        </div>
      </div>
    );
  };
  
  export default Policies;
  