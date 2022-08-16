import React, { FunctionComponent } from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import { GoBack, StyledLink } from '../components/styled-go-back';

import { Main } from '../components';

import { Query, ContentfulPerson } from '../../graphql-types';

interface Props extends PageRendererProps {
  data: Query;
}

const NoughtsAndCrosses: FunctionComponent<Props> = ({ data, location }) => {
  const author = data.contentfulPerson;

  return (
    <Layout location={location} data={author as ContentfulPerson}>
      <Helmet title="No Content">
        <html lang="en" />
        <meta name="description" content="No content" />
      </Helmet>
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
  }
`;
