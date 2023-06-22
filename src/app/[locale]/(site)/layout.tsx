import { Appbar } from '@/components/appbar'

interface SiteLayoutProps {
  children: React.ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <Appbar />
      <main className="pt-16">{children}</main>
    </>
  )
}
