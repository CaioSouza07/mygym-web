function ErrorFieldInfo({ field, error }) {
  const getFieldErrors = () => {
    if (!error.details) return [];
    return error.details.filter((e) => e.field === field).map((e) => e.message);
  };
  return getFieldErrors().map((msg, index) => (
    <span key={index} className="text-red-500 text-sm">
      {msg}
    </span>
  ));
}

export default ErrorFieldInfo;
