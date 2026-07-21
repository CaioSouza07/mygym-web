import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "./ui/Card";
import { useMemo, useState } from "react";
import MenuDropdown from "./ui/MenuDropdown";

function LoadProgressionChart() {
  const [period, setPeriod] = useState("30");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = [
    {
      date: "2026-02-01",
      label: "01/02",
      weight: 10,
    },
    {
      date: "2026-07-08",
      label: "08/07",
      weight: 45,
    },
    {
      date: "2026-07-15",
      label: "15/07",
      weight: 47.5,
    },
    {
      date: "2026-07-22",
      label: "22/07",
      weight: 20,
    },
    {
      date: "2026-07-29",
      label: "29/07",
      weight: 52.5,
    },
    {
      date: "2026-08-05",
      label: "05/08",
      weight: 20,
    },
  ];

  const filteredData = useMemo(() => {
    if (period === "all") return data;

    const limit = new Date();
    limit.setDate(limit.getDate() - Number(period));

    return data.filter((item) => new Date(item.date) >= limit);
  }, [data, period]);

  const periodOptions = [
    { id: "30", name: "Últimos 30 dias" },
    { id: "90", name: "Últimos 90 dias" },
    { id: "180", name: "Últimos 6 meses" },
    { id: "365", name: "Último ano" },
    { id: "all", name: "Tudo" },
  ];

  return (
    <Card className="w-full p-2! lg:px-6! gap-4">
      <div className="flex w-full justify-between items-center flex-wrap gap-4">
        <h2 className="text-lg font-semibold text-white">
          Progressão de Carga
        </h2>

        <div className="w-56">
          <MenuDropdown
            id="period"
            options={periodOptions}
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid stroke="#3a3a3a" strokeDasharray="5 5" />
          <XAxis dataKey="label" />
          <YAxis width="auto" />
          <Legend align="right" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F1F1F",
              border: "1px solid #3A3A3A",
              borderRadius: "12px",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,.4)",
            }}
            labelStyle={{
              color: "#FFCC00",
              fontWeight: 600,
              marginBottom: "6px",
            }}
            itemStyle={{
              color: "#fff",
              fontSize: "14px",
            }}
            cursor={{
              stroke: "#FFCC00",
              strokeWidth: 1,
              strokeDasharray: "5 5",
            }}
          />
          <Line
            // type="monotone"
            dataKey="weight"
            stroke="#FFCC00"
            strokeWidth={3}
            name="Peso (kg)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default LoadProgressionChart;
