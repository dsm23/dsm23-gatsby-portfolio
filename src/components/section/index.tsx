import React, { FunctionComponent, HTMLAttributes } from 'react';
import clsx from 'clsx';

const Section: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...props
}) => (
  <section {...props} className={clsx("w-full min-h-screen first:mt-20 first:lg:mt-0", className)}>
    <div className="flex items-center justify-center content-center min-h-screen">
      <div className="flex-grow-0 lg:flex-grow px-4 py-8 lg:px-32 lg:py-64 min-w-full">
        {children}
      </div>
    </div>
  </section>
);

export { Section };
