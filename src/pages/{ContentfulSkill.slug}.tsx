import React, { FunctionComponent } from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';
import { Options } from '@contentful/rich-text-react-renderer';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import { Anchor } from '../components/anchor';
import Layout from '../components/layout';
import { Main } from '../components/main';
import { SEO } from '../components/seo';
import { StyledLink } from '../components/styled-go-back';
import { GoBack } from '../components/svgs';

import { EmptyStar, FilledStar } from '../components/svgs';

interface Props extends PageProps<Queries.PageBySlugQuery> {}

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: text => (
      <span className="text-gray-900 font-bold">{text}</span>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="mt-2 text-gray-900">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="my-2 list-disc list-outside">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li className="ml-8">{children}</li>,
    // [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
    //   <Image
    //     className="text-center shadow-lg mx-auto max-w-screen-md"
    //     contentfulId={node?.data?.target?.sys?.contentful_id}
    //   />
    // ),
    [INLINES.HYPERLINK]: (node, children) => (
      <Anchor href={node.data.uri} className="italic">
        {children}
      </Anchor>
    ),
  },
  // renderText: text => text.replace('!', '?'),
};

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
        <div className="mb-4">{renderRichText(body, options)}</div>

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
