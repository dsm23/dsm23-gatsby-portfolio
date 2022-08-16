import React, { FunctionComponent } from 'react';

const SectionHeader: FunctionComponent = ({ children }) => (
  <h1 className="font-medium text-6xl text-gray-900">{children}</h1>
);

export { SectionHeader };
