import { X } from "lucide-react";

function ErrorCard({ children, onClick }) {
  return (
    <div
      className="absolute m-2 w-2/3 sm:w-2/3 md:w-1/3 lg:w-1/3 top-0 justify-between flex items-center bg-[#f8d7da] text-[#842029] border-2 border-[#842029] p-4 rounded-2xl"
      onClick={onClick}
    >
      <p>{children}</p>
      <button className="cursor-pointer hover:opacity-80">
        <X />
      </button>
    </div>
  );
}

export default ErrorCard;
