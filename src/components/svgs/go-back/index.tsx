import React, { FunctionComponent, SVGAttributes } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig);

const GoBack: FunctionComponent<SVGAttributes<SVGSVGElement>> = props => (
  <svg width={24} height={24} fill="none" {...props}>
    <path
      fill={fullConfig.theme?.colors?.teal?.[700]}
      d="M1.999 12l9-8v5s7.66-.5 9.85 4.3c1.6 3.3 1.1 5.9 1 6.3.03-.12-.5-.67-.58-.78-.22-.28-.46-.55-.7-.82-.48-.52-1-1-1.56-1.43-.81-.62-1.73-1.12-2.72-1.39-1.09-.29-2.21-.18-3.33-.18h-1.96v5l-9-8z"
    />
  </svg>
);

export { GoBack };
