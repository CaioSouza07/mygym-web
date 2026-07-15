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

function RegisterPage() {
  const navigate = useNavigate();
  const { loading, register } = useAuth();
  const [error, setError] = useState({
    message: null,
    details: null,
  });

  const onSubmit = async (data) => {
    setError({ message: null, details: null });
    try {
      await register(data.name, data.email, data.password);
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

  const registerSchema = z
    .object({
      name: z.string().min(1, "Nome é obrigatório"),
      email: z.string().email("Formato de e-mail inválido"),
      password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
      passwordConfirmation: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "As senhas não coincidem",
      path: ["passwordConfirmation"],
    });

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Helmet>
        <title>Cadastro - MyGym</title>
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
            <TitleForm>Cadastrar</TitleForm>
            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                placeholder="Digite seu nome"
                id="name"
                {...registerField("name")}
                error={!!errors.name}
              />
              <ErrorFieldInfo error={errors.name} />
            </div>

            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="email">E-mail</Label>
              <Input
                placeholder="Digite seu e-mail"
                id="email"
                {...registerField("email")}
                error={!!errors.email}
              />
              <ErrorFieldInfo error={errors.email} />
            </div>

            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="password">Senha</Label>
              <InputPassword
                placeholder="Digite sua senha"
                id="password"
                {...registerField("password")}
                error={!!errors.password}
              />
              <ErrorFieldInfo error={errors.password} />
            </div>

            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="confirmacaoSenha">Confirmação de Senha</Label>
              <Input
                placeholder="Confirme a senha"
                id="passwordConfirmation"
                {...registerField("passwordConfirmation")}
                type="password"
                error={!!errors.passwordConfirmation}
              />
              <ErrorFieldInfo error={errors.passwordConfirmation} />
            </div>

            <div className="px-8 py-4 w-full">
              <Button className="text-xl" type="submit">
                Cadastro
              </Button>
            </div>

            <div className="p-2 w-full flex items-center justify-center gap-2">
              <p className="text-[#858385]">Já possuí uma conta?</p>
              <Link
                to="/login"
                className="text-[#FFCC00] font-medium hover:underline"
              >
                Entrar
              </Link>
            </div>
          </Card>
        </form>
      </div>

      {error.message && (
        <AlertCard
          show={true}
          onClick={() => {
            setError({ message: null, details: null });
          }}
        >
          {error.message || "Erro na validação dos campos"}
        </AlertCard>
      )}

      {loading && <Spinner />}
    </div>
  );
}

export default RegisterPage;
