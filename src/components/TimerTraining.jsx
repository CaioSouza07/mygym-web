import { ChevronRight, Clock } from "lucide-react";
import Card from "./ui/Card";
import { useEffect, useState, useCallback } from "react";

function TimerTraining({ duration, onFinish, timestamp }) {
  const calculateTimeLeft = useCallback(() => {
    const startTime = new Date(timestamp).getTime();
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const remaining = duration - elapsedSeconds;
    return remaining > 0 ? remaining : 0;
  }, [timestamp, duration]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        onFinish?.();
      }
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setTimeLeft(calculateTimeLeft());
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [calculateTimeLeft, onFinish]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <Card className="border-[#FFCC00]/40 flex-row items-center justify-between! p-4!">
      <div className="flex items-center gap-6">
        <div className="bg-[#FFCC00]/40 rounded-full p-1 text-[#FFCC00]">
          <Clock size={60} />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-base font-medium text-[#858385]/80">Descanso</h3>
          <h1 className="text-4xl font-semibold text-[#FFCC00]">
            {minutes}:{seconds}
          </h1>
        </div>
      </div>
      <button
        onClick={onFinish}
        className="border border-[#FFCC00] text-[#FFCC00] rounded-xl flex p-1 pl-2 items-center justify-center gap-1 cursor-pointer hover:opacity-80"
      >
        Pular
        <ChevronRight size={20} />
      </button>
    </Card>
  );
}

export default TimerTraining;