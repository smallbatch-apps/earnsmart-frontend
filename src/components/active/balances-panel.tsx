import { Asset } from "@/types";
import { useBalances } from "@/hooks/stores/useBalances";
import { usePrices } from "@/hooks/stores/usePrices";
import { allCurrencies } from "@/types";

import BalancePanelItem from "@/components/ui/balance-panel-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Component({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { balances, fundBalances } = useBalances();
  const { priceByCurrency } = usePrices();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>All Currencies</CardTitle>
        <CardDescription>
          All cryptocurrencies that are supported by EarnSmart, including your
          balances
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <table className="divide-y mt-5 w-full">
          <thead>
            <tr>
              <th colSpan={2}>Currency</th>
              <th>Price</th>
              <th>Rate</th>
              <th>Balance</th>
              <th>Fund Balance</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(allCurrencies).map(([currency, currencyInfo]) => (
              <BalancePanelItem
                key={currency}
                balance={balances[currency as Asset]}
                fundBalance={fundBalances[currency as Asset]}
                currency={currencyInfo}
                rateAndChange={priceByCurrency[currency as Asset]}
              />
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
