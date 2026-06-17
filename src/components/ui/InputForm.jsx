function InputForm({
  type = "text",
  className = "",
  placeholder = "",
  id,
  name,
  autoComplete = "off",
  value,
  onChange,
}) {
  const baseStyle =
    "bg-[#D9D9D9] border-2 border-[#333333] rounded-lg w-full p-2 placeholder:opacity-100 ";
  return (
    <input
      className={`${baseStyle} ${className}`}
      type={type}
      placeholder={placeholder}
      id={id}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
}

export default InputForm;
