import Amount from "@/utils/Amount";
import { Currency, Asset } from "@/types";
import { cn } from "@/lib/utils";
import { CryptoIcon } from "@/components/crypto-icon";
import { useEffect, useRef } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

export interface Props {
  currency: Currency;
  name: string;
  placeholder?: string;
  minimum?: Amount;
  maximum?: Amount;
  balance?: Amount;
  disabled?: boolean;
  asCombo?: boolean;
  registerOptions?: RegisterOptions;
  isClearIcon?: boolean;
}

export default function AmountInput({
  name,
  balance,
  maximum,
  minimum,
  currency,
  asCombo = false,
  disabled = false,
  registerOptions = {},
  placeholder = "0.00",
}: Readonly<Props>) {
  const { register, watch, setValue, formState } = useFormContext();
  const hasError = formState.errors[name];
  const prevCurrency = useRef<Asset | undefined>(currency?.symbol);

  const value = watch(name);

  useEffect(() => {
    if (prevCurrency.current !== currency?.symbol) {
      if (watch(name)) {
        setValue(name, "", {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      }
      prevCurrency.current = currency?.symbol; // Update the previous currency to the current one
    }
  }, [currency?.symbol]);

  const classes = cn(
    "w-full rounded-r-lg border p-4 placeholder-neutral-500 focus:outline-none",
    {
      "rounded-l-none": asCombo,
      "rounded-l-lg pl-12": !asCombo,
      "text-neutral-900 ": !disabled,
      "pointer-events-none cursor-default bg-neutral-100 text-neutral-500":
        disabled,
      "pr-12": value,
      "border-red-400": hasError,
    }
  );

  const defaultRegisterOptions = {
    required: "amount required",
    validate: {
      exceedsBalance: (v: string) => {
        if (!balance) return true;
        if (balance.isLessThanValue(v)) return "exceeds amount available";
        return true;
      },
      minimum: (v: string) => {
        if (!minimum) return true;
        if (minimum.isMoreThanValue(v)) return "below minimum amount";
        return true;
      },
      maximum: (v: string) => {
        if (!maximum) return true;
        if (maximum.isLessThanValue(v)) return "exceeds maximum amount";
        return true;
      },
      excessDecimals: (v: string) => {
        if (!v) return true;
        const splitValue = v.split(".");
        if (splitValue.length === 1) return true;
        if (splitValue[1].length <= currency.decimals) return true;
        return "unsupported decimals";
      },
      positive: (v: string) => {
        if (Number(v) <= 0) return "swap err amount positive";
        return true;
      },
    },
  };

  const mergedOptions = {
    ...defaultRegisterOptions,
    ...registerOptions,
    validate: {
      ...defaultRegisterOptions.validate,
      ...registerOptions.validate,
    },
  };

  return (
    <div
      className={cn("relative flex items-center", {
        "w-full": asCombo,
      })}
    >
      {!asCombo && (
        <div
          className={cn("absolute left-4 top-4", {
            "opacity-50": disabled,
          })}
        >
          <CryptoIcon currency={currency.symbol} />
        </div>
      )}

      <input
        type="number"
        step="any"
        id={name}
        disabled={disabled}
        {...register(name, mergedOptions)}
        placeholder={placeholder}
        className={classes}
        onWheel={(e) => {
          const target = e.target as HTMLInputElement;
          target.blur();
        }}
      />
    </div>
  );
}
