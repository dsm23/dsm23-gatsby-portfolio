import React, { FunctionComponent, SVGAttributes } from 'react';

type Props = SVGAttributes<SVGSVGElement>;

const EmptyStar: FunctionComponent<Props> = ({
  className = 'text-yellow-500',
  ...props
}) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    <path
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeMiterlimit={10}
      stroke="currentColor"
      d="M12 2l3 7h7l-5 6 2 7-7-4-7 4 2-7-5-6h7l3-7z"
    />
  </svg>
);

export { EmptyStar };
