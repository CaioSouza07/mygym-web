function InputForm({ type = "text", className = "", placeholder = "" }) {
  const baseStyle =
    "bg-[#D9D9D9] border-2 border-[#333333] rounded-lg w-full p-2";
  return (
    <input
      className={`${baseStyle} ${className}`}
      type={type}
      placeholder={placeholder}
    />
  );
}

export default InputForm;
