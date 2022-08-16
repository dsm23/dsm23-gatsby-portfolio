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

const FizzBuzz: FunctionComponent<Props> = ({ data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title as string;
  const author = data.contentfulPerson;

  const listItems = Array.from({ length: 100 }, (_, i) => {
    const num = i + 1;

    switch (true) {
      case num % 3 === 0 && num % 5 === 0: {
        return 'FizzBuzz';
      }
      case num % 5 === 0: {
        return 'Buzz';
      }
      case num % 3 === 0: {
        return 'Fizz';
      }
      default:
        return num;
    }
  });

  return (
    <Layout location={location} data={author as ContentfulPerson}>
      <Helmet title={siteTitle}>
        <html lang="en" />
        <meta
          name="description"
          content="The calculator project in David Murdoch's portfolio"
        />
      </Helmet>
      <Main className="px-6 py-8 w-full">
        <StyledLink to="/#projects" className="group">
          <GoBack aria-label="Go Back" />
        </StyledLink>
        <h1 className="text-4xl text-teal-600 tracking-widest uppercase">
          FizzBuzz
        </h1>

        <div className="flex justify-center">
          <pre>
            {`
            switch (true) {
              case num % 3 === 0 && num % 5 === 0: {
                return 'FizzBuzz';
              }
              case num % 5 === 0: {
                return 'Buzz';
              }
              case num % 3 === 0: {
                return 'Fizz';
              }
              default:
                return num;
            }
          `}
          </pre>
        </div>

        <ul role="list" className="space-y-3">
          {listItems.map((item, index) => (
            <li
              className="bg-white text-gray-900 elevation overflow-hidden rounded-md px-6 py-4 text-center"
              key={`${item}-${index}`}
            >
              {item}
            </li>
          ))}
        </ul>
      </Main>
    </Layout>
  );
};

export default FizzBuzz;

export const pageQuery = graphql`
  query FizzBuzzQuery {
    site {
      siteMetadata {
        title
      }
    }
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
