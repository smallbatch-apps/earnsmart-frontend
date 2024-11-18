import { cn, formatDateTime } from "@/lib/utils";
import { CryptoIcon } from "@/components/crypto-icon";
import AmountBox from "@/components/ui/amount-box";
import { Balance, Currency, RateAndChange } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faMoneyBillTransfer,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "./button";

export default function Component({
  className,
  currency,
  balance,
  fundBalance,
  rateAndChange,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  balance: Balance | undefined;
  fundBalance: Balance | undefined;
  rateAndChange: RateAndChange;
  currency: Currency;
}) {
  const price = rateAndChange?.rate
    ? Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
        currencyDisplay: "narrowSymbol",
      }).format(rateAndChange?.rate ?? 0)
    : "-";

  const change = rateAndChange?.change
    ? Intl.NumberFormat("en-US", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
        currencyDisplay: "narrowSymbol",
      }).format(rateAndChange?.change ?? 0)
    : "-";

  const rateClass = cn("p-2 text-center", {
    "text-green-500": rateAndChange?.change > 0,
    "text-red-500": rateAndChange?.change < 0,
  });
  return (
    <tr className={cn("", className)} {...props}>
      <td className="p-2">
        <CryptoIcon currency={currency.symbol} />
      </td>
      <td className="p-2 text-lg">{currency.symbol}</td>
      <td className="p-2 text-center">{price}</td>
      <td className={rateClass}>
        {rateAndChange?.change > 0 ? (
          <FontAwesomeIcon className="mr-1" icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon className="mr-1" icon={faCaretDown} />
        )}
        {change}
      </td>
      <td className="p-2 text-center flex flex-col">
        {balance && <AmountBox amount={balance.balance} />}
        {!balance && <div className="text-gray-500">-</div>}
      </td>
      <td className="p-2 text-center">
        {fundBalance && <AmountBox amount={fundBalance.balance} />}
        {!fundBalance && <div className="text-gray-500">-</div>}
      </td>
      <td className="p-2 text-center w-16 text-right">
        <div className="flex gap-2">
          <Button size="icon" variant="outline" className="text-gray-400">
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </Button>
          <Button size="icon" variant="outline" className="text-gray-400">
            <FontAwesomeIcon icon={faMoneyBillTransfer} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
