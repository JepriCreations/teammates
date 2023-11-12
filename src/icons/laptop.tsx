import { SVGIcon, SVGIconProps } from '@/components/ui/svg-icon'

export const LaptopIcon = (props: SVGIconProps) => {
  return (
    <SVGIcon {...props}>
      <title id="title">Laptop Icon</title>
      <path
        d="M21 15.25H20.75V7C20.75 4.582 19.418 3.25 17 3.25H7C4.582 3.25 3.25 4.582 3.25 7V15.25H3C2.586 15.25 2.25 15.586 2.25 16V17C2.25 18.748 3.252 19.75 5 19.75H19C20.748 19.75 21.75 18.748 21.75 17V16C21.75 15.586 21.414 15.25 21 15.25ZM4.75 7C4.75 5.423 5.423 4.75 7 4.75H17C18.577 4.75 19.25 5.423 19.25 7V15.25H4.75V7ZM20.25 17C20.25 17.923 19.923 18.25 19 18.25H5C4.077 18.25 3.75 17.923 3.75 17V16.75H20.25V17Z"
        fill="currentColor"
      />
    </SVGIcon>
  )
}