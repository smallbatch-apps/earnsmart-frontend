import Icon from "@/components/Icon";
import { Float } from "@headlessui-float/react";
import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
export interface Props {
  name: string;
  children: React.ReactNode;
  button: React.ReactNode;
  inModal?: boolean;
  disabled?: boolean;
  registerOptions?: RegisterOptions;
  asCombo?: boolean;
  searchAssetName?: string;
  leftArrow?: boolean;
  title?: string;
  onChange?: (v: string) => void;
  placement?: Placement;
  portal?: boolean;
  scrollHeight?: CoreSize;
  forceFull?: boolean;
  noClose?: boolean;
}

export default function Select({
  name,
  children,
  button,
  inModal = false,
  disabled = false,
  registerOptions = {},
  asCombo = false,
  searchAssetName,
  leftArrow = false,
  title,
  placement = "bottom-start",
  portal,
  scrollHeight,
  onChange = () => {},
  forceFull = true,
  noClose,
}: Readonly<Props>) {
  const buttonClasses = classNames("max-h-44 w-full border text-left text-sm", {
    "rounded-lg": !asCombo,
    "cursor-pointer": !disabled,
    "border-neutral-500 bg-neutral-50 text-neutral-700": !disabled,
    "h-full rounded-l-lg border-r-0": asCombo,
    "border-neutral-500 bg-neutral-100 text-neutral-600": disabled,
  });

  const optionsClasses = classNames(
    "h-full w-full divide-neutral-300 rounded-lg bg-neutral-50 bg-neutral-50 text-sm shadow-lg md:h-auto md:divide-y",
    "z-60 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:w-full",
    {
      "overflow-y-auto": scrollHeight || inModal,
      "md:max-h-52": scrollHeight === "sm",
      "md:max-h-72": scrollHeight === "md" || (!scrollHeight && inModal),
      "md:max-h-96": scrollHeight === "lg",
    }
  );

  const t = useTranslations();
  const { register, setValue } = useFormContext();

  register(name, registerOptions);

  return (
    <Listbox
      as="div"
      id={name}
      onChange={(v) => {
        onChange(v);
        searchAssetName && setValue(searchAssetName, "");
        setValue(name, v, { shouldValidate: true });
      }}
      disabled={disabled}
      className={classNames({
        "md:relative": !asCombo,
        "h-full": asCombo,
      })}
    >
      <Listbox.Button className={buttonClasses}>{button}</Listbox.Button>

      <Listbox.Options static className={optionsClasses}>
        <div className="flex items-center justify-between border border-l-0 border-r-0 border-t-0 border-neutral-500 p-5 text-base font-bold md:hidden">
          <Listbox.Button className={leftArrow ? "visible" : "invisible"}>
            <Icon name="arrow-left" />
          </Listbox.Button>
          {title ?? `${t("choose")} ${name}`}
          <Listbox.Button
            className={leftArrow || noClose ? "invisible" : "visible"}
          >
            <Icon name="close" />
          </Listbox.Button>
        </div>
        {children}
      </Listbox.Options>
    </Listbox>
  );
}
