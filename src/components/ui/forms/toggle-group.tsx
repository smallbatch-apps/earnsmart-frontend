"use client";

import { useFormContext } from "react-hook-form";
import ToggleBase from "./toggle-base";

export interface Props {
  name: string;
  label?: string;
}

export default function ToggleGroup({ name, label = "" }: Readonly<Props>) {
  const { register, watch, setValue } = useFormContext();

  register(name);

  return <div className="flex gap-2"></div>;
}
