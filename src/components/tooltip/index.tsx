import React, { FunctionComponent, HTMLAttributes } from 'react';
import cx from 'clsx';

import * as styles from './styles.module.css';

type Props = HTMLAttributes<HTMLDivElement>;

const Tooltip: FunctionComponent<Props> = ({
  children,
  className,
  ...props
}) => (
  <div
    data-tip-position="top"
    {...props}
    inert="true"
    role="tooltip"
    className={cx(styles.tooltip, className)}
  >
    {children}
  </div>
);

export default Tooltip;
