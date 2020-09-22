/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FunctionComponent } from 'react';
import { Helmet, HelmetProps } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import { Query } from '../../../graphql-types';

interface Props {
  meta?: HelmetProps['meta'];
  description?: string;
  lang?: HelmetProps['htmlAttributes'];
  title: string;
}

const SEO: FunctionComponent<Props> = ({
  description = '',
  lang = 'en',
  meta = [],
  title,
}) => {
  const { site } = useStaticQuery<Query>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  );

  const metaDescription =
    description || (site?.siteMetadata?.description as string);

  return (
    <Helmet
      htmlAttributes={{
        lang: lang as string,
      }}
      title={title}
      titleTemplate={`${site?.siteMetadata?.title} | %s`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site?.siteMetadata?.author as string,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        ...meta,
      ]}
    />
  );
};

export { SEO };
