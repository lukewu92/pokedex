import { SVGAttributes } from 'react';

export const PlusIcon = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11 19V13H5V11H11V5H13V11H19V13H13V19H11Z" fill="currentColor" />
  </svg>
)
