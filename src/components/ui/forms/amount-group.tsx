import { RegisterOptions, useFormContext } from "react-hook-form";

import AmountInput from "./amount-input";
import AmountPercentage from "./amount-percentage";
import Label from "./label";
import Amount from "@/utils/Amount";

interface Props {
  label?: string | boolean;
  name?: string;
  asset: Amount;
  minimum?: Amount;
  minimumLabel?: string;
  placeholder?: string;
  maximum?: Amount;
  available?: Amount;
  disabled?: boolean;
  availableLabel?: string;
  hideAvailableRow?: boolean;
  hideLabelRow?: boolean;
  hidePercentages?: boolean;
  hideMinimum?: boolean;
  currentPercentage?: number;
  ignoreBalance?: boolean;
  registerOptions?: RegisterOptions;
  setCurrentPercentage?: (percentage: number) => void;
}

export default function AmountGroup({
  label,
  name = "amount",
  placeholder = "0.00",
  asset,
  minimum,
  minimumLabel,
  maximum,
  available,
  disabled,
  hideAvailableRow,
  hideLabelRow,
  availableLabel,
  currentPercentage,
  hidePercentages,
  hideMinimum,
  ignoreBalance,
  registerOptions = {},
  setCurrentPercentage = () => {},
}: Readonly<Props>) {
  const { formState, trigger } = useFormContext();

  const amountError = formState.errors.amount;
  const hasMinimumError = amountError?.type === "minimum";
  const hasMaximumError = amountError?.type === "maximum";
  const hasExceedsBalanceError = amountError?.type === "exceedsBalance";
  const hasExcessDecimalsError = amountError?.type === "excessDecimals";

  if (!label && label !== false) label = "Enter amount";
  if (!availableLabel) availableLabel = "Available";

  return (
    <div className="flex flex-col">
      {!hideLabelRow && (
        <div className="flex items-center justify-between">
          {label !== false && <Label name={name}>{label}</Label>}

          {minimum &&
            !hasMaximumError &&
            !hasExcessDecimalsError &&
            !hideMinimum && (
              <div
                className={`text-xs ${
                  hasMinimumError ? "text-red-500" : "text-neutral-600"
                }`}
              >
                {minimumLabel}: {minimum.toString()}
              </div>
            )}
          {(hasMaximumError || hasExcessDecimalsError) && (
            <div className="text-xs text-red-500">
              {formState.errors.amount?.message?.toString()}
            </div>
          )}
        </div>
      )}
      <div className="relative">
        <AmountInput
          currency={asset?.currency}
          name={name}
          placeholder={placeholder}
          balance={ignoreBalance ? undefined : asset}
          disabled={disabled}
          minimum={minimum}
          maximum={maximum}
          registerOptions={{
            ...registerOptions,
            required: "Amount required",
            onChange: () => {
              setCurrentPercentage(0);
              trigger("amount");
            },
          }}
        />
      </div>

      {asset && !hideAvailableRow && (
        <div className="mt-1 flex items-center justify-between">
          <div
            className={`text-xs ${
              hasExceedsBalanceError ? "text-red-400" : ""
            }`}
          >
            {available && (
              <span className="font-bold">
                {availableLabel}: {available.toString()}
              </span>
            )}
          </div>
          {!hidePercentages && (
            <AmountPercentage
              amountName={name}
              asset={asset}
              maximum={maximum}
              minimum={minimum}
              setCurrentPercentage={setCurrentPercentage}
            />
          )}
        </div>
      )}
    </div>
  );
}
