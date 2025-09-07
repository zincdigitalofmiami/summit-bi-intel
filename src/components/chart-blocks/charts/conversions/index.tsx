import { CirclePercent } from "lucide-react";
import { conversionsData } from "@/data/convertions";
import { addThousandsSeparator } from "@/lib/utils";
import ChartTitle from "../../components/chart-title";
import Chart from "./chart";

export default function Convertions() {
  return (
    <section className="flex h-full flex-col gap-2">
      <ChartTitle title="Lead Conversion Pipeline" icon={CirclePercent} />
      <Indicator />
      <div className="relative max-h-80 flex-grow">
        <Chart />
      </div>
    </section>
  );
}

function Indicator() {
  return (
    <div className="mt-3 mb-2">
      <span className="mr-2 text-2xl font-medium">
        {addThousandsSeparator(
          conversionsData.reduce((acc, curr) => acc + curr.value, 0),
        )}
      </span>
      <span className="text-muted-foreground/60">Total Pipeline</span>
    </div>
  );
}
