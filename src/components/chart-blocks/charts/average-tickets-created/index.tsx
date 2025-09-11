"use client";

import { useState, useEffect } from "react";
import { FilePlus2 } from "lucide-react";
import type { TicketMetric } from "@/types/types";
import ChartTitle from "../../components/chart-title";
import Chart from "./chart";
import { DatePickerWithRange } from "./components/date-range-picker";
import MetricCard from "./components/metric-card";

const calMetricCardValue = (
  data: TicketMetric[],
  type: "created" | "resolved",
) => {
  const filteredData = data.filter((item) => item.type === type);
  return Math.round(
    filteredData.reduce((acc, curr) => acc + curr.count, 0) /
      filteredData.length,
  );
};

export default function AverageTicketsCreated() {
  const [ticketChartData, setTicketChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { searchParams } = new URL(window.location.href);
        const start = searchParams.get('start');
        const end = searchParams.get('end');

        const url = start && end
          ? `/api/dashboard/activity?start=${start}&end=${end}`
          : '/api/dashboard/activity?days=30';

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const formattedData = data.activity.flatMap((item: any) => [
            {
              date: item.date,
              type: "resolved",
              count: item.resolved,
            },
            {
              date: item.date,
              type: "created",
              count: item.created,
            },
          ]);
          setTicketChartData(formattedData);
        }
      } catch (error) {
        console.warn('Failed to fetch activity data:', error);
        // Keep empty state on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const avgCreated = calMetricCardValue(ticketChartData, "created");
  const avgResolved = calMetricCardValue(ticketChartData, "resolved");

  return (
    <section className="flex h-full flex-col gap-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ChartTitle title="Project Activity & Lead Generation" icon={FilePlus2} />
        <DatePickerWithRange className="" />
      </div>
      <div className="flex flex-wrap">
        <div className="my-4 flex w-52 shrink-0 flex-col justify-center gap-6">
          <MetricCard
            title="Avg. Leads Generated"
            value={avgCreated}
            color="#60C2FB"
          />
          <MetricCard
            title="Avg. Projects Completed"
            value={avgResolved}
            color="#3161F8"
          />
        </div>
        <div className="relative h-96 min-w-[320px] flex-1">
          <Chart />
        </div>
      </div>
    </section>
  );
}
