const Buttons = ({ handleBack, handleNext, isLastStep, isLoading }) => {
  return (
    <div className="w-full flex justify-between my-5">
      <button
        onClick={handleBack}
        className="border border-gray-400 py-2 px-5 rounded-md"
      >
        Back
      </button>
      <button
        onClick={handleNext}
        disabled={isLoading}
        className="bg-blue-500 text-white  py-2 px-5 rounded-md disabled:cursor-not-allowed disabled:opacity-85"
      >
        {isLoading ? "Loading..." : isLastStep ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default Buttons;
