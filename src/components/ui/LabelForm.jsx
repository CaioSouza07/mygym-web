function LabelForm({ children, htmlFor, className = "" }) {
  const baseStyle =
    "flex flex-col flex-1 w-full text-lg font-semibold text-white";
  return (
    <label className={`${baseStyle} ${className}`} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default LabelForm;
