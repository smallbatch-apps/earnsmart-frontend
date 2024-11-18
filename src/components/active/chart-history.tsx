"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { date: "2024-04-01", wallet: 12300, deployed: 2000 },
  { date: "2024-04-02", wallet: 11300, deployed: 3000 },
  { date: "2024-04-03", wallet: 22000, deployed: 3000 },
  { date: "2024-04-04", wallet: 17000, deployed: 8000 },
  { date: "2024-04-05", wallet: 17000, deployed: 12000 },
  { date: "2024-04-06", wallet: 24000, deployed: 12000 },
  { date: "2024-04-07", wallet: 28000, deployed: 12000 },
  { date: "2024-04-08", wallet: 28000, deployed: 12000 },
  { date: "2024-04-09", wallet: 33000, deployed: 12600 },
  { date: "2024-04-10", wallet: 33000, deployed: 12600 },
  { date: "2024-04-11", wallet: 38000, deployed: 7600 },
  { date: "2024-04-12", wallet: 38000, deployed: 7600 },
  { date: "2024-04-13", wallet: 42000, deployed: 7600 },
  { date: "2024-04-14", wallet: 44000, deployed: 8000 },
  { date: "2024-04-15", wallet: 46000, deployed: 9000 },
  { date: "2024-04-16", wallet: 55000, deployed: 9000 },
  { date: "2024-04-17", wallet: 55000, deployed: 9600 },
  { date: "2024-04-18", wallet: 8000, deployed: 59600 },
  { date: "2024-04-19", wallet: 6000, deployed: 59600 },
  { date: "2024-04-20", wallet: 7000, deployed: 59600 },
  { date: "2024-04-21", wallet: 14000, deployed: 50600 },
  { date: "2024-04-22", wallet: 14000, deployed: 59600 },
  { date: "2024-04-23", wallet: 14000, deployed: 59600 },
  { date: "2024-04-24", wallet: 15000, deployed: 59600 },
  { date: "2024-04-25", wallet: 35000, deployed: 59600 },
  { date: "2024-04-26", wallet: 33000, deployed: 59600 },
  { date: "2024-04-27", wallet: 15000, deployed: 59600 },
  { date: "2024-04-28", wallet: 18000, deployed: 59600 },
  { date: "2024-04-29", wallet: 25000, deployed: 50600 },
  { date: "2024-04-30", wallet: 35000, deployed: 50600 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  wallet: {
    label: "Wallet",
    color: "hsl(var(--chart-5))",
  },
  deployed: {
    label: "Deployed",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export default function Component() {
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your balances over time</CardTitle>
        <CardDescription>
          Investment and wallet balances over the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillWallet" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDeployed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-wallet)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-deployed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="wallet"
              type="natural"
              fill="url(#fillWallet)"
              stroke="var(--color-wallet)"
              stackId="a"
            />
            <Area
              dataKey="deployed"
              type="natural"
              fill="url(#fillDeployed)"
              stroke="var(--color-deployed)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
