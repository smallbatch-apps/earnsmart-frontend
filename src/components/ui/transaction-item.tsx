import { formatDateTime } from "@/lib/utils";
import { CryptoIcon } from "@/components/crypto-icon";
import { Transaction } from "@/types";

type Props = {
  transaction: Transaction;
};

export default function TransactionItem({ transaction }: Props) {
  return (
    <tr>
      <td className="p-2">
        <CryptoIcon currency={transaction.amount.currency.symbol} />
      </td>
      <td className="p-2 text-lg">{transaction.transactionType}</td>
      <td className="p-2 text-lg">{transaction.amount.toString()}</td>
      <td className="p-2 text-center">
        {transaction.amount.localAmountFiat()}
      </td>
      <td className="p-2 text-center">
        {formatDateTime(transaction.timestamp)}
      </td>
    </tr>
  );
}
