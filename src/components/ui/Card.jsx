function Card({ children, className = "", onClick, variant = "primary" }) {
  const baseStyle =
    "flex w-full flex-col items-center justify-center border-2 rounded-lg  py-4 px-6  gap-2";
  const variants = {
    primary: "bg-[#1C1C1C] border-[#333333]",
    secondary: "bg-[#FFCC00]",
  };
  return (
    <div
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Card;
