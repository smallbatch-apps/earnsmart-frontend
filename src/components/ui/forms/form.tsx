import { cn } from "@/lib/utils";
import { FormProvider } from "react-hook-form";
export interface Props {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  form: any;
  formRef?: any;
  asModal?: boolean;
  className?: string;
}

export default function Form({
  children,
  onSubmit,
  form,
  formRef,
  asModal = false,
  className,
}: Readonly<Props>) {
  const classes = cn(
    "flex flex-col gap-6 text-sm",
    {
      "h-full justify-end md:h-auto": asModal,
    },
    className
  );
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={classes}
        ref={formRef}
      >
        {children}
      </form>
    </FormProvider>
  );
}
