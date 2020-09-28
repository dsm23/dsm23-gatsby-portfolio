import React, { FunctionComponent, SVGAttributes } from 'react';

const SvgComponent: FunctionComponent<SVGAttributes<SVGSVGElement>> = props => (
  <svg width={200} height={150} viewBox="0 0 800 600" fill="none" {...props}>
    <path
      opacity={0.89}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M426.114 184.111c-75.327 0-136.392 61.064-136.392 136.391s61.065 136.392 136.392 136.392 136.391-61.065 136.391-136.392-61.064-136.391-136.391-136.391zM156.613 320.502c0-148.841 120.66-269.5 269.501-269.5 148.841 0 269.5 120.659 269.5 269.5s-120.659 269.501-269.5 269.501-269.501-120.66-269.501-269.501z"
      fill="#7D55FF"
    />
    <path
      opacity={0.89}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M373.5 143.109c-75.327 0-136.391 61.064-136.391 136.391 0 75.328 61.064 136.392 136.391 136.392 75.328 0 136.392-61.064 136.392-136.392 0-75.327-61.064-136.391-136.392-136.391zM104 279.5C104 130.659 224.659 10 373.5 10s269.501 120.659 269.501 269.5S522.341 549.001 373.5 549.001c-148.841 0-269.5-120.66-269.5-269.501z"
      fill="#B5CDFB"
    />
    <path
      d="M373.497 427.569c104.959 0 190.045-85.086 190.045-190.044 0-104.959-85.086-190.044-190.045-190.044-104.958 0-190.044 85.085-190.044 190.044 0 104.958 85.086 190.044 190.044 190.044z"
      stroke="#005B9D"
      strokeWidth={20}
    />
  </svg>
);

export default SvgComponent;
