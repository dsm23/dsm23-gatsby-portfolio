import React, { forwardRef } from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = forwardRef<
  HTMLAnchorElement & GatsbyLink<any>,
  GatsbyLinkProps<any>
>(({ children, to, activeClassName, partiallyActive, ...other }, ref) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
        ref={ref}
      >
        {children}
      </GatsbyLink>
    );
  }
  return (
    <a href={to} {...other} ref={ref}>
      {children}
    </a>
  );
});

export { Link };
