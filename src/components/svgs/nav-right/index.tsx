import React, { FunctionComponent, SVGAttributes } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig);

const NavRight: FunctionComponent<SVGAttributes<SVGSVGElement>> = props => (
  <svg width={24} height={24} fill="none" {...props}>
    <path fill={fullConfig.theme?.colors?.teal?.[700]} d="M2 3l20 9-20 9 5-9-5-9z" />
  </svg>
);

export { NavRight };
