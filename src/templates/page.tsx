import React, { FunctionComponent } from 'react';
import { graphql, Link, PageRendererProps } from 'gatsby';
import tw, { styled } from 'twin.macro';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import { Anchor } from '../components/anchor';
import Layout from '../components/layout';
import { Main } from '../components/main';
import { SEO } from '../components/seo';
import { ContentfulPerson, Query } from '../../graphql-types';

import 'twin.macro';

import { EmptyStar } from '../components/svgs/empty-star';
import { FilledStar } from '../components/svgs/filled-star';
import { GoBack } from '../components/svgs';

interface Props extends PageRendererProps {
  data: Query;
}

const Bold: FunctionComponent = ({ children }) => (
  <span tw="text-gray-900 font-bold">{children}</span>
);

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p tw="mt-2 text-gray-900">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul tw="my-2 list-disc list-outside">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li tw="ml-8">{children}</li>,
    // [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
    //   <Image
    //     tw="text-center shadow-lg mx-auto max-w-screen-md"
    //     contentfulId={node?.data?.target?.sys?.contentful_id}
    //   />
    // ),
    [INLINES.HYPERLINK]: (node, children) => (
      <Anchor href={node.data.uri} tw="italic">
        {children}
      </Anchor>
    ),
  },
  // renderText: text => text.replace('!', '?'),
};

const StyledGoBack = styled(GoBack)({
  path: tw`fill-current transition transform duration-500 ease-in-out text-teal-700 group-hover:text-white`,
});

const PageTemplate: FunctionComponent<Props> = ({ data, location }) => {
  const json = data?.contentfulSkill?.content?.json ?? {};
  const skillName = data?.contentfulSkill?.skillName ?? '';
  const rating = data?.contentfulSkill?.rating ?? 0;

  const author = data.contentfulPerson;

  return (
    <Layout location={location} data={author as ContentfulPerson}>
      <SEO description="Skill page" title={skillName} />
      <Main tw="px-6 py-8">
        <Link
          to="/#skills"
          className="group"
          tw="transition transform duration-500 ease-in-out w-10 h-10 flex items-center justify-center rounded-full outline-none bg-gray-100 hover:(bg-teal-900 scale-125) focus:(border-2 border-yellow-500)"
        >
          <div className="group">
            <StyledGoBack aria-label="Go Back" />
          </div>
        </Link>

        <h1 tw="text-4xl">
          <span tw="text-teal-600 tracking-widest">SKILL:</span> {skillName}
        </h1>
        <div tw="mb-4">{documentToReactComponents(json, options)}</div>

        <div tw="flex">
          <h2 tw="text-teal-600 tracking-widest">PROFICIENCY:</h2>
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
        content
        json
      }
    }
    contentfulPerson {
      image {
        fluid(
          maxWidth: 400
          maxHeight: 400
          resizingBehavior: FILL
          cropFocus: FACE
        ) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`;
