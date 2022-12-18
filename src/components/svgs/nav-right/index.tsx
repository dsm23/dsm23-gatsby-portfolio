import React, { FunctionComponent, SVGAttributes } from 'react';

type Props = SVGAttributes<SVGSVGElement>;

const NavRight: FunctionComponent<Props> = ({
  className = 'text-teal-700',
  ...props
}) => (
  <svg width={24} height={24} fill="none" className={className} {...props}>
    <path fill="currentColor" d="M2 3l20 9-20 9 5-9-5-9z" />
  </svg>
);

export { NavRight };
