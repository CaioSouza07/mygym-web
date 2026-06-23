import { Link, useNavigate } from "react-router";
import logo from "../assets/mygym_logo.png";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import TitleForm from "../components/TitleForm";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import AlertCard from "../components/ui/AlertCard";
import Spinner from "../components/ui/Spinner";
import ErrorFieldInfo from "../components/ErrorFieldInfo";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputPassword from "../components/InputPassword";
import { Helmet } from "react-helmet-async";

function LoginPage() {
  const navigate = useNavigate();
  const { loading, login } = useAuth();
  const [error, setError] = useState({
    message: null,
    details: null,
  });

  const onSubmit = async (data) => {
    setError({ message: null, details: null });
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError({
          message: err.message,
          details: err.details,
        });
      }
    }
  };

  const loginSchema = z.object({
    email: z.string().email("Formato de e-mail inválido"),
    password: z.string().min(1, "Senha é obrigatório"),
  });

  const {
    register: loginField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Helmet>
        <title>Login | MyGym</title>
      </Helmet>
      <div className="flex w-full flex-col items-center min-h-screen p-6 gap-2 max-w-120">
        <img
          src={logo}
          alt="MyGym Logo"
          className="w-46 sm:w-38 md:w-70 lg:w-78"
        />
        <form
          className="w-full"
          autoComplete="nope"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card>
            <TitleForm>Entrar</TitleForm>

            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="email">E-mail</Label>
              <Input
                placeholder="Digite seu e-mail"
                id="email"
                {...loginField("email")}
                error={!!errors.email}
              />
              <ErrorFieldInfo error={errors.email} />
            </div>

            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="senha">Senha</Label>
              <InputPassword
                placeholder="Digite sua senha"
                id="password"
                {...loginField("password")}
                error={!!errors.password}
              />
              <ErrorFieldInfo error={errors.password} />
            </div>

            <div className="px-8 py-4 w-full">
              <Button className="text-xl" type="submit">
                Entrar
              </Button>
            </div>
            <div className="p-2 w-full flex items-center justify-center gap-2">
              <p className="text-[#858385]">Não tem conta?</p>

              <Link
                to="/register"
                className="text-[#FFCC00] font-medium hover:underline"
              >
                Cadastre-se
              </Link>
            </div>
          </Card>
        </form>
      </div>
      {error.message && (
        <AlertCard
          show={true}
          onClose={() => setError({ message: null, details: null })}
        >
          {error.message}
        </AlertCard>
      )}
      {loading && <Spinner />}
    </div>
  );
}

export default LoginPage;
