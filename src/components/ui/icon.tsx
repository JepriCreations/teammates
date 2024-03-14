import * as React from 'react'

import { cn } from '@/lib/utils'

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  symbol: string
}

const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ symbol, className, ...props }, ref) => (
    <i
      ref={ref}
      className={cn(
        'font-regular ease-in-expo text-2xl leading-none transition-[font-variation-settings] duration-300',
        className
      )}
      {...props}
    >
      {symbol}
    </i>
  )
)
Icon.displayName = 'Icon'

export { Icon }
