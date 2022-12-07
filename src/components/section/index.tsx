import React, { FunctionComponent, HTMLAttributes } from 'react';
import clsx from 'clsx';

import * as styles from './styles.module.css';

const Section: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...props
}) => (
  <section {...props} className={clsx(styles.section, className)}>
    <div className={styles.centering}>
      <div className="flex-grow-0 lg:flex-grow px-4 py-8 lg:px-32 lg:py-64 min-w-full">
        {children}
      </div>
    </div>
  </section>
);

export { Section };
