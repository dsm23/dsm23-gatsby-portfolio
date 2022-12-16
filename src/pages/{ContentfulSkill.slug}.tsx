import React, { FunctionComponent } from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Layout from '../components/layout';
import { Main } from '../components/main';
import { SEO } from '../components/seo';
import { StyledLink } from '../components/styled-go-back';
import { GoBack } from '../components/svgs';

import { EmptyStar, FilledStar } from '../components/svgs';
import { contentfulOptions } from '../utils';

interface Props extends PageProps<Queries.PageBySlugQuery> {}

export const Head: HeadFC<Queries.PageBySlugQuery> = ({ data }) => {
  const skillName = data?.contentfulSkill?.skillName ?? '';

  return (
    <SEO description="Skill page" title={skillName}>
      <title>
        {data?.site?.siteMetadata?.title} | {skillName}
      </title>
    </SEO>
  );
};

const PageTemplate: FunctionComponent<Props> = ({ data, location }) => {
  const body = data?.contentfulSkill?.content;
  const skillName = data?.contentfulSkill?.skillName ?? '';
  const rating = data?.contentfulSkill?.rating ?? 0;

  const author = data.contentfulPerson;

  return (
    <Layout location={location} data={author as Queries.ContentfulPerson}>
      <Main className="px-6 py-8">
        <StyledLink to="/#skills" className="group">
          <GoBack className="styled-go-back" aria-label="Go Back" />
        </StyledLink>

        <h1 className="text-4xl">
          <span className="text-teal-600 tracking-widest">SKILL:</span>{' '}
          {skillName}
        </h1>
        <div className="mb-4">{renderRichText(body, contentfulOptions)}</div>

        <div className="flex">
          <h2 className="text-teal-600 tracking-widest">PROFICIENCY:</h2>
          {Array.from({ length: rating }, (_, i) => i).map(num => (
            <FilledStar key={`${num}-${skillName}-filled`} />
          ))}
          {Array.from({ length: 5 - rating }, (_, i) => i).map(num => (
            <EmptyStar key={`${num}-${skillName}-empty`} />
          ))}
        </div>
      </Main>
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    contentfulSkill(slug: { eq: $slug }) {
      skillName
      rating
      content {
        raw
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
    site {
      siteMetadata {
        title
      }
    }
  }
`;
