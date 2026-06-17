import { Link, useNavigate } from "react-router";
import logo from "../assets/mygym_logo.png";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import InputForm from "../components/ui/InputForm";
import LabelForm from "../components/ui/LabelForm";
import TitleForm from "../components/ui/TitleForm";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import ErrorCard from "../components/ui/ErrorCard";
import Spinner from "../components/ui/Spinner";
import ErrorFieldInfo from "../components/ui/ErrorFieldInfo";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
      navigate("/home");
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
    // clearErrors,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // const hasFieldErrors = Object.keys(errors).length > 0;

  return (
    <div className="flex flex-col items-center min-h-screen">
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
              <LabelForm htmlFor="name">Nome</LabelForm>
              <InputForm
                placeholder="Digite seu nome"
                id="name"
                {...registerField("name")}
                error={!!errors.name}
              />
              <ErrorFieldInfo error={errors.name} />
            </div>

            <div className="flex flex-col w-full gap-1">
              <LabelForm htmlFor="email">E-mail</LabelForm>
              <InputForm
                placeholder="Digite seu e-mail"
                id="email"
                {...registerField("email")}
                error={!!errors.email}
              />
              <ErrorFieldInfo error={errors.email} />
            </div>

            <div className="flex flex-col w-full gap-1">
              <LabelForm htmlFor="password">Senha</LabelForm>
              <InputForm
                placeholder="Digite sua senha"
                id="password"
                {...registerField("password")}
                type="password"
                error={!!errors.password}
              />
              <ErrorFieldInfo error={errors.password} />
            </div>

            <div className="flex flex-col w-full gap-1">
              <LabelForm htmlFor="confirmacaoSenha">
                Confirmação de Senha
              </LabelForm>
              <InputForm
                placeholder="Confirme a senha"
                id="passwordConfirmation"
                {...registerField("passwordConfirmation")}
                type="password"
                error={!!errors.passwordConfirmation}
              />
            </div>

            <div className="px-8 py-4 w-full">
              <Button className="text-xl" type="submit">
                Cadastro
              </Button>
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

      {error.message && (
        <ErrorCard
          onClick={() => {
            setError({ message: null, details: null });
          }}
        >
          {error.message || "Erro na validação dos campos"}
        </ErrorCard>
      )}

      {loading && <Spinner />}
    </div>
  );
}

export default RegisterPage;
