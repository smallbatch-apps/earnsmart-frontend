import { formatDateTime } from "@/lib/utils";
import { CryptoIcon } from "@/components/crypto-icon";
import { Swap } from "@/types";

type Props = {
  swap: Swap;
};

export default function SwapItem({ swap }: Props) {
  return (
    <tr>
      <td className="p-2">
        <CryptoIcon currency={swap.fromAmount.currency.symbol} />
        <CryptoIcon currency={swap.toAmount.currency.symbol} />
      </td>
      <td className="p-2 text-lg">{swap.fromAmount.toString()}</td>
      <td className="p-2 text-center">{swap.fromAmount.localAmountFiat()}</td>
      <td className="p-2 text-lg">{swap.toAmount.toString()}</td>
      <td className="p-2 text-center">{swap.toAmount.localAmountFiat()}</td>
      <td className="p-2 text-center">{formatDateTime(swap.createdAt)}</td>
    </tr>
  );
}
