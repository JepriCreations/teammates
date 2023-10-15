import Link, { LinkProps } from 'next/link'

import { ActionCard } from '@/components/ui/card'
import { Icons } from '@/components/icons'

interface LinkCardProps extends LinkProps {
  children?: React.ReactNode
}

export const LinkCard = ({ children, ...props }: LinkCardProps) => {
  return (
    <ActionCard>
      <Link className="group" {...props}>
        {children}
        <Icons.arrowUp className="absolute right-0 top-0 m-3 hidden duration-300 animate-in fade-in slide-in-from-bottom-2 slide-in-from-left-2 group-hover:block" />
      </Link>
    </ActionCard>
  )
}
