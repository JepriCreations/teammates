import { Appbar } from '@/components/appbar'

interface SiteLayoutProps {
  params: { locale: string }
  children: React.ReactNode
}

export default function SiteLayout({
  children,
  params: { locale },
}: SiteLayoutProps) {
  return (
    <>
      <Appbar locale={locale} />
      <main className="pt-16">{children}</main>
    </>
  )
}
