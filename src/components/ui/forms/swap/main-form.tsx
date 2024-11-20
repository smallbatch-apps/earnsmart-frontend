import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormFields, FormStep } from "./form-handler";
import AmountGroup from "../amount-group";
import InputSelectGroup from "../input-select-group";
import { CardContent, CardFooter } from "../../card";
import { allCurrencies } from "@/types";
import Amount from "@/utils/Amount";
import { useBalances } from "@/hooks/stores/useBalances";

import { Button } from "../../button";
import { formatCurrency } from "@/lib/utils";
export default function MainForm() {
  const { watch, setValue } = useFormContext<FormFields>();

  const { from_currency, to_currency, from_amount, rate } = watch();

  const [toAmount, setToAmount] = useState<Amount | null>(
    new Amount("0", allCurrencies[to_currency])
  );
  const { balances } = useBalances();

  useEffect(() => {
    if (!from_amount) {
      setToAmount(new Amount("0", allCurrencies[to_currency]));
    }
  }, [from_amount, from_currency, to_currency]);
  return (
    <>
      <CardContent className="flex flex-col gap-6">
        <InputSelectGroup name="from_currency" label="From Currency">
          {Object.values(allCurrencies)
            .filter((c) => {
              return (
                balances[c.symbol] && !balances[c.symbol]?.balance.isZero()
              );
            })
            .map((c) => (
              <option key={c.symbol} value={c.symbol}>
                {c.name} - {balances[c.symbol]?.balance.toString()}
              </option>
            ))}
        </InputSelectGroup>
        <AmountGroup
          name="amount"
          label="Amount"
          asset={new Amount("0", allCurrencies[from_currency])}
          ignoreBalance
          hidePercentages
        />
        <div className="flex justify-center">
          <div className="inline-block p-2 px-3 bg-muted border rounded-full">
            to
          </div>
        </div>
        <InputSelectGroup name="to_currency" label="To Currency">
          {Object.values(allCurrencies).map((c) => (
            <option key={c.symbol} value={c.symbol}>
              {c.name}
            </option>
          ))}
        </InputSelectGroup>
        <div className="flex justify-between p-4 border border-yellow-300 text-lg bg-yellow-50 border-2 rounded-md items-center">
          <div className="font-semibold">Swap rate</div>
          <div className="flex items-center gap-2">
            {toAmount.toString()}
            <span className="text-sm">{formatCurrency(rate)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button type="button" variant="secondary">
          Reset
        </Button>
        <Button
          type="button"
          onClick={() => setValue("step", FormStep.Confirm)}
        >
          Verify
        </Button>
      </CardFooter>
    </>
  );
}
