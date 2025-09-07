"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { leadSources } from "@/data/ticket-by-channels";
import { addThousandsSeparator } from "@/lib/utils";

const data = leadSources.map(item => ({
  name: item.name,
  value: item.count,
  percentage: item.percentage,
}));

const totalLeads = data.reduce((acc, curr) => acc + curr.value, 0);

// Custom colors for each channel
const COLORS = [
  "#0088FE", // Blue
  "#00C49F", // Green
  "#FFBB28", // Yellow
  "#FF8042", // Orange
  "#8884d8", // Purple
  "#82ca9d", // Light Green
  "#ffc658", // Gold
  "#ff7c7c", // Light Red
];

// Custom label function for the pie chart
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}) => {
  if (!cx || !cy || midAngle === undefined || !innerRadius || !outerRadius || !percent) {
    return null;
  }

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent > 0.05) { // Only show label if slice is > 5%
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }
  return null;
};

// Custom tooltip
const CustomTooltip = ({ 
  active, 
  payload 
}: { 
  active?: boolean; 
  payload?: Array<{
    payload: {
      name: string;
      percentage: number;
    };
    value: number;
  }>;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold">{data.payload.name}</p>
        <p className="text-sm">
          <span className="text-muted-foreground">Count: </span>
          {addThousandsSeparator(data.value)}
        </p>
        <p className="text-sm">
          <span className="text-muted-foreground">Percentage: </span>
          {data.payload.percentage}%
        </p>
      </div>
    );
  }
  return null;
};

export default function Chart() {
  return (
    <div className="h-[400px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="40%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            wrapperStyle={{ paddingTop: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Total Display */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center" style={{ marginTop: '-40px' }}>
          <div className="text-sm text-muted-foreground">Total Leads</div>
          <div className="text-2xl font-bold">{addThousandsSeparator(totalLeads)}</div>
        </div>
      </div>
    </div>
  );
}
