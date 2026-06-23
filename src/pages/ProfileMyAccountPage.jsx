import { ArrowLeft, Save } from "lucide-react";
import LayoutPage from "../components/layout/LayoutPage";
import Card from "../components/ui/Card";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import ErrorFieldInfo from "../components/ErrorFieldInfo";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userService } from "../services/userService";
import AlertCard from "../components/ui/AlertCard";
import Spinner from "../components/ui/Spinner";
import ModalConfirmation from "../components/ModalConfirmation";
import InputPassword from "../components/InputPassword";
import { Helmet } from "react-helmet-async";

function ProfileMyAccountPage() {
  const { user, reload } = useAuth();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const [openModalInfoProfile, setOpenModalInfoProfile] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  const handleCloseModalInfoProfile = () => setOpenModalInfoProfile(false);
  const handleOpenModalInfoProfile = () => setOpenModalInfoProfile(true);

  const handleOpenModalPassword = () => setOpenModalPassword(true);
  const handleCloseModalPassword = () => setOpenModalPassword(false);

  const [error, setError] = useState({
    message: null,
    details: null,
  });

  const [loading, setLoading] = useState(false);

  const onSubmitSaveName = async (data) => {
    setLoading(true);
    setError({ message: null, details: null });
    try {
      await userService.updateProfile(data);
      reload();
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);

        const message =
          err?.response?.data?.message || err?.message || "Erro inesperado";

        const details = err?.response?.data?.details || null;

        setError({
          message,
          details,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmitChangePassword = async (data) => {
    setLoading(true);
    setError({ message: null, details: null });
    try {
      await userService.changePassword(data);
      reload();
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);

        const message =
          err?.response?.data?.message || err?.message || "Erro inesperado";

        const details = err?.response?.data?.details || null;

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setError({
          message,
          details,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const nameSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
  });

  const passwordSchema = z
    .object({
      currentPassword: z.string().min(1, "Senha é obrigatória"),
      newPassword: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
      passwordConfirmation: z.string(),
    })
    .refine((data) => data.newPassword === data.passwordConfirmation, {
      message: "As senhas não coincidem",
      path: ["passwordConfirmation"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: "A nova senha não pode ser igual a atual",
      path: ["newPassword"],
    });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    formState: { errors: errorsName },
  } = useForm({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  return (
    <LayoutPage>
      <Helmet>
        <title>My Account | MyGym</title>
      </Helmet>
      <div className="flex flex-col w-full gap-4">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer self-start"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        <h1 className="text-white text-2xl font-semibold">Minha Conta</h1>

        <form
          className="w-full"
          autoComplete="nope"
          onSubmit={handleSubmitName((data) => {
            setPendingData(data);
            handleOpenModalInfoProfile();
          })}
        >
          <Card className="gap-4 items-start">
            <h2 className="text-white text-lg font-semibold">
              Informações Pessoais
            </h2>

            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user.email}
                disabled
                className="opacity-60"
              />
            </div>

            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                {...registerName("name")}
                error={!!errorsName.name}
                placeholder="Seu nome"
              />
              <ErrorFieldInfo error={errorsName.name} />
            </div>

            <Button type="submit" className="max-w-fit px-4 gap-2 self-end">
              <Save size={18} />
              Salvar Nome
            </Button>
          </Card>
        </form>
        <form
          className="w-full"
          autoComplete="nope"
          onSubmit={handleSubmitPassword((data) => {
            setPendingData(data);
            handleOpenModalPassword();
          })}
        >
          <Card className="gap-4 items-start">
            <h2 className="text-white text-lg font-semibold">Alterar Senha</h2>

            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="currentPassword">Senha Atual</Label>
              <InputPassword
                id="currentPassword"
                placeholder="Digite sua senha atual"
                {...registerPassword("currentPassword")}
                error={!!errorsPassword.currentPassword}
              />
              <ErrorFieldInfo error={errorsPassword.currentPassword} />
            </div>

            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="newPassword">Nova Senha</Label>
              <InputPassword
                id="newPassword"
                placeholder="Digite a nova senha"
                {...registerPassword("newPassword")}
                error={!!errorsPassword.newPassword}
              />
              <ErrorFieldInfo error={errorsPassword.newPassword} />
            </div>

            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="passwordConfirmation">Confirmar Nova Senha</Label>
              <Input
                id="passwordConfirmation"
                placeholder="Confirme a nova senha"
                {...registerPassword("passwordConfirmation")}
                error={!!errorsPassword.passwordConfirmation}
              />
              <ErrorFieldInfo error={errorsPassword.passwordConfirmation} />
            </div>

            <Button type="submit" className="max-w-fit px-4 gap-2 self-end">
              <Save size={18} />
              Alterar Senha
            </Button>
          </Card>
        </form>
        {success && (
          <AlertCard
            show={true}
            type="success"
            onClose={() => setSuccess(false)}
          >
            Alterações realizadas com sucesso!
          </AlertCard>
        )}
        {error.message && (
          <AlertCard
            show={true}
            onClose={() => setError({ message: null, details: null })}
          >
            {error.message}
          </AlertCard>
        )}
        {loading && <Spinner />}
        {openModalInfoProfile && (
          <ModalConfirmation
            handleYes={() => {
              onSubmitSaveName(pendingData);
              handleCloseModalInfoProfile();
            }}
            handleNo={handleCloseModalInfoProfile}
            handleClose={handleCloseModalInfoProfile}
            title="Atualizar dados pessoais"
            description="Você realmente deseja salvar as alterações?"
            yesText="Sim"
          />
        )}
        {openModalPassword && (
          <ModalConfirmation
            handleYes={() => {
              onSubmitChangePassword(pendingData);
              handleCloseModalPassword();
            }}
            handleNo={handleCloseModalPassword}
            handleClose={handleCloseModalPassword}
            title="Alterar Senha"
            description="Confirma a alteração de senha?"
          />
        )}
      </div>
    </LayoutPage>
  );
}

export default ProfileMyAccountPage;
