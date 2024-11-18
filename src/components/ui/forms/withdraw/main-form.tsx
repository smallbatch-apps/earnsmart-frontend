import { useFormContext } from "react-hook-form";
import { FormFields, FormStep } from "./form-handler";
import AmountGroup from "../amount-group";
import InputSelectGroup from "../input-select-group";
import { CardContent, CardFooter } from "../../card";
import { allCurrencies } from "@/types";
import Amount from "@/utils/Amount";
import { useBalances } from "@/hooks/stores/useBalances";

import { Button } from "../../button";
import InputGroup from "../input-group";
import AddressGroup from "../address-group";
export default function MainForm() {
  const { watch, setValue } = useFormContext<FormFields>();
  const currency = watch("currency");
  const { balances } = useBalances();
  return (
    <>
      <CardContent className="flex flex-col gap-6">
        <InputSelectGroup name="currency" label="Currency">
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
          asset={new Amount("0", allCurrencies[currency])}
          ignoreBalance
          hidePercentages
        />
        <AddressGroup
          currency={allCurrencies[currency]}
          name="address"
          label="Recipient address"
        />
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
