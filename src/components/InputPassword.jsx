import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

const InputPassword = forwardRef(
  (
    {
      className = "",
      placeholder = "",
      id,
      autoComplete = "off",
      error = false,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setVisible] = useState(false);

    const baseStyle =
      "bg-black text-white border-2 rounded-lg w-full placeholder:opacity-100 placeholder:text-[#858385] focus:outline-1 focus:outline-white/40 flex items-center p-2";
    return (
      <div
        className={`${baseStyle} ${error ? `border-red-500` : `border-[#333333]`} ${className}`}
      >
        <input
          ref={ref}
          className="focus:outline-0 w-full"
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          id={id}
          autoComplete={autoComplete}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible(!isVisible)}
          className="text-[#858385] cursor-pointer"
        >
          {isVisible ? <Eye /> : <EyeOff />}
        </button>
      </div>
    );
  },
);

export default InputPassword;
