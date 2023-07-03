'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MenuIcon } from '@/components/icons'
import { NavLink } from '@/components/nav-link'

interface NavMenuButtonProps {
  mainMenu?: { id: string; title: string; slug: string }[]
}
export const NavMenuButton = ({ mainMenu }: NavMenuButtonProps) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button icon={<MenuIcon />} className="p-2" />
      </SheetTrigger>
      <SheetContent position="left" size="full">
        <SheetHeader className="mb-3">
          <SheetTitle className="pr-2 text-start text-3xl">Menu</SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-5">
          {mainMenu?.map(({ id, title, slug }) => (
            <li key={id} className="block w-fit text-2xl">
              <NavLink slug={slug}>{title}</NavLink>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
