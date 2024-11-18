interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  register?: () => Record<string, unknown>
}

/** Base Checkbox input field, with support for spread of functionality. Optionally can
 * be set to use the useFormContext hook to register the field. To use in a form
 * context it should be wrapped with the CheckboxGroup component.
 */

export default function CheckboxBase({ register = () => ({}), ...remaining }: Readonly<Props>) {
  return (
    <input
      type="checkbox"
      className="size-4 rounded border-neutral-300 bg-neutral-100 text-brand-500 focus:ring-2 focus:ring-brand-500"
      {...remaining}
      {...register()}
    />
  )
}
