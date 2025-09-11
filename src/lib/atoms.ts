import { addDays, endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { atom } from "jotai";
import type { DateRange } from "react-day-picker";
import { averageTicketsCreated } from "@/data/average-tickets-created";
import type { TicketMetric } from "@/types/types";

const defaultStartDate = new Date();
defaultStartDate.setDate(defaultStartDate.getDate() - 7); // Last 7 days by default

export const dateRangeAtom = atom<DateRange | undefined>({
  from: defaultStartDate,
  to: new Date(),
});

// Fallback atom using static data
export const ticketChartDataAtom = atom((get) => {
  const dateRange = get(dateRangeAtom);

  if (!dateRange?.from || !dateRange?.to) return [];

  const startDate = startOfDay(dateRange.from);
  const endDate = endOfDay(dateRange.to);

  return averageTicketsCreated
    .filter((item) => {
      const [year, month, day] = item.date.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return isWithinInterval(date, { start: startDate, end: endDate });
    })
    .flatMap((item) => {
      const res: TicketMetric[] = [
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
      ];
      return res;
    });
});

// New atom that fetches real data from API
export const realTicketChartDataAtom = atom(async (get) => {
  const dateRange = get(dateRangeAtom);

  if (!dateRange?.from || !dateRange?.to) return [];

  try {
    const startDate = dateRange.from.toISOString().split('T')[0];
    const endDate = dateRange.to.toISOString().split('T')[0];

    const response = await fetch(`/api/dashboard/activity?start=${startDate}&end=${endDate}`);
    if (response.ok) {
      const data = await response.json();
      return data.activity.flatMap((item: any) => [
        {
          date: item.date,
          type: "resolved" as const,
          count: item.resolved,
        },
        {
          date: item.date,
          type: "created" as const,
          count: item.created,
        },
      ]);
    }
  } catch (error) {
    console.warn('Failed to fetch real activity data, using fallback:', error);
  }

  // Fallback to static data if API fails
  return get(ticketChartDataAtom);
});
