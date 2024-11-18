export interface Props {
  children: React.ReactNode
  name?: string
}

export default function FieldError({ children, name = '' }: Readonly<Props>) {
  return (
    <div
      id={`validation-error-${name}`}
      className="mt-2 text-xs font-bold text-red-400"
      role="alert"
    >
      {children}
    </div>
  )
}
