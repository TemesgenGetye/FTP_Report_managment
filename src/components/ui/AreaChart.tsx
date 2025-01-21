"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", individual: 50, supervisor: 80 },
  { month: "February", individual: 70, supervisor: 110 },
  { month: "March", individual: 60, supervisor: 95 },
  { month: "April", individual: 85, supervisor: 120 },
  { month: "May", individual: 90, supervisor: 150 },
  { month: "June", individual: 110, supervisor: 160 },
];

const chartConfig = {
  individual: {
    label: "Individual",
    color: "hsl(var(--chart-1))",
  },
  supervisor: {
    label: "Immediate Supervisor",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ReportAreaChartGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports Trend - Area Chart</CardTitle>
        <CardDescription>
          Showing trends in report submissions (January - June 2024)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillIndividual" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-individual)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-individual)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSupervisor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-supervisor)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-supervisor)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="individual"
              type="natural"
              fill="url(#fillIndividual)"
              fillOpacity={0.4}
              stroke="var(--color-individual)"
              stackId="a"
            />
            <Area
              dataKey="supervisor"
              type="natural"
              fill="url(#fillSupervisor)"
              fillOpacity={0.4}
              stroke="var(--color-supervisor)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 8.5% this quarter{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Individual and Supervisor Data
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
