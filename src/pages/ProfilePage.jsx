import {
  ChevronRight,
  CircleUserRound,
  LogOut,
  Settings2,
  UserRound,
} from "lucide-react";
import LayoutPage from "../components/layout/LayoutPage";
import Card from "../components/ui/Card";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import ModalConfirmation from "../components/ModalConfirmation";
import { Helmet } from "react-helmet-async";

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [openModalLogout, setOpenModalLogout] = useState(false);

  const handleCloseModalLogout = () => setOpenModalLogout(false);
  const handleOpenModalLogout = () => setOpenModalLogout(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <LayoutPage>
      <Helmet>
        <title>Perfil - MyGym</title>
      </Helmet>
      <Card className="gap-6">
        <div className="flex w-full items-center gap-6">
          <div className="rounded-full p-2 bg-zinc-700">
            <CircleUserRound className=" text-white w-16 h-16" />
          </div>
          <h1 className="text-white font-medium text-2xl">Olá, {user.name}</h1>
        </div>
        <Card
          className="bg-zinc-700/30 flex-row justify-between! text-white/80 hover:opacity-80 cursor-pointer"
          onClick={() => navigate("/profile/my-account")}
        >
          <div className="flex gap-2 items-center text-xl">
            <UserRound />
            <h2>Minha Conta</h2>
          </div>
          <div>
            <ChevronRight />
          </div>
        </Card>
        <Card
          className="bg-zinc-700/30 flex-row justify-between! text-white/80 hover:opacity-80 cursor-pointer"
          onClick={() => navigate("/profile/preferences")}
        >
          <div className="flex gap-2 items-center text-xl">
            <Settings2 />
            <h2>Minhas Preferências</h2>
          </div>
          <div>
            <ChevronRight />
          </div>
        </Card>
        <div className="flex w-full items-center justify-end ">
          <Button
            variant="danger"
            className="gap-2 max-w-fit border-2 border-red-500"
            onClick={handleOpenModalLogout}
          >
            <LogOut />
            Sair da Conta
          </Button>
        </div>
      </Card>
      {openModalLogout && (
        <ModalConfirmation
          handleNo={handleCloseModalLogout}
          handleClose={handleCloseModalLogout}
          handleYes={handleLogout}
          title="Deseja sair da conta?"
          description="Você precisará fazer login novamente para acessar o MyGym."
          yesText="Sair"
        />
      )}
    </LayoutPage>
  );
}

export default ProfilePage;
