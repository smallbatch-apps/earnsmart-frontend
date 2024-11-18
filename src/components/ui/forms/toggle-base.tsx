import { cn } from "@/lib/utils";

export interface Props {
  isOn: boolean;
  setIsOn: (isOn: boolean) => void;
  disabled?: boolean;
}

export default function ToggleBase({
  isOn,
  setIsOn,
  disabled,
}: Readonly<Props>) {
  const switchClass = cn(
    "absolute top-0 size-4 rounded-full border border-neutral-500 bg-neutral-50 transition-all",
    {
      "left-0": !isOn,
      "left-1/2": isOn,
    }
  );
  const bgClass = cn(
    "relative h-4 w-8 cursor-pointer rounded-full transition-all",
    {
      "bg-green-300": isOn,
      "bg-neutral-500": !isOn,
    }
  );
  return (
    <div className={bgClass}>
      <div className={switchClass}></div>
    </div>
  );
}
