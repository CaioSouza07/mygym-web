import { forwardRef } from "react";

const InputForm = forwardRef(
  (
    {
      type = "text",
      className = "",
      placeholder = "",
      id,
      autoComplete = "off",
      error = false,
      ...props
    },
    ref,
  ) => {
    const baseStyle =
      "bg-black text-white border-2 rounded-lg w-full p-2 placeholder:opacity-100 placeholder:text-[#858385] focus:outline-1 focus:outline-white/40";
    return (
      <input
        ref={ref}
        className={`${baseStyle} ${error ? `border-red-500` : `border-[#333333]`} ${className}`}
        type={type}
        placeholder={placeholder}
        id={id}
        autoComplete={autoComplete}
        {...props}
      />
    );
  },
);

export default InputForm;
