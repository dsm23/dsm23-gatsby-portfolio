import React, { FunctionComponent, useState } from 'react';
import Scrollspy from 'react-scrollspy';
import { Link, PageRendererProps } from 'gatsby';
import scrollTo from 'gatsby-plugin-smoothscroll';

import 'twin.macro';

import { SideNav } from '../sidenav';
import { SideNavLink, SideNavSpan } from '../sidenav-link';

import { ContentfulPerson } from '../../../graphql-types';

interface Props extends PageRendererProps {
  data: ContentfulPerson;
}

const items = [
  'home',
  'experience',
  'education',
  'skills',
  'projects',
  'interests',
];

const Template: FunctionComponent<Props> = ({ children, data, location }) => {
  let rootPath = `/`;
  // if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
  //   rootPath = __PATH_PREFIX__ + `/`;
  // }

  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = () => setOpen(prevOpen => !prevOpen);

  const handleClose = () => setOpen(false);

  const isIndexPage = location.pathname === rootPath;

  const renderSidenav = isIndexPage ? (
    <Scrollspy
      items={items}
      currentClassName="text-white bg-teal-700"
      componentTag="div"
      tw="block md:inline-flex md:flex-row md:ml-auto md:w-auto w-full lg:items-center md:items-start lg:h-auto lg:block text-gray-400"
    >
      {items.map(label => (
        <SideNavLink
          as="button"
          key={`${label}-sidenav`}
          onClick={() => {
            scrollTo(`#${label}`);
            return handleClose();
          }}
          className="group"
          tw="flex items-center justify-start lg:justify-center uppercase w-full px-3 py-2 rounded hover:(bg-gray-900 text-white) focus:outline-none"
        >
          <SideNavSpan tw="px-1 py-px">{label}</SideNavSpan>
        </SideNavLink>
      ))}
    </Scrollspy>
  ) : (
    items.map(label => (
      <SideNavLink
        as={Link}
        key={`${label}-sidenav`}
        to={`/#${label}`}
        className="group"
        tw="flex items-center justify-start lg:justify-center uppercase w-full px-3 py-2 rounded hover:(bg-gray-900 text-white) focus:outline-none"
      >
        <SideNavSpan tw="px-1 py-px text-gray-400">{label}</SideNavSpan>
      </SideNavLink>
    ))
  );

  return (
    <div tw="flex flex-col lg:flex-row font-sans w-full">
      <header>
        <SideNav data={data} open={open} onToggle={handleToggle}>
          {renderSidenav}
        </SideNav>
      </header>
      <div tw="mt-20 lg:ml-64 lg:mt-auto w-full">{children}</div>
    </div>
  );
};

export default Template;
