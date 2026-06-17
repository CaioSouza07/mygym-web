import { Link, useNavigate } from "react-router";
import logo from "../assets/mygym_logo.png";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import InputForm from "../components/ui/InputForm";
import LabelForm from "../components/ui/LabelForm";
import TitleForm from "../components/ui/TitleForm";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import ErrorCard from "../components/ui/ErrorCard";

function RegisterPage() {
  const navigate = useNavigate();
  const { loading, register } = useAuth();
  const [error, setError] = useState(true);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(values.name, values.email, values.password);
      navigate("/home");
    } catch (err) {
      console.error(err);
      if (err.status === 400) {
        setError("E-mail ou senha inválidos");
      } else {
        setError("Erro inesperado. Tente novamente");
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex w-full flex-col items-center min-h-screen p-6 gap-2 max-w-120">
        <img
          src={logo}
          alt="MyGym Logo"
          className="w-46 sm:w-38 md:w-70 lg:w-78"
        />
        <form className="w-full" autoComplete="nope" onSubmit={handleRegister}>
          <Card>
            <TitleForm>Cadastrar</TitleForm>
            <div className="flex flex-col w-full gap-1">
              <LabelForm htmlFor="name">Nome</LabelForm>
              <InputForm
                placeholder="Digite seu nome"
                id="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-full gap-1">
              <LabelForm htmlFor="email">E-mail</LabelForm>
              <InputForm
                placeholder="Digite seu e-mail"
                id="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-full gap-1">
              <LabelForm htmlFor="password">Senha</LabelForm>
              <InputForm
                placeholder="Digite sua senha"
                id="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-full gap-1">
              <LabelForm htmlFor="confirmacaoSenha">
                Confirmação de Senha
              </LabelForm>
              <InputForm
                placeholder="Confirme a senha"
                id="passwordConfirmation"
                value={values.passwordConfirmation}
                onChange={handleChange}
              />
            </div>

            <div className="px-8 py-4 w-full">
              <Button className="text-xl">Cadastro</Button>
            </div>

            <div className="p-2 w-full flex items-center justify-center gap-2">
              <p className="text-[#858385]">Já possuí uma conta?</p>
              <Link
                to="/auth/login"
                className="text-[#FFCC00] font-medium hover:underline"
              >
                Entrar
              </Link>
            </div>
          </Card>
        </form>
      </div>
      {error && <ErrorCard>Erro aqui pai</ErrorCard>}
    </div>
  );
}

export default RegisterPage;
