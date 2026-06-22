import { NavLink } from "react-router";

function NavButton({ children, router, className }) {
  return (
    <NavLink to={router} className="hover:bg-white/10 rounded-2xl p-2">
      {({ isActive }) => (
        <span
          className={`${isActive ? "text-[#FFCC00] underline" : ""} ${className}`}
        >
          {children}
        </span>
      )}
    </NavLink>
  );
}

export default NavButton;
