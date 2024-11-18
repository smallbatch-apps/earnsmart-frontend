import { RegisterOptions, useFormContext } from "react-hook-form";

import FieldError from "./field-error";
import InputBase from "./input-base";
import Label from "./label";

export interface Props {
  className?: string;
  label: string;
  name: string;
  placeholder?: string;
  registerOptions?: RegisterOptions;
  success?: string | null | boolean;
  type?: "text" | "email" | "password" | "number";
  disabled?: boolean;
}

export default function InputGroup({
  label,
  className = "",
  name,
  placeholder = "",
  registerOptions = {},
  success = null,
  type = "text",
  disabled = false,
}: Props) {
  const { register, formState, getFieldState } = useFormContext();

  const { error } = getFieldState(name, formState);

  return (
    <div className={className}>
      <Label name={name}>{label}</Label>
      <InputBase
        type={type}
        name={name}
        placeholder={placeholder}
        error={!!error}
        id={name}
        register={() => register(name, registerOptions)}
        success={!!success}
        disabled={disabled}
        readOnly={disabled}
      />
      {error?.message && (
        <FieldError name={name}>{error?.message?.toString()}</FieldError>
      )}
    </div>
  );
}
