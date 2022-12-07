import React, { FunctionComponent, useState } from 'react';
import Scrollspy from 'react-scrollspy';
import { Link, PageRendererProps } from 'gatsby';
import scrollTo from 'gatsby-plugin-smoothscroll';

import { Nav } from '../nav';
import { NavLink, NavSpan } from '../nav-link';

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

  const renderNav = isIndexPage ? (
    <Scrollspy
      items={items}
      currentClassName="text-white bg-green-700"
      componentTag="div"
      className="block md:flex md:ml-auto md:w-auto w-full lg:items-center md:items-start lg:h-auto lg:block text-gray-400"
    >
      {items.map(label => (
        <NavLink
          as="button"
          key={`${label}-nav`}
          onClick={() => {
            scrollTo(`#${label}`);
            return handleClose();
          }}
          className="group flex items-center justify-start lg:justify-center uppercase w-full py-2 rounded hover:bg-gray-900 hover:text-white focus:outline-none"
        >
          <NavSpan className="px-px py-px lg:px-0.5">{label}</NavSpan>
        </NavLink>
      ))}
    </Scrollspy>
  ) : (
    items.map(label => (
      <NavLink
        as={Link}
        key={`${label}-nav`}
        to={`/#${label}`}
        className="group flex items-center justify-start lg:justify-center uppercase w-full py-2 rounded hover:bg-gray-900 hover:text-white focus:outline-none"
      >
        <NavSpan className="px-px py-px lg:px-0.5 text-gray-400">
          {label}
        </NavSpan>
      </NavLink>
    ))
  );

  return (
    <div className="flex flex-col lg:flex-row font-sans w-full">
      <header className="contents">
        <Nav data={data} open={open} onToggle={handleToggle}>
          {renderNav}
        </Nav>
      </header>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Template;
