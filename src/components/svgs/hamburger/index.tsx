import React, { FunctionComponent, SVGAttributes } from 'react';
import { theme } from 'twin.macro';

const Hamburger: FunctionComponent<SVGAttributes<SVGSVGElement>> = props => (
  <svg width={24} height={24} fill="none" {...props}>
    <path
      fill={`${theme`colors.white`}`}
      d="M2 18a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zm0-6a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zm0-6a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1z"
      clipRule="evenodd"
      fillRule="evenodd"
    />
  </svg>
);

export { Hamburger };
