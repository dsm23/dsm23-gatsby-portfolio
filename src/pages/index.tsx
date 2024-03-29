import React, { FunctionComponent } from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { SEO } from '../components/seo';

import {
  Divisor,
  Education,
  Experience,
  Home,
  Main,
  Projects,
  Section,
  Skills,
} from '../components';

interface Props extends PageProps<Queries.HomeQuery> {}

export const Head: HeadFC<Queries.HomeQuery> = ({ data }) => {
  return (
    <SEO
      description="The react version of David Murdoch's portfolio built with tailwind and gatsby"
      title="Home"
    >
      <title>{data?.site?.siteMetadata?.title}</title>
    </SEO>
  );
};

const RootIndex: FunctionComponent<Props> = ({ data, location }) => {
  const author = data.contentfulPerson;

  const experiences = data.allContentfulExperienceCompany.nodes;
  const education = data.allContentfulEducationSchool.nodes;
  const interests = data.allContentfulInterests.nodes;

  return (
    <Layout location={location} data={author as Queries.ContentfulPerson}>
      <Main>
        <Home id="home" author={author as Queries.ContentfulPerson} />
        <Divisor />

        <Experience id="experience" experiences={experiences} />
        <Divisor />

        <Education id="education" education={education} />
        <Divisor />

        <Skills id="skills" />
        <Divisor />
        <Projects id="projects" />
        <Divisor />
        <Section id="interests">
          <h2 className="text-5xl">Interests</h2>
          <ul className="list-disc list-inside">
            {interests.map(({ interest }) => (
              <li key={`${interest}-interest`}>{interest}</li>
            ))}
          </ul>
        </Section>
      </Main>
    </Layout>
  );
};

export default RootIndex;

// layout: FULL_WIDTH
// transformOptions {
//   cropFocus: FACE
// }

export const pageQuery = graphql`
  query Home {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPerson {
      email
      github
      codesandbox
      name
      phone
      shortBio {
        shortBio
      }
      title
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
    allContentfulExperienceCompany {
      nodes {
        companyName
        startDate
        endDate
        city
        description {
          description
        }
      }
    }
    allContentfulEducationSchool {
      nodes {
        schoolName
        startDate
        endDate
        description {
          raw
        }
      }
    }
    allContentfulInterests {
      nodes {
        interest
      }
    }
  }
`;
