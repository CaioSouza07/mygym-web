import { House, Dumbbell, History, User } from "lucide-react";
import NavButton from "../ui/NavButton";

function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden h-20 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800">
      <div className="h-full flex items-center justify-around text-gray-500">
        <NavButton router="/" className="flex flex-col items-center gap-1">
          <House size={22} />
          <span className="text-xs">Início</span>
        </NavButton>

        <NavButton
          router="/workouts"
          className="flex flex-col items-center gap-1"
        >
          <Dumbbell size={22} />
          <span className="text-xs">Treinos</span>
        </NavButton>

        <NavButton
          router="/history"
          className="flex flex-col items-center gap-1"
        >
          <History size={22} />
          <span className="text-xs">Histórico</span>
        </NavButton>

        <NavButton
          router="/profile"
          className="flex flex-col items-center gap-1"
        >
          <User size={22} />
          <span className="text-xs">Perfil</span>
        </NavButton>
      </div>
    </nav>
  );
}

export default BottomNavigation;
