import { cn } from '@/lib/utils'

export interface SVGIconProps extends React.SVGAttributes<SVGElement> {
  className?: string
  size?: string | number
}

export type SvgIconType = typeof SVGIcon

export const SVGIcon = ({ className, size, ...rest }: SVGIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-labelledby="title"
      className={cn('shrink-0', !size && 'h-6 w-6', className)}
      {...(size && { width: size, height: size })}
      {...rest}
    />
  )
}
