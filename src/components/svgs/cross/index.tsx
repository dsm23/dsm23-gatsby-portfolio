import React, { FunctionComponent, SVGAttributes } from 'react';
import { theme } from 'twin.macro';

const Cross: FunctionComponent<SVGAttributes<SVGSVGElement>> = props => (
  <svg width={24} height={24} fill="none" {...props}>
    <path
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeMiterlimit={10}
      stroke={`${theme`colors.white`}`}
      d="M3 3l18 18M3 21L21 3"
    />
  </svg>
);

export { Cross };
