import Card from "./ui/Card";

function HistoryCard({ history, exerciseName }) {
  const date = new Date(history.createdAt.replace(" ", "T"));
  let formattedDate = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  formattedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  const formattedHour = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Card className="flex-row justify-between! p-2!">
      <div className="flex flex-col gap-2 min-w-0">
        <span className="text-white text-base ">{formattedDate}</span>
        <p className="text-[#858385] font-medium truncate">{exerciseName}</p>
      </div>
      <span className="text-[#858385] font-medium">{formattedHour}</span>
    </Card>
  );
}

export default HistoryCard;
