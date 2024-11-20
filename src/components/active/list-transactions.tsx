import { Asset, Transaction } from "@/types";
import TransactionItem from "../ui/transaction-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type Props = {
  transactions: Transaction[];
  currency?: Asset;
  className?: string;
};

export default function ListTransactions({
  transactions,
  currency,
  className,
}: Props) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Your {currency} Transactions</CardTitle>
        <CardDescription>
          Lists {currency ? "all " + currency : ""} withdrawals, deposits, and
          subscriptions and fund redemptions.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <table className="divide-y mt-5 w-full">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Amount (USD)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
