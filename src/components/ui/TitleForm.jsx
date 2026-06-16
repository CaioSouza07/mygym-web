function TitleForm({ children, className = "" }) {
  const baseStyle = "text-2xl text-white font-semibold";

  return <h1 className={`${baseStyle} ${className}`}>{children}</h1>;
}

export default TitleForm;
