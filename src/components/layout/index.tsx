import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, PageRendererProps } from 'gatsby';
import cx from 'clsx';
import { Nav } from '../nav';
import { NavLink, NavSpan } from '../nav-link';

interface Props extends PageRendererProps {
  children: ReactNode;
  data: Queries.ContentfulPerson;
}

const items = [
  'home',
  'experience',
  'education',
  'skills',
  'projects',
  'interests',
];

let options = {
  rootMargin: '0px',
  threshold: 0.25,
};

const Template: FunctionComponent<Props> = ({ children, data, location }) => {
  const [activeId, setActiveId] = useState<string>();

  let rootPath = `/`;
  // if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
  //   rootPath = __PATH_PREFIX__ + `/`;
  // }

  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = () => setOpen(prevOpen => !prevOpen);

  const handleClose = () => setOpen(false);

  const isIndexPage = location.pathname === rootPath;

  const observerCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    });
  };

  useEffect(() => {
    let observer = new IntersectionObserver(observerCallback, options);

    if (isIndexPage) {
      items.forEach(
        label => void observer.observe(document.getElementById(label)!),
      );
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const renderNav = isIndexPage ? (
    <div className="block md:flex md:ml-auto md:w-auto w-full lg:items-center md:items-start lg:h-auto lg:block text-gray-400">
      {items.map(label => (
        <NavLink
          as="button"
          key={`${label}-nav`}
          onClick={() => {
            document.getElementById(label)?.scrollIntoView({
              behavior: 'smooth',
            });
            return handleClose();
          }}
          className={cx(
            'group flex items-center justify-start lg:justify-center uppercase w-full py-2 rounded hover:bg-gray-900 hover:text-white focus:outline-none',
            { 'text-white bg-green-700': label === activeId },
          )}
        >
          <NavSpan className="px-px py-px lg:px-0.5">{label}</NavSpan>
        </NavLink>
      ))}
    </div>
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
        <Nav
          data={data}
          open={open}
          onToggle={handleToggle}
          onClose={handleClose}
        >
          {renderNav}
        </Nav>
      </header>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Template;
