import React, { FunctionComponent } from 'react';

const IconWrapper: FunctionComponent = ({ children }) => (
  <div className="group">
    <div className="styled-icon-wrapper">{children}</div>
  </div>
);

export { IconWrapper };
