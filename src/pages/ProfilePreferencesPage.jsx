import { ArrowLeft, Save } from "lucide-react";
import LayoutPage from "../components/layout/LayoutPage";
import Card from "../components/ui/Card";
import Label from "../components/ui/Label";
import Button from "../components/ui/Button";
import AlertCard from "../components/ui/AlertCard";
import Spinner from "../components/ui/Spinner";
import { useState } from "react";
import { useNavigate } from "react-router";
import { userService } from "../services/userService";
import { useAuth } from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const REST_TIME_OPTIONS = [30, 45, 60, 90, 120, 150, 180];

function formatSeconds(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  if (min === 0) return `${sec}s`;
  if (sec === 0) return `${min}min`;
  return `${min}min ${sec}s`;
}

function ProfilePreferencesPage() {
  const { user, reload } = useAuth();
  const navigate = useNavigate();

  const [restTime, setRestTime] = useState(user?.preferences?.defaultRestTime || 60);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await userService.updatePreferences({ defaultRestTime: restTime });
      reload();
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutPage>
      <Helmet>
        <title>Preferences | MyGym</title>
      </Helmet>
      <div className="flex flex-col w-full gap-4">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer self-start"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        <h1 className="text-white text-2xl font-semibold">Minhas Preferências</h1>

        <Card className="gap-4 items-start">
          <h2 className="text-white text-lg font-semibold">Tempo de Descanso</h2>
          <p className="text-white/60 text-sm">
            Defina o tempo padrão de descanso entre as séries.
          </p>

          <div className="flex flex-col w-full gap-2">
            <Label>Tempo padrão</Label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {REST_TIME_OPTIONS.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setRestTime(time)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition cursor-pointer ${
                    restTime === time
                      ? "bg-violet-600 text-white"
                      : "bg-zinc-700 text-white/70 hover:bg-zinc-600"
                  }`}
                >
                  {formatSeconds(time)}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} className="max-w-fit px-4 gap-2 self-end">
            <Save size={18} />
            Salvar
          </Button>
        </Card>

        {success && (
          <AlertCard show type="success" onClose={() => setSuccess(false)}>
            Preferências salvas com sucesso!
          </AlertCard>
        )}
        {error && (
          <AlertCard show onClose={() => setError(null)}>
            {error}
          </AlertCard>
        )}
        {loading && <Spinner />}
      </div>
    </LayoutPage>
  );
}

export default ProfilePreferencesPage;
