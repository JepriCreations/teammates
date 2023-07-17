import { SVGIcon, SVGIconProps } from '@/components/ui/svg-icon'

export const CheckIcon = (props: SVGIconProps) => {
  return (
    <SVGIcon {...props}>
      <title id="title">Check Icon</title>
      <path
        d="M9 17.75C8.999 17.75 8.99799 17.75 8.99699 17.75C8.79699 17.749 8.60599 17.669 8.46499 17.526L4.46499 13.464C4.17399 13.169 4.178 12.694 4.473 12.403C4.768 12.113 5.24399 12.116 5.53399 12.411L9.003 15.935L18.469 6.46902C18.762 6.17602 19.237 6.17602 19.53 6.46902C19.823 6.76202 19.823 7.23705 19.53 7.53005L9.53 17.5301C9.39 17.6711 9.199 17.75 9 17.75Z"
        fill="currentColor"
      />
    </SVGIcon>
  )
}