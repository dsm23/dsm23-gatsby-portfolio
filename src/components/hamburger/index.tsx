import React, { FunctionComponent, HTMLAttributes } from 'react';
import cx from 'clsx';

import * as styles from './styles.module.css';

interface Props extends HTMLAttributes<SVGSVGElement> {
  open: boolean;
}

const Hamburger: FunctionComponent<Props> = ({ open, className, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={cx(styles.hamburger, { [styles.open]: open }, className)}
    viewBox="0 0 100 100"
  >
    <rect
      className={`${styles.line} ${styles.top}`}
      width="80"
      height="10"
      x="10"
      y="20"
      rx="5"
    />
    <rect
      className={`${styles.line} ${styles.middle}`}
      width="80"
      height="10"
      x="10"
      y="45"
      rx="5"
    />
    <rect
      className={`${styles.line} ${styles.bottom}`}
      width="80"
      height="10"
      x="10"
      y="70"
      rx="5"
    />
  </svg>
);

export default Hamburger;
