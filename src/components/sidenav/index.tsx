import React, { FunctionComponent } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from '../link';
import MobileMenu from '../mobile-menu';
import { Cross, Hamburger } from '../svgs';
import { ContentfulPerson } from '../../../graphql-types';

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
}) => (
  <nav
    aria-label="sidebar navigation"
    className="bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900 md:flex md:items-center lg:flex-col lg:justify-center lg:h-full lg:w-64 w-full top-0 max-h-full fixed z-10 opacity-100"
  >
    <div className="flex h-20 justify-between items-center lg:flex-col lg:justify-center lg:h-auto px-5">
      <Link
        to="/#home"
        className="inline-flex items-center shadow-sm outline-none border-2 border-transparent lg:mr-0 lg:mb-4 lg:rounded-full lg:border-8 lg:border-teal-700 focus:border-yellow-500"
      >
        <GatsbyImage
          className="h-full w-10 lg:w-48 rounded-full"
          alt={`${data.name} profile`}
          image={data.image?.gatsbyImage}
        />

        <span className="hidden ml-4 md:inline lg:hidden text-xl text-white font-bold tracking-wide">
          David Murdoch
        </span>
        <span className="inline ml-4 md:hidden text-xl text-white font-bold tracking-wide">
          DSM
        </span>
      </Link>
      <div className="mr-2 flex md:hidden">
        <button
          aria-label="Open the navigation menu"
          onClick={onToggle}
          className="inline-flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
        >
          {!open && <Hamburger className="block h-6 w-6" />}
          {open && <Cross className="block h-6 w-6" />}
        </button>
      </div>
    </div>

    <MobileMenu
      className="overflow-y-auto md:overflow-y-visible lg:px-4"
      id="navigation"
      isOpen={open}
    >
      {children}
    </MobileMenu>
  </nav>
);

export { SideNav };
