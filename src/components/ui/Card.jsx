function Card({ children, className = "", onClick }) {
  const baseStyle =
    "flex w-full flex-col items-center justify-center border-2 rounded-lg border-[#333333] py-4 px-6 bg-[#1C1C1C] gap-2";
  return (
    <div className={`${baseStyle} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;
