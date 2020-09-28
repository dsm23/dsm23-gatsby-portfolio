import React, { FunctionComponent, HTMLAttributes } from 'react';

import 'twin.macro';

const Main: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <main tw="mt-20 lg:mt-0" {...props}>
    {children}
  </main>
);

export { Main };
