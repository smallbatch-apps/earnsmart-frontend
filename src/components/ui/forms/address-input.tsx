import { Currency } from "@/types";
import { RegisterOptions, useFormContext } from "react-hook-form";
import InputBase from "./input-base";

export interface Props {
  name: string;
  currency: Currency;
  placeholder?: string;
  success?: string | null | boolean;
  disabled?: boolean;
  required?: boolean;
  isClearIcon?: boolean;
}

export default function AddressInput({
  name,
  currency,
  placeholder = "",
  success = null,
  disabled = false,
  required = false,
}: Readonly<Props>) {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  function validate(addr: string, curr: string, blockchain: string) {
    return true;
  }

  const registerOptions: RegisterOptions = {
    required,
  };

  return (
    <div className="relative">
      <InputBase
        id={name}
        name={name}
        type="text"
        spellCheck={false}
        success={!!success}
        disabled={disabled}
        placeholder={placeholder}
        error={errors.hasOwnProperty(name)}
        register={() => register(name, registerOptions)}
      />
    </div>
  );
}
