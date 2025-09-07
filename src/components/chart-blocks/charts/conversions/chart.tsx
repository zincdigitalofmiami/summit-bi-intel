"use client";

import { VChart } from "@visactor/react-vchart";
import type { IFunnelChartSpec } from "@visactor/vchart";
import { conversionsData } from "@/data/convertions";
import { addThousandsSeparator } from "@/lib/utils";

const spec: IFunnelChartSpec = {
  data: [
    {
      id: "data",
      values: conversionsData.map(item => ({
        name: item.stage,
        value: item.value,
        color: item.color,
      })),
    },
  ],
  type: "funnel",
  categoryField: "name",
  valueField: "value",
  funnel: {
    style: {
      fill: (datum) => datum.color,
    },
  },
  label: {
    visible: true,
    style: {
      fill: "white",
      fontSize: 12,
      fontWeight: "bold",
      text: (d) => `${d.name}\n${addThousandsSeparator(d.value)}`,
    },
  },
  legends: [
    {
      visible: true,
      orient: "top",
      position: "start",
      padding: 0,
    },
  ],
  tooltip: {
    trigger: ["click", "hover"],
    mark: {
      content: {
        value: (d) => addThousandsSeparator(d?.value),
      },
    },
  },
  animationEnter: {
    easing: "cubicInOut",
  },
  animationExit: {
    easing: "cubicInOut",
  },
  animationUpdate: {
    easing: "cubicInOut",
  },
};

export default function Chart() {
  return <VChart spec={spec} />;
}
