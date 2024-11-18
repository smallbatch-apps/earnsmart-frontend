export interface Props {
  name: string
  children: React.ReactNode
}

export default function Label({ name, children }: Readonly<Props>) {
  return (
    <label
      className="m-0 mb-2 flex text-sm font-bold text-neutral-900"
      htmlFor={name}
      aria-label={name}
    >
      {children}
    </label>
  )
}
