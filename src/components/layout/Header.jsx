import { History, LogOut } from "lucide-react";
import logo from "../../assets/mini_logo.png";
import text from "../../assets/mygym_text.png";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import Spinner from "../ui/Spinner";
import { useState } from "react";
import ModalConfirmation from "../ModalConfirmation";

function Header() {
  const { loading, logout } = useAuth();
  const navigate = useNavigate();

  const [openModalLogout, setOpenModalLogout] = useState(false);

  const handleCloseModalLogout = () => {
    setOpenModalLogout(false);
  };

  const handleOpenModalLogout = () => {
    setOpenModalLogout(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };
  return (
    <header className="flex items-center justify-between border  w-full">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="Logo da MyGym"
          className="w-14 sm:w-18 md:w-50 lg:w-18"
        />
        <img
          src={text}
          alt="Texto do sistema"
          className="w-20 sm:w-18 md:w-50 lg:w-28"
        />
      </div>
      <div className="flex items-center text-gray-400 gap-6">
        <button>
          <History className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
        </button>
        <button onClick={handleOpenModalLogout}>
          <LogOut className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
        </button>
      </div>
      {loading && <Spinner />}
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
    </header>
  );
}

export default Header;
