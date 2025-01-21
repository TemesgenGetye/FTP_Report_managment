import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  { actor: "Individual", reports: 120, approved: 80 },
  { actor: "Immediate Supervisor", reports: 150, approved: 110 },
  { actor: "Department Head", reports: 200, approved: 160 },
  { actor: "Vice Dean", reports: 180, approved: 140 },
  { actor: "Director of Academic Affairs", reports: 220, approved: 190 },
  { actor: "University President", reports: 250, approved: 210 },
];

const chartConfig = {
  reports: {
    label: "Total Reports",
    color: "hsl(var(--chart-1))",
  },
  approved: {
    label: "Approved Reports",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ReportManagementBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports by Actors</CardTitle>
        <CardDescription>
          Report Statistics for January - June 2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="actor"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                value.length > 12 ? `${value.slice(0, 9)}...` : value
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="reports" fill="var(--color-reports)" radius={4} />
            <Bar dataKey="approved" fill="var(--color-approved)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 7.3% this quarter <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing report approvals by actor
        </div>
      </CardFooter>
    </Card>
  );
}
