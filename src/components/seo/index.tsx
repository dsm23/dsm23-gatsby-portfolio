/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FunctionComponent } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import codeRef from '../../images/code.svg';

interface Props {
  description?: string;
  title: string;
}

const SEO: FunctionComponent<Props> = ({
  children,
  description = '',
  title,
}) => {
  const { site } = useStaticQuery<Queries.MetaSeoQuery>(
    graphql`
      query MetaSeo {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `,
  );

  const metaDescription =
    description || (site?.siteMetadata?.description as string);

  return (
    <>
      <meta property="description" content={metaDescription} />

      <meta property="og:description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={site?.siteMetadata?.siteUrl as string} />

      <meta property="og:image" content={codeRef} />

      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:site"
        content={site?.siteMetadata?.siteUrl as string}
      />
      <meta
        name="twitter:creator"
        content={site?.siteMetadata?.author as string}
      />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  );
};

export { SEO };
