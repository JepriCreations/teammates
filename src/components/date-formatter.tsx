import { format, parseISO } from 'date-fns'

type Props = {
  dateString: string
}

export const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString)
  const formattedDate = format(date, 'MM.dd.yy')

  return (
    <time className="mt-0.5 font-mono text-body-sm" dateTime={dateString}>
      {formattedDate}
    </time>
  )
}
