import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export interface Props extends ComponentPropsWithoutRef<"input"> {
  error?: boolean;
  success?: boolean;
  className?: string;
  type?: string;
  disabled?: boolean;
  register: () => Record<string, unknown>;
}

export default function Input(props: Readonly<Props>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    error,
    success,
    className,
    type = "text",
    register,
    ...remaining
  } = props;

  const classes = cn(
    "p-4 text-sm rounded-lg block w-full border placeholder:text-neutral-500 focus:outline-none focus:shadow-inner",
    {
      "border focus:border-brand-500": !success && !error,
      "border-2": success || error,
      "border-green-400": success,
      "border-red-400": error,
    },
    className
  );

  return (
    <input type={type} className={classes} {...remaining} {...register()} />
  );
}
