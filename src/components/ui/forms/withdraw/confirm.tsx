import { useFormContext } from "react-hook-form";
import { FormFields } from "./form-handler";
import QRCode from "react-qr-code";

import { Button } from "../../button";
import { CardContent, CardFooter } from "../../card";
import { Transaction } from "@/types";
import { formatDateTime, formatEthAddress } from "@/lib/utils";

type Props = {
  transaction: Transaction | null;
  setTransaction: (transaction: Transaction | null) => void;
};
export default function Confirm({ transaction, setTransaction }: Props) {
  if (!transaction) return null;
  const { reset } = useFormContext<FormFields>();
  return (
    <>
      <CardContent className="flex flex-col gap-4 text-sm">
        <div className="flex justify-between gap-2">
          <p className="font-semibold">Transaction ID</p>
          <p>{transaction.id}</p>
        </div>
        <div className="flex justify-between gap-2">
          <p className="font-semibold">Currency</p>
          <p>{transaction.amount.currency.symbol}</p>
        </div>
        <div className="flex justify-between gap-2">
          <div className="font-semibold">Amount</div>
          <div className="flex gap-1 items-end">
            <div>{transaction.amount.toString()}</div>
            <div className="text-xs text-gray-400">
              {transaction.amount.localAmountFiat()}
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <p className="font-semibold">Destination Address</p>
          <p title={transaction.address}>
            {transaction.address ? formatEthAddress(transaction.address) : ""}
          </p>
        </div>
        <div className="flex justify-between gap-2">
          <p className="font-semibold">Timestamp</p>
          <p>{formatDateTime(transaction.timestamp)}</p>
        </div>
        <div className="flex justify-between gap-2">
          <p className="font-semibold">Status</p>
          <p>Pending</p>
        </div>
        <div className="flex flex-col items-center gap-2 mt-6">
          <div>
            <span className="font-bold">DEMO MODE:</span> DO{" "}
            <span className="font-bold">NOT</span> TRANSFER MONEY TO THIS
            ADDRESS
          </div>
          <div className="flex justify-center w-46">
            <QRCode value={transaction.address ?? ""} />
          </div>
          {transaction.address}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button
          className="w-full"
          type="button"
          variant="secondary"
          onClick={() => {
            setTransaction(null);
            reset();
          }}
        >
          Confirm and Clear
        </Button>
      </CardFooter>
    </>
  );
}
