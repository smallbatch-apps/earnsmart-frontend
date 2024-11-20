import { Asset, Swap } from "@/types";
import SwapItem from "../ui/swap-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type Props = {
  swaps: Swap[];
  currency?: Asset;
  className?: string;
};

export default function ListSwaps({ swaps, currency, className }: Props) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Your {currency} Swaps</CardTitle>
        <CardDescription>
          Lists all swaps between {currency ? "all " + currency : ""} .
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <table className="divide-y mt-5 w-full">
          <thead>
            <tr>
              <th>From Currency</th>
              <th>To Currency</th>
              <th>Amount</th>
              <th>Amount (USD)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {swaps.map((swap) => (
              <SwapItem key={swap.id} swap={swap} />
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
