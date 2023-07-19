import { SVGIcon, SVGIconProps } from '@/components/ui/svg-icon'

export const ProjectDetailsIcon = (props: SVGIconProps) => {
  return (
    <SVGIcon {...props}>
      {/* <title id="title">Project Details Icon</title> */}
      <path
        d="M17 2.25H7.5C5.082 2.25 3.75 3.582 3.75 6V7.25H3C2.586 7.25 2.25 7.586 2.25 8C2.25 8.414 2.586 8.75 3 8.75H3.75V15.25H3C2.586 15.25 2.25 15.586 2.25 16C2.25 16.414 2.586 16.75 3 16.75H3.75V18C3.75 20.418 5.082 21.75 7.5 21.75H17C19.418 21.75 20.75 20.418 20.75 18V6C20.75 3.582 19.418 2.25 17 2.25ZM19.25 18C19.25 19.577 18.577 20.25 17 20.25H7.5C5.923 20.25 5.25 19.577 5.25 18V16.75H6C6.414 16.75 6.75 16.414 6.75 16C6.75 15.586 6.414 15.25 6 15.25H5.25V8.75H6C6.414 8.75 6.75 8.414 6.75 8C6.75 7.586 6.414 7.25 6 7.25H5.25V6C5.25 4.423 5.923 3.75 7.5 3.75H17C18.577 3.75 19.25 4.423 19.25 6V18ZM15 6.25H10C8.921 6.25 8.25 6.92 8.25 8V11C8.25 12.08 8.921 12.75 10 12.75H15C16.079 12.75 16.75 12.08 16.75 11V8C16.75 6.92 16.079 6.25 15 6.25ZM15.25 11C15.25 11.156 15.2209 11.214 15.2229 11.217C15.2149 11.221 15.156 11.25 15 11.25H10C9.849 11.25 9.78894 11.223 9.78394 11.223C9.78294 11.223 9.78296 11.223 9.78296 11.223C9.77896 11.214 9.75 11.156 9.75 11V8C9.75 7.844 9.7791 7.78596 9.7771 7.78296C9.7851 7.77896 9.844 7.75 10 7.75H15C15.182 7.75 15.217 7.77798 15.217 7.77698C15.221 7.78598 15.25 7.844 15.25 8V11Z"
        fill="currentColor"
      />
    </SVGIcon>
  )
}