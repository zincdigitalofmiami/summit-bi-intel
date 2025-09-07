"use client";

import {
  type IPieChartSpec,
  VChart,
} from "@visactor/react-vchart";
import type { Datum } from "@visactor/vchart/esm/typings";
import { leadSources } from "@/data/ticket-by-channels";
import { addThousandsSeparator } from "@/lib/utils";

const data = leadSources.map(item => ({
  type: item.name,
  value: item.count,
  percentage: item.percentage,
}));

const totalLeads = data.reduce((acc, curr) => acc + curr.value, 0);

const spec: IPieChartSpec = {
  type: "pie",
  legends: [
    {
      type: "discrete",
      visible: true,
      orient: "bottom",
    },
  ],
  data: [
    {
      id: "id0",
      values: data,
    },
  ],
  valueField: "value",
  categoryField: "type",
  outerRadius: 1,
  innerRadius: 0.88,
  startAngle: -180,
  padAngle: 0.6,
  endAngle: 0,
  centerY: "80%",
  layoutRadius: "auto",
  pie: {
    style: {
      cornerRadius: 6,
    },
  },
  tooltip: {
    trigger: ["click", "hover"],
    mark: {
      title: {
        visible: false,
      },
      content: [
        {
          key: (datum: Datum | undefined) => datum?.type,
          value: (datum: Datum | undefined) => datum?.value,
        },
      ],
    },
  },
  indicator: [
    {
      visible: true,
      offsetY: "40%",
      title: {
        style: {
          text: "Total Leads",
          fontSize: 16,
          opacity: 0.6,
        },
      },
    },
    {
      visible: true,
      offsetY: "64%",
      title: {
        style: {
          text: addThousandsSeparator(totalLeads),
          fontSize: 28,
        },
      },
    },
  ],
};

export default function Chart() {
  return <VChart spec={spec} />;
}
