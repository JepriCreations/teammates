import { SVGIcon, SVGIconProps } from '@/components/ui/svg-icon'

export const LoadingIcon = (props: SVGIconProps) => {
  return (
    <SVGIcon {...props}>
      <title id="title">Loading Icon</title>
      <path
        d="M14.472 4.39108C12.8653 3.86905 11.1345 3.86907 9.52779 4.39114C7.92107 4.91322 6.52087 5.93053 5.52786 7.2973C4.53485 8.66406 4.00001 10.3101 4 11.9995C3.99999 13.6889 4.5348 15.335 5.52779 16.7018C6.52078 18.0685 7.92097 19.0859 9.52768 19.608C11.1344 20.1301 12.8651 20.1301 14.4719 19.6081C16.0786 19.0861 17.4789 18.0688 18.4719 16.7021C19.465 15.3354 19.9999 13.6894 20 12C20 11.4477 20.4478 11 21 11C21.5523 11 22 11.4478 22 12.0001C21.9999 14.1118 21.3313 16.1694 20.0899 17.8778C18.8486 19.5862 17.0983 20.8577 15.0899 21.5102C13.0814 22.1627 10.918 22.1627 8.9096 21.5101C6.90121 20.8574 5.15098 19.5858 3.90974 17.8773C2.6685 16.1688 1.99998 14.1113 2 11.9995C2.00002 9.88774 2.66856 7.83018 3.90982 6.12173C5.15109 4.41328 6.90134 3.14163 8.90974 2.48904C10.9181 1.83645 13.0816 1.83642 15.09 2.48895C15.6153 2.65961 15.9027 3.22376 15.7321 3.74901C15.5614 4.27427 14.9973 4.56173 14.472 4.39108Z"
        fill="currentColor"
      />
    </SVGIcon>
  )
}