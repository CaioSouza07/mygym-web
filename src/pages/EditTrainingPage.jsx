import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getTrainingById, updateTraining } from "../services/trainingsService";
import Spinner from "../components/ui/Spinner";
import AlertCard from "../components/ui/AlertCard";
import LayoutPage from "../components/layout/LayoutPage";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Plus } from "lucide-react";
import Label from "../components/ui/Label";
import MenuDropdown from "../components/ui/MenuDropdown";
import ExerciseCardCreate from "../components/ExerciseCardCreate";
import ErrorFieldInfo from "../components/ErrorFieldInfo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useTraining } from "../hooks/useTraining";
import ModalConfirmation from "../components/ModalConfirmation";

function EditTrainingPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [weekDay, setWeekDay] = useState("sunday");

  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const { reload } = useTraining();
  const navigate = useNavigate();

  const weekDays = [
    { value: "sunday", name: "Domingo" },
    { value: "monday", name: "Segunda" },
    { value: "tuesday", name: "Terça" },
    { value: "wednesday", name: "Quarta" },
    { value: "thursday", name: "Quinta" },
    { value: "friday", name: "Sexta" },
    { value: "saturday", name: "Sábado" },
  ];

  const handleAddExercise = () => {
    if (!newExerciseName.trim()) return;

    const newExercise = {
      name: newExerciseName,
      series: [
        { order: 1, repetitions: 12 },
        { order: 2, repetitions: 12 },
        { order: 3, repetitions: 12 },
      ],
    };

    const updated = [...exercises, newExercise];
    setExercises(updated);
    setValue("exercises", updated, { shouldValidate: true });
    setNewExerciseName("");
  };

  const handleRemoveExercise = (indexRemove) => {
    const updated = exercises.filter((_, index) => index !== indexRemove);
    setExercises(updated);
    setValue("exercises", updated, { shouldValidate: true });
  };

  const handleAddSerieInExercise = (indexAdd) => {
    setExercises((prev) => {
      const updated = prev.map((exercise, index) => {
        if (index !== indexAdd) return exercise;

        return {
          ...exercise,
          series: [
            ...exercise.series,
            {
              order: exercise.series.length + 1,
              repetitions: 12,
            },
          ],
        };
      });

      setValue("exercises", updated, {
        shouldValidate: true,
      });

      return updated;
    });
  };

  const handleChangeSerieRepetitions = (
    exerciseIndex,
    serieIndex,
    repetitions,
  ) => {
    setExercises((prev) => {
      const updated = prev.map((exercise, index) => {
        if (index !== exerciseIndex) return exercise;

        return {
          ...exercise,
          series: exercise.series.map((serie, i) => {
            if (i !== serieIndex) return serie;

            return {
              ...serie,
              repetitions: Number(repetitions),
            };
          }),
        };
      });

      setValue("exercises", updated, {
        shouldValidate: true,
      });

      return updated;
    });
  };

  const editTrainingSchema = z.object({
    name: z.string().min(1, "Nome do treino é obrigatório"),
    exercises: z.array(z.any()).min(1, "Adicione pelo menos 1 exercício"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editTrainingSchema),
    defaultValues: { exercises: [], name: "" },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const data = await getTrainingById(id);

        setExercises(data.exercises);
        setWeekDay(data.weekDay.toLowerCase());
        reset({
          name: data.name,
          exercises: data.exercises,
        });
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, reset]);

  const handleEditTraining = async (data) => {
    setLoading(true);
    setError(null);
    setOpenModal(false);
    try {
      await updateTraining(id, { ...data, weekDay: weekDay.toUpperCase() });
      reload();
      navigate("/workouts", {
        state: {
          success: "Treino editado com sucesso!",
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutPage>
      <Helmet>
        <title>Editar Treino - MyGym</title>
      </Helmet>
      <button
        onClick={() => navigate("/workouts")}
        className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer self-start"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </button>

      <h1 className="text-white text-2xl font-semibold w-full">
        Editar Treino
      </h1>

      <div className="flex w-full flex-col lg:flex-row gap-8">
        <form
          className="flex flex-col gap-4 w-full lg:w-80 lg:sticky lg:top-4 lg:self-start"
          autoComplete="nope"
          onSubmit={handleSubmit((data) => {
            setDataModal(data);
            setOpenModal(true);
          })}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-4">
              <Label htmlFor="name" className="text-white/70">
                Nome do Treino
              </Label>
              <Input
                placeholder="Ex: Treino - Costas e Bíceps"
                id="name"
                {...register("name")}
                error={!!errors.name}
              />
              <ErrorFieldInfo error={errors.name} />
            </div>
            <MenuDropdown
              id="weekDay"
              label="Dia da Semana"
              options={weekDays}
              className="text-white/70"
              value={weekDay}
              onChange={(e) => setWeekDay(e.target.value)}
            />
          </div>
          <Button type="submit" className="mt-2 lg:flex">
            Salvar Treino
          </Button>
        </form>

        <div className="flex flex-col gap-4 flex-1 lg:self-start">
          <Label className="text-white/70 text-lg! ">Exercícios</Label>

          {exercises.map((exercise, index) => {
            return (
              <ExerciseCardCreate
                key={index}
                exercise={exercise}
                onRemove={() => handleRemoveExercise(index)}
                onAddSerie={() => handleAddSerieInExercise(index)}
                onChangeRepetitions={(serieIndex, repetitions) =>
                  handleChangeSerieRepetitions(index, serieIndex, repetitions)
                }
              />
            );
          })}

          <div className="flex flex-col gap-1">
            <div className="flex gap-3 items-center">
              <Input
                placeholder="Nome do exercício"
                value={newExerciseName}
                onChange={(e) => setNewExerciseName(e.target.value)}
                error={!!errors.exercises}
              />
              <Button
                className="whitespace-nowrap max-w-fit gap-2"
                variant="secondary"
                onClick={handleAddExercise}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden lg:inline">Adicionar</span>
              </Button>
            </div>
            <ErrorFieldInfo error={errors.exercises} />
          </div>
        </div>
      </div>

      {/* Botão fixo no rodapé para mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black/95 to-transparent lg:hidden">
        <Button>Salvar Treino</Button>
      </div>
      {openModal && (
        <ModalConfirmation
          title="Editar Treino"
          description="Confirma a edição do treino?"
          handleYes={() => handleEditTraining(dataModal)}
          handleNo={() => setOpenModal(false)}
          handleClose={() => setOpenModal(false)}
        />
      )}
      {error && (
        <AlertCard show={true} onClose={() => setError(null)}>
          {error}
        </AlertCard>
      )}
      {loading && <Spinner />}
      <AlertCard show={!!error} onClose={() => setError(null)}>
        {error}
      </AlertCard>
    </LayoutPage>
  );
}

export default EditTrainingPage;
