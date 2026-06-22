import { CircleUserRound } from "lucide-react";
import logo from "../../assets/mini_logo.png";
import text from "../../assets/mygym_text.png";
import { useNavigate } from "react-router";
import NavButton from "../ui/NavButton";

function Header() {
  // const { loading, logout } = useAuth();
  const navigate = useNavigate();

  // const [openModalLogout, setOpenModalLogout] = useState(false);

  // const handleCloseModalLogout = () => {
  //   setOpenModalLogout(false);
  // };

  // const handleOpenModalLogout = () => {
  //   setOpenModalLogout(true);
  // };

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };
  return (
    <header className="flex items-center justify-between border  w-full">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
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
      <div className="flex items-center text-zinc-600 text-xl gap-6 ">
        <div className="hidden lg:flex items-center text-zinc-600 text-xl gap-6 font-medium ">
          <NavButton router="/">Home</NavButton>
          <NavButton router="/workouts">Treinos</NavButton>
          <NavButton router="/history">Histórico</NavButton>
        </div>
        <NavButton router="/me">
          <CircleUserRound className="w-8 h-8" />
        </NavButton>

        {/* <button className="cursor-pointer hover:opacity-70">
          <History className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
        </button>
        <button
          className="cursor-pointer hover:opacity-70"
          onClick={handleOpenModalLogout}
        >
          <LogOut className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
        </button> */}
      </div>
      {/* {loading && <Spinner />} */}
      {/* {openModalLogout && (
        <ModalConfirmation
          handleNo={handleCloseModalLogout}
          handleClose={handleCloseModalLogout}
          handleYes={handleLogout}
          title="Deseja sair da conta?"
          description="Você precisará fazer login novamente para acessar o MyGym."
          yesText="Sair"
        />
      )} */}
    </header>
  );
}

export default Header;
