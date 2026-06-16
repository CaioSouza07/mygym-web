import logo from "../assets/mygym_logo.png";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import InputForm from "../components/ui/InputForm";
import LabelForm from "../components/ui/LabelForm";
import TitleForm from "../components/ui/TitleForm";

function LoginPage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex w-full flex-col items-center min-h-screen p-6 gap-2 max-w-120">
        <img
          src={logo}
          alt="MyGym Logo"
          className="w-46 sm:w-38 md:w-70 lg:w-78"
        />
        <Card>
          <TitleForm>Entrar</TitleForm>
          <LabelForm htmlFor="email">E-mail</LabelForm>
          <InputForm placeholder="Digite seu e-mail" />
          <LabelForm htmlFor="senha">Senha</LabelForm>
          <InputForm placeholder="Digite sua senha" />
          <div className="px-8 py-4 w-full">
            <Button className="text-xl">Entrar</Button>
          </div>
          <div className="p-2 w-full flex items-center justify-center gap-2">
            <p className="text-[#858385]">Não tem conta?</p>
            <p className="text-[#FFCC00]">Cadastra-se</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
