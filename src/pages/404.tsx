import React, { FunctionComponent } from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';
import Layout from '../components/layout';
import { StyledLink } from '../components/styled-go-back';
import { GoBack } from '../components/svgs';

import { Main } from '../components';
import { SEO } from '../components/seo';

interface Props extends PageProps<Queries.NoContentQuery> {}

export const Head: HeadFC<Queries.NoContentQuery> = ({ data }) => (
  <SEO description="No content" title="No content">
    <title>{data?.site?.siteMetadata?.title} | 404 No Content</title>
  </SEO>
);

const NoughtsAndCrosses: FunctionComponent<Props> = ({ data, location }) => {
  const author = data.contentfulPerson;

  return (
    <Layout location={location} data={author as Queries.ContentfulPerson}>
      <Main className="px-6 py-8 w-full">
        <StyledLink to="/" className="group">
          <GoBack className="styled-go-back" aria-label="Go Back" />
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
