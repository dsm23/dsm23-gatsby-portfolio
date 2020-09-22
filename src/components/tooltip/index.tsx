import React, { useState, FunctionComponent, ReactNode } from 'react';
import tw, { styled, theme } from 'twin.macro';
import { keyframes } from '@emotion/core';

import { Manager, Reference, Popper, PopperChildrenProps } from 'react-popper';

export const ReferenceBox = tw.div`flex flex-col justify-center items-center bg-white text-gray-900 rounded relative z-10`;

export const PopperBox = tw.div`flex flex-col justify-center items-center text-white h-0 w-40 p-12 text-center rounded-lg bg-gray-700`;

export const TransitionedPopperBox = tw(
  PopperBox,
)`transition-all duration-100 ease-in-out`;

export const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
export const PoppersContainer = styled('div')([
  tw`z-50 opacity-0`,
  {
    animation: `${fadeIn} 0.3s ease-in 0.5s forwards`,
  },
]);

export const Arrow = styled('div')`
  ${tw`absolute w-12 h-12`}
  &[data-placement*='bottom'] {
    ${tw`top-0 left-0`}
    margin-top: -0.9em;
    &::before {
      border-width: 0 1.5em 1em 1.5em;
      border-color: transparent transparent ${theme`colors.gray.700`}
        transparent;
    }
  }
  &[data-placement*='top'] {
    ${tw`bottom-0 left-0`}
    margin-bottom: -2.9em;
    &::before {
      border-width: 1em 1.5em 0 1.5em;
      border-color: ${theme`colors.gray.700`} transparent transparent
        transparent;
    }
  }
  &[data-placement*='right'] {
    ${tw`left-0`}
    margin-left: -1.9em;
    &::before {
      border-width: 1.5em 1em 1.5em 0;
      border-color: transparent ${theme`colors.gray.700`} transparent
        transparent;
    }
  }
  &[data-placement*='left'] {
    ${tw`right-0`}
    margin-right: -1.9em;
    &::before {
      border-width: 1.5em 0 1.5em 1em;
      border-color: transparent transparent transparent
        ${theme`colors.gray.700`};
    }
  }
  &::before {
    content: '';
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
  }
`;

interface Props {
  tooltipNode: ReactNode;
}

const modifiers = [
  {
    name: 'flip',
    enabled: true,
  },
  {
    name: 'hide',
    enabled: false,
  },
  {
    name: 'arrow',
    options: {
      padding: 5,
    },
  },
  {
    name: 'offset',
    options: {
      offset: [0, 14],
    },
  },
  // We can't use adaptive styles with CSS transitions
  {
    name: 'computeStyles',
    options: {
      adaptive: false,
    },
  },
];

const Tooltip: FunctionComponent<Props> = ({ children, tooltipNode }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <ReferenceBox
            ref={ref}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
          >
            {children}
          </ReferenceBox>
        )}
      </Reference>

      {open && (
        <PoppersContainer>
          <Popper placement="top" modifiers={modifiers}>
            {({ ref, style, placement, arrowProps }: PopperChildrenProps) => (
              <TransitionedPopperBox ref={ref} style={style}>
                {tooltipNode}
                <Arrow
                  ref={arrowProps.ref}
                  data-placement={placement}
                  style={arrowProps.style}
                />
              </TransitionedPopperBox>
            )}
          </Popper>
        </PoppersContainer>
      )}
    </Manager>
  );
};

export { Tooltip };
