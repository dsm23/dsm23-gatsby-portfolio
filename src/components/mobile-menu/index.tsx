import React, { FunctionComponent, HTMLAttributes } from 'react';
import clsx from 'clsx';

import * as styles from './styles.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

const MobileMenu: FunctionComponent<Props> = ({
  className,
  isOpen,
  ...props
}) => (
  <div
    className={clsx(
      'w-full transition-all transform duration-500 ease-in-out h-0 md:h-auto md:flex md:items-center md:ml-auto md:w-auto lg:block lg:w-full',
      styles.maxHeight,
      { 'h-80': isOpen },
      className,
    )}
    {...props}
  />
);

export default MobileMenu;
