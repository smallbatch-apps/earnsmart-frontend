import { useId } from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import CheckboxBase from "./checkbox-base";

interface Props {
  name: string;
  label?: string;
  value?: string;
  description?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
}

export default function CheckboxGroup({
  name,
  label,
  value,
  description,
  disabled = false,
  defaultChecked,
}: Readonly<Props>) {
  const { register } = useFormContext<any>();
  const id = useId();
  return (
    <div className="flex items-center gap-2">
      <div>
        <CheckboxBase
          name={name}
          id={id + name}
          register={() => register(name, { value })}
          value={value}
          disabled={disabled}
          defaultChecked={defaultChecked}
        />
      </div>
      {label && (
        <div
          className={cn("flex flex-col", {
            "gap-1": !!description,
          })}
        >
          <label htmlFor={id + name} className="text-xs font-bold">
            {label}
          </label>
          {description && (
            <span className="text-gray-500 text-xs">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
