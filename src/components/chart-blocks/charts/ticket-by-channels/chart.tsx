"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { fallbackTicketByChannels } from "@/data/ticket-by-channels";
import { addThousandsSeparator } from "@/lib/utils";

// Fallback data for when API fails
const fallbackData = fallbackTicketByChannels.map((item, index) => ({
  name: item.type,
  value: item.value,
  percentage: Math.round((item.value / fallbackTicketByChannels.reduce((sum, i) => sum + i.value, 0)) * 100),
}));

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
  cx?: string | number;
  cy?: string | number;
  midAngle?: string | number;
  innerRadius?: string | number;
  outerRadius?: string | number;
  percent?: number;
}) => {
  // Cast to number for calculations
  const nCx = Number(cx);
  const nCy = Number(cy);
  const nMidAngle = Number(midAngle);
  const nInnerRadius = Number(innerRadius);
  const nOuterRadius = Number(outerRadius);
  if (!nCx || !nCy || isNaN(nMidAngle) || !nInnerRadius || !nOuterRadius || !percent) {
    return null;
  }
  const RADIAN = Math.PI / 180;
  const radius = nInnerRadius + (nOuterRadius - nInnerRadius) * 0.5;
  const x = nCx + radius * Math.cos(-nMidAngle * RADIAN);
  const y = nCy + radius * Math.sin(-nMidAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor={x > nCx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={14}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
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
  const [data, setData] = useState(fallbackData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeadSources = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/dashboard/lead-sources');
        if (response.ok) {
          const result = await response.json();
          const formattedData = result.leadSources.map((item: any) => ({
            name: item.type,
            value: item.value,
            percentage: item.percentage,
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.warn('Failed to fetch lead sources:', error);
        // Keep fallback data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeadSources();
  }, []);

  const totalLeads = data.reduce((acc, curr) => acc + curr.value, 0);

  if (isLoading) {
    return (
      <div className="h-[400px] w-full relative flex items-center justify-center">
        <div className="text-muted-foreground">Loading lead sources...</div>
      </div>
    );
  }

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
