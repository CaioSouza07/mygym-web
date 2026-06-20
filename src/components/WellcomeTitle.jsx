import { useAuth } from "../hooks/useAuth";

function WellcomeTitle() {
  const { user } = useAuth();
  return (
    <div className="text-white flex w-full flex-col">
      <h3 className="text-xl text-white/90">Olá, {user.name}!</h3>
      <h1 className="text-2xl font-medium text-white">
        Pronto para <span className="text-[#FFCC00]">evoluir</span> hoje?
      </h1>
    </div>
  );
}

export default WellcomeTitle;
