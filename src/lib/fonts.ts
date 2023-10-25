import { Noto_Color_Emoji as Emoji, Outfit as FontSans } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

export const fontEmoji = Emoji({
  subsets: ['emoji'],
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--emoji',
})
