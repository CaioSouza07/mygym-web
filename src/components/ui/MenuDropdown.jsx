import Label from "./Label";

function MenuDropdown({ id, label, options, className = "" }) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} className={className}>
        {label}
      </Label>
      <select
        name={id}
        id={id}
        className="bg-black cursor-pointer  text-white border-2 rounded-lg w-full p-2 placeholder:opacity-100 border-[#333333] placeholder:text-[#858385] focus:outline-1 focus:outline-white/40"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MenuDropdown;
