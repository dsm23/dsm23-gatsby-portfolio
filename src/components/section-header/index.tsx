import React, { FunctionComponent } from 'react';

import 'twin.macro';

const SectionHeader: FunctionComponent = ({ children }) => (
  <h1 tw="font-medium text-6xl text-gray-900">{children}</h1>
);

export { SectionHeader };
