export interface SVGIconProps extends React.SVGAttributes<SVGElement> {
  className?: string
  size?: string | number
}

export const SVGIcon = ({ className, size = 24, ...rest }: SVGIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-labelledby="title"
      className={className}
      {...rest}
    />
  )
}
