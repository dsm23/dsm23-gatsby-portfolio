import React, { FunctionComponent } from 'react';
import { graphql, HeadFC, PageRendererProps } from 'gatsby';
import Layout from '../components/layout';
import { GoBack, StyledLink } from '../components/styled-go-back';

import { Main } from '../components';
import { SEO } from '../components/seo';

import { Query, ContentfulPerson } from '../../graphql-types';

interface Props extends PageRendererProps {
  data: Query;
}

export const Head: HeadFC<Query> = ({ data }) => (
  <SEO description="No content" title="No content">
    <title>{data?.site?.siteMetadata?.title} | 404 No Content</title>
  </SEO>
);

const NoughtsAndCrosses: FunctionComponent<Props> = ({ data, location }) => {
  const author = data.contentfulPerson;

  return (
    <Layout location={location} data={author as ContentfulPerson}>
      <Main className="px-6 py-8 w-full">
        <StyledLink to="/" className="group">
          <GoBack aria-label="Go Back" />
        </StyledLink>
        <h1 className="text-4xl text-teal-600 tracking-widest uppercase">
          Error 404: No content
        </h1>
      </Main>
    </Layout>
  );
};

export default NoughtsAndCrosses;

export const pageQuery = graphql`
  query NoContent {
    contentfulPerson {
      name
      image {
        gatsbyImage(
          cropFocus: FACES
          layout: FULL_WIDTH
          placeholder: BLURRED
          height: 192
          width: 192
        )
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
