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
import { useMemo } from "react";

function LoadProgressionChart({ data }) {
  const chartData = useMemo(() => {
    return [...data]
      .reverse()
      .map((item) => {
        const date = new Date(item.createdAt);

        return {
          ...item,
          label: date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
          }),
          load: item.weight,
        };
      });
  }, [data]);

  return (
    <Card className="w-full p-2! lg:px-6! gap-4">
      <h2 className="text-lg font-semibold text-white">
        Progressão de Carga
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#3a3a3a" strokeDasharray="5 5" />
          <XAxis
            dataKey="createdAt"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
              })
            }
          />
          <YAxis width="auto" />
          <Legend align="right" />
          <Tooltip
            labelFormatter={(value) =>
              new Date(value).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            }
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
