import React, { FunctionComponent, SVGAttributes } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig);

const FilledStar: FunctionComponent<SVGAttributes<SVGSVGElement>> = props => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fill={fullConfig.theme?.colors?.yellow?.[500]}
      d="M12 2l3 7h7l-5 6 2 7-7-4-7 4 2-7-5-6h7l3-7z"
    />
  </svg>
);

export { FilledStar };
