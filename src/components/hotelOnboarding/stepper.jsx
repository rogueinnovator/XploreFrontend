import { CheckIcon } from "lucide-react";

//
const Stepper = ({ steps = [], currentStep }) => {
  return (
    <div className="flex justify-around h-20 p-2 border border-gray-200 rounded-lg shadow-lg ">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = currentStep > index;

        return (
          <div
            key={index}
            className={`relative flex flex-col items-center w-full ${
              index !== 0
                ? `before:content-[''] before:bg-slate-200 before:absolute before:w-[calc(100%-40px)] before:ml-[20px] before:mr-[20px] before:h-[3px] before:right-2/4 before:top-1/3 before:-translate-y-2/4 
                    ${isActive || isCompleted ? "before:bg-blue-500" : ""}
                  `
                : ""
            }`}
          >
            <div
              className={`z-10 rounded-full size-10  flex justify-center items-center border border-gray-400 ${
                isActive && " border border-blue-500 p-1"
              } ${isCompleted && "bg-blue-500"}`}
            >
              {isCompleted ? (
                <div>
                  <CheckIcon className="text-white " />
                </div>
              ) : isActive ? (
                <div className="h-full w-full rounded-full border-[10px] border-blue-500  "></div>
              ) : (
                <div className="w-1/2 bg-gray-400 rounded-full h-1/2"> </div>
              )}
            </div>
            <div
              className={`text-sm ${
                (isActive || isCompleted) && " text-blue-500"
              }`}
            >
              {step.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;

// {/* Progress bar*/}
// <div className="bg-gray-400 absolute top-[25%] h-[4px] w-full">
// <div
//   className={`h-full bg-blue-500 w-0`}
//   style={{ width: `${calcualteProgressBarWidth()}%` }}
// >
//   {" "}
// </div>
// </div>
