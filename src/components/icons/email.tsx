import { SVGIcon, SVGIconProps } from '@/components/ui/svg-icon'

export const EmailIcon = (props: SVGIconProps) => {
  return (
    <SVGIcon {...props}>
      <title id="title">Email Icon</title>
      <path
        d="M18 20.75H6C3.582 20.75 2.25 19.418 2.25 17V8C2.25 5.582 3.582 4.25 6 4.25H18C20.418 4.25 21.75 5.582 21.75 8V17C21.75 19.418 20.418 20.75 18 20.75ZM6 5.75C4.423 5.75 3.75 6.423 3.75 8V17C3.75 18.577 4.423 19.25 6 19.25H18C19.577 19.25 20.25 18.577 20.25 17V8C20.25 6.423 19.577 5.75 18 5.75H6ZM13.0291 13.179L17.9409 9.60699C18.2759 9.36399 18.35 8.89401 18.106 8.55901C17.863 8.22501 17.3951 8.149 17.0581 8.394L12.146 11.966C12.058 12.03 11.941 12.03 11.853 11.966L6.94092 8.394C6.60292 8.149 6.13607 8.22601 5.89307 8.55901C5.64907 8.89401 5.72311 9.36299 6.05811 9.60699L10.97 13.18C11.278 13.404 11.639 13.515 11.999 13.515C12.359 13.515 12.7221 13.403 13.0291 13.179Z"
        fill="currentColor"
      />
    </SVGIcon>
  )
}
