import { useMemo } from "react";

import { useFormContext } from "react-hook-form";
import { FormFields } from "./form-handler";
import Amount from "@/utils/Amount";
import { CardContent, CardFooter } from "../../card";
import { Button } from "../../button";
import { usePrices } from "@/hooks/stores/usePrices";
import { allCurrencies } from "@/types";

export default function Summary() {
  const { priceByCurrency } = usePrices();
  const { watch } = useFormContext<FormFields>();
  const currency = watch("currency");
  const amount = watch("amount");

  const amountObject = useMemo(() => {
    const usdPrice = priceByCurrency[currency].rate * amount;
    return Amount.fromDecimal(
      amount.toString(),
      allCurrencies[currency],
      usdPrice.toString()
    );
  }, [amount, currency]);

  return (
    <>
      <CardContent className="flex flex-col gap-6 divide-y">
        <div className="flex gap-2 justify-between items-center">
          <div className="text-lg font-medium">Currency</div>
          <div>{currency}</div>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <div className="text-lg font-medium">Amount</div>
          <div className="flex gap-1">
            <div>{amountObject.toString()}</div>
            <div className="text-gray-400">
              {amountObject.localAmountFiat()}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button type="button" variant="secondary">
          Reset
        </Button>
        <Button type="submit">Verify</Button>
      </CardFooter>
    </>
  );
}
