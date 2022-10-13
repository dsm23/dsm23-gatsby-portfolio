import React, { FunctionComponent } from 'react';
import { graphql, HeadFC, PageRendererProps } from 'gatsby';
import Layout from '../components/layout';
import { StyledLink } from '../components/styled-go-back';
import { GoBack } from '../components/svgs';

import { Main } from '../components';
import { SEO } from '../components/seo';

import { Query, ContentfulPerson } from '../../graphql-types';

interface Props extends PageRendererProps {
  data: Query;
}

export const Head: HeadFC<Query> = ({ data }) => {
  const skillName = data?.contentfulSkill?.skillName ?? '';

  return (
    <SEO
      description="The fizz buzz project in David Murdoch's portfolio"
      title={skillName}
    >
      <title>{data?.site?.siteMetadata?.title} | FizzBuzz</title>
    </SEO>
  );
};

const FizzBuzz: FunctionComponent<Props> = ({ data, location }) => {
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
      <Main className="px-6 py-8 w-full">
        <StyledLink to="/#projects" className="group">
          <GoBack className="styled-go-back" aria-label="Go Back" />
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
