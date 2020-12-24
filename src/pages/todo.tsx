import React, { FunctionComponent } from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { Helmet } from 'react-helmet';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';

import 'twin.macro';

import { config } from '../overmind';

import Layout from '../components/layout';
import { GoBack, StyledLink } from '../components/styled-go-back';

import { Main } from '../components';

import { Query, ContentfulPerson } from '../../graphql-types';
import { Todos } from '../components/todos';

interface Props extends PageRendererProps {
  data: Query;
}

const overmind = createOvermind(config);

const TodoApp: FunctionComponent<Props> = ({ data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title as string;
  const author = data.contentfulPerson;

  return (
    <Layout location={location} data={author as ContentfulPerson}>
      <Helmet title={siteTitle}>
        <html lang="en" />
        <meta
          name="description"
          content="The calculator project in David Murdoch's portfolio"
        />
      </Helmet>
      <Main tw="px-6 py-8 w-full">
        <StyledLink to="/#projects" className="group">
          <div className="group">
            <GoBack aria-label="Go Back" />
          </div>
        </StyledLink>
        <h1 tw="text-4xl text-green-600 tracking-widest uppercase">Todo App</h1>
        <Provider value={overmind}>
          <Todos />
        </Provider>
      </Main>
    </Layout>
  );
};

export default TodoApp;

export const pageQuery = graphql`
  query TodoQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPerson {
      name
      image {
        fluid(
          maxWidth: 192
          maxHeight: 192
          resizingBehavior: FILL
          cropFocus: FACE
        ) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`;
