import React, { FunctionComponent } from 'react';
import tw, { styled } from 'twin.macro';

const StyledIconWrapper = styled.div({
  path: tw`fill-current transition transform duration-300 ease-in-out text-gray-900 group-hover:text-green-700`,
});

const IconWrapper: FunctionComponent = ({ children }) => (
  <div className="group">
    <StyledIconWrapper>{children}</StyledIconWrapper>
  </div>
);

export { IconWrapper };
