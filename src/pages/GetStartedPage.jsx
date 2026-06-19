import Button from "../components/ui/Button";
import logo from "../assets/mygym_logo.png";
import { useNavigate } from "react-router";

function GetStartedPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <img
        src={logo}
        alt="MyGym Logo"
        className="w-60 sm:w-56 md:w-72 lg:w-96"
      />
      <div className="mt-12 w-full max-w-sm">
        <Button variant="primary" onClick={() => navigate("/login")}>
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default GetStartedPage;
