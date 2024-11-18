import { useFormContext } from "react-hook-form";
import { Select } from "@headlessui/react";
import FieldError from "./field-error";
import Label from "./label";

interface Props {
  label: string;
  name: string;
  children: React.ReactNode;
}

export default function InputSelectGroup({
  label,
  name,
  children,
}: Readonly<Props>) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      <Label name={name}>{label}</Label>
      {/* <Select
        name={name}
        className="w-full border p-4 rounded-lg"
        style={{ "--select-arrow-padding": "1rem" } as React.CSSProperties}
      >
        {children}
      </Select> */}

      <div className="relative">
        <Select
          {...register(name)}
          className="appearance-none w-full pr-10 border p-4 rounded-lg"
          name={name}
        >
          {children}
        </Select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {errors[name]?.message && (
        <FieldError name={name}>{errors[name]?.message?.toString()}</FieldError>
      )}
    </div>
  );
}
