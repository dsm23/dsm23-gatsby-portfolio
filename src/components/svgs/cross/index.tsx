import React, { FunctionComponent, SVGAttributes } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig);

const Cross: FunctionComponent<SVGAttributes<SVGSVGElement>> = props => (
  <svg width={24} height={24} fill="none" {...props}>
    <path
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeMiterlimit={10}
      stroke={fullConfig.theme?.colors?.white}
      d="M3 3l18 18M3 21L21 3"
    />
  </svg>
);

export { Cross };
