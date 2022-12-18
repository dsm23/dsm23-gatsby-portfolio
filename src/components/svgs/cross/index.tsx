import React, { FunctionComponent, SVGAttributes } from 'react';

type Props = SVGAttributes<SVGSVGElement>;

const Cross: FunctionComponent<Props> = ({
  className = 'text-white',
  ...props
}) => (
  <svg width={24} height={24} fill="none" className={className} {...props}>
    <path
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeMiterlimit={10}
      stroke="currentColor"
      d="M3 3l18 18M3 21L21 3"
    />
  </svg>
);

export { Cross };
