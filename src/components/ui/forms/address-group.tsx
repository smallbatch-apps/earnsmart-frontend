import type { Currency } from "@/types";
import { useFormContext } from "react-hook-form";
import AddressInput from "./address-input";
import FieldError from "./field-error";
import Label from "./label";

interface Props {
  currency: Currency;
  label: React.ReactNode;
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function AddressGroup({
  currency,
  label,
  name,
  placeholder = "",
  disabled = false,
}: Readonly<Props>) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div>
        <Label name={name}>{label}</Label>
        <AddressInput
          currency={currency}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
        />
        {errors[name]?.message && (
          <FieldError name={name}>
            {errors[name]?.message?.toString()}
          </FieldError>
        )}
      </div>
    </>
  );
}
