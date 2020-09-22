import React, { FunctionComponent } from 'react';
import Img from 'gatsby-image/withIEPolyfill';
import { FluidObject } from 'gatsby-image';
import 'twin.macro';

import { ContentfulPerson } from '../../../graphql-types';

import { Cross, Hamburger } from '../svgs';
import MobileMenu from '../mobile-menu';

interface Props {
  data: ContentfulPerson;
  open: boolean;
  onToggle: () => void;
}

const SideNav: FunctionComponent<Props> = ({
  children,
  data,
  open,
  onToggle,
}) => {
  return (
    <nav
      aria-label="sidebar navigation"
      tw="bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900 md:(flex items-center) lg:(flex-col justify-center h-full w-64) w-full top-0 max-h-full fixed z-10 opacity-100"
    >
      <div tw="flex h-20 justify-between items-center lg:(flex-col justify-center h-auto) px-5">
        <a
          href="#home"
          tw="inline-flex items-center shadow-sm outline-none border-2 border-transparent lg:(mr-0 mb-4 rounded-full border-8 border-green-700) focus:(border-yellow-500)"
        >
          <Img
            tw="h-full w-10 lg:w-48 rounded-full"
            objectFit="cover"
            objectPosition="50% 50%"
            alt={`${data.name as string} profile`}
            fluid={data.image?.fluid as FluidObject}
          />

          <span tw="hidden ml-4 md:inline lg:hidden text-xl text-white font-bold tracking-wide">
            David Murdoch
          </span>
          <span tw="inline ml-4 md:hidden text-xl text-white font-bold tracking-wide">
            DSM
          </span>
        </a>
        <div tw="mr-2 flex md:hidden">
          <button
            aria-label="Open the navigation menu"
            onClick={onToggle}
            tw="inline-flex items-center justify-center rounded-md text-gray-400 hover:(text-white bg-gray-700) focus:(outline-none bg-gray-700 text-white)"
          >
            {!open && <Hamburger tw="block h-6 w-6" />}
            {open && <Cross tw="block h-6 w-6" />}
          </button>
        </div>
      </div>

      <MobileMenu
        tw="overflow-y-auto md:overflow-y-visible lg:px-4"
        id="navigation"
        isOpen={open}
      >
        {children}
      </MobileMenu>
    </nav>
  );
};

export { SideNav };
