import { ExperienceLevel } from '@/types/collections'
import { cn } from '@/lib/utils'

export const ExperienceLevelIcon = ({
  className,
  level,
  ...props
}: {
  className?: string
  level: ExperienceLevel
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={cn('h-6 w-6', className)}
    {...props}
  >
    <path
      d="M2 18.0172C2 17.4649 2.44772 17.0172 3 17.0172H12C12.5523 17.0172 13 17.4649 13 18.0172C13 18.5694 12.5523 19.0172 12 19.0172H3C2.44771 19.0172 2 18.5694 2 18.0172Z"
      fill="currentColor"
    />
    <path
      opacity={[ExperienceLevel.Entry].includes(level) ? '0.18' : '1'}
      d="M2 12C2 11.4477 2.44772 11 3 11H15.2636C15.8159 11 16.2636 11.4477 16.2636 12C16.2636 12.5523 15.8159 13 15.2636 13H3C2.44772 13 2 12.5523 2 12Z"
      fill="currentColor"
    />
    <path
      opacity={
        [ExperienceLevel.Entry, ExperienceLevel.Intermediate].includes(level)
          ? '0.18'
          : '1'
      }
      d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
      fill="currentColor"
    />
  </svg>
)
