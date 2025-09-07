"use client";

import { useAtomValue } from "jotai";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ticketChartDataAtom } from "@/lib/atoms";

// Custom colors for different ticket types
const getBarColor = (type: string) => {
  switch (type) {
    case "resolved":
      return "#22c55e"; // green-500
    case "open":
      return "#ef4444"; // red-500
    case "in-progress":
      return "#f59e0b"; // amber-500
    default:
      return "#6b7280"; // gray-500
  }
};

export default function Chart() {
  const ticketChartData = useAtomValue(ticketChartDataAtom);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={ticketChartData}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}
        barCategoryGap="20%"
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis 
          dataKey="date" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
        />
        <Bar 
          dataKey="count" 
          radius={[12, 12, 12, 12]}
          fill="#8884d8"
        >
          {ticketChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.type)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
