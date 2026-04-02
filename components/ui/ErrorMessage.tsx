interface Props {
  message: string
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
      <p className="text-sm text-red-700">{message}</p>
    </div>
  )
}