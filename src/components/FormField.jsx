import React, { forwardRef } from "react";

const FormField = forwardRef(
  (
    {
      label,
      type,
      placeholder,
      options = [{ value: "option1", label: "Option 1" }],
      error = "",
      multiple = false,
      minDate,
      ...field // Contains 'value' and 'onChange' from react-hook-form
    },
    ref
  ) => {
    return (
      <div className="space-y-1.5 flex-grow mx-2">
        <label className="text-[#3D425A] text-sm font-semibold">{label}</label>

        {type === "text" || type === "number" ? (
          <input
            type={type}
            ref={ref}
            className="w-full h-12 px-2.5 bg-[#F2F6FF] rounded-lg shadow-md border text-[#A1A1A1] text-base"
            placeholder={placeholder}
            {...field} // This provides 'value' and 'onChange'
          />
        ) : type === "textarea" ? (
          <textarea
            ref={ref}
            className="w-full h-32 px-2.5 bg-[#F2F6FF] rounded-lg shadow-md border text-[#A1A1A1] text-base"
            placeholder={placeholder}
            {...field}
          />
        ) : type === "date" ? (
          <input
            ref={ref}
            type="date"
            min={minDate}
            className="w-full h-12 px-2.5 bg-[#F2F6FF] rounded-lg shadow-md border text-[#A1A1A1] text-base"
            {...field}
          />
        ) : (
          <select
            ref={ref}
            multiple={multiple}
            className="w-full h-12 px-2.5 bg-[#F2F6FF] rounded-lg shadow-md border text-[#A1A1A1] text-base"
            {...field}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value || option.code}>
                {option.label || option.name}
              </option>
            ))}
          </select>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

export default FormField;
