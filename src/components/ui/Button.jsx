function Button({
  children,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
}) {
  const baseStyles =
    "rounded-lg p-2 hover:opacity-80 font-medium  w-full cursor-pointer flex justify-center items-center";
  const variants = {
    primary: "bg-[#FFCC00] text-black",
    secondary: "bg-black border-2 border-[#FFCC00] text-[#FFCC00]",
    inverted: "bg-[#FFCC00] text-black border-2 border-black",
    danger: "bg-transparent text-red-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
