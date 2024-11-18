"use client";

import * as React from "react";
import { Label, Pie, PieChart, Legend } from "recharts";

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
} from "@/components/ui/chart";

import { useBalances } from "@/hooks/stores/useBalances";
import { Asset } from "@/types";

import { formatCurrency } from "@/lib/utils";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg bg-background p-2 shadow-md border">
        <p className="font-bold">{data.formattedCrypto}</p>
        <p className="text-sm text-muted-foreground">{data.formattedFiat}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-col gap-2 pt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: entry.payload.fill }}
          />
          <span className="font-medium">{entry.payload.formattedCrypto}</span>
          <span className="text-muted-foreground">
            {entry.payload.formattedFiat}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function Component() {
  const { balances } = useBalances();
  let totalBalance = 0;
  const chartConfig = {} as ChartConfig;
  const chartData = [] as {
    currency: Asset;
    amount: number;
    formattedFiat: string;
    formattedCrypto: string;
    fill: string;
  }[];

  Object.entries(balances).forEach(([currency, balance], i) => {
    chartConfig[balance.balance.currency.symbol.toLowerCase()] = {
      label: balance.balance.currency.symbol,
      color: "hsl(var(--chart-" + (i + 1) + "))",
    };
    totalBalance += balance.balance.localAmountFiatValue();
    chartData.push({
      currency: currency as Asset,
      amount: balance.balance.localAmountFiatValue(),
      formattedFiat: formatCurrency(balance.balance.localAmountFiatValue()),
      formattedCrypto: balance.balance.localAmount(),
      fill:
        "var(--color-" + balance.balance.currency.symbol.toLowerCase() + ")",
    });
  });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>Cryptocurrency Holdings</CardTitle>
        <CardDescription>Current resolved balances in wallets</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="">
          <ChartContainer
            config={chartConfig}
            className="mx-auto w-full h-[250px]"
          >
            <PieChart margin={{ right: 48, left: 48 }}>
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="currency"
                outerRadius={90}
                innerRadius={60}
                strokeWidth={5}
                cx="35%"
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {formatCurrency(totalBalance)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Balance
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <Legend
                content={<CustomLegend />}
                align="right"
                verticalAlign="middle"
                layout="vertical"
                wrapperStyle={{ paddingLeft: 20 }}
              />
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Any fund subscriptions or investments are not reflected here.
        </div>
      </CardFooter>
    </Card>
  );
}
