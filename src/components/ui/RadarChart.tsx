import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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
  { actor: "Individual", reports: 120 },
  { actor: "Supervisor", reports: 150 },
  { actor: "Department Head", reports: 200 },
  { actor: "Vice Dean", reports: 180 },
  { actor: "Academic Affairs", reports: 220 },
  { actor: "University President", reports: 250 },
];

const chartConfig = {
  reports: {
    label: "Reports",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function RadarChartGraph() {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Radar Chart - Reports by Actors</CardTitle>
        <CardDescription>
          Showing report submissions by actor roles (January - June 2024)
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="actor" />
            <PolarGrid />
            <Radar
              dataKey="reports"
              fill="var(--color-reports)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 8.7% this quarter <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  );
}
