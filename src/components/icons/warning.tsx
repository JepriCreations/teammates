import { SVGIcon, SVGIconProps } from '@/components/ui/svg-icon'

export const WarningIcon = (props: SVGIconProps) => {
  return (
    <SVGIcon {...props}>
      <title id="title">Triangle Exclamation Icon</title>
      <path
        d="M15.3789 21.75H8.62109C8.02909 21.75 7.44903 21.5101 7.03003 21.0911L2.90894 16.97C2.48994 16.551 2.25 15.9709 2.25 15.3789V8.62109C2.25 8.02909 2.48994 7.44903 2.90894 7.03003L7.03003 2.90894C7.44903 2.48994 8.02909 2.25 8.62109 2.25H15.3789C15.9709 2.25 16.551 2.48994 16.97 2.90894L21.0911 7.03003C21.5101 7.44903 21.75 8.02909 21.75 8.62109V15.3789C21.75 15.9709 21.5101 16.551 21.0911 16.97L16.97 21.0911C16.551 21.5101 15.9709 21.75 15.3789 21.75ZM8.62109 3.75C8.42409 3.75 8.23006 3.82997 8.09106 3.96997L3.96997 8.09106C3.82997 8.23106 3.75 8.42409 3.75 8.62109V15.3789C3.75 15.5759 3.82997 15.7699 3.96997 15.9089L8.09106 20.03C8.23106 20.17 8.42409 20.25 8.62109 20.25H15.3789C15.5759 20.25 15.7699 20.17 15.9089 20.03L20.03 15.9089C20.17 15.7689 20.25 15.5759 20.25 15.3789V8.62109C20.25 8.42409 20.17 8.23006 20.03 8.09106L15.9089 3.96997C15.7689 3.82997 15.5759 3.75 15.3789 3.75H8.62109ZM13.02 15C13.02 14.448 12.573 14 12.02 14H12.01C11.458 14 11.0149 14.448 11.0149 15C11.0149 15.552 11.468 16 12.02 16C12.572 16 13.02 15.552 13.02 15ZM12.75 12V8C12.75 7.586 12.414 7.25 12 7.25C11.586 7.25 11.25 7.586 11.25 8V12C11.25 12.414 11.586 12.75 12 12.75C12.414 12.75 12.75 12.414 12.75 12Z"
        fill="currentColor"
      />
    </SVGIcon>
  )
}