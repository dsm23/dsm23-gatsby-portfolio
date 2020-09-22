import React, { FunctionComponent, HTMLAttributes, SVGAttributes } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import 'twin.macro';

import * as ToolIcon from '@icons-pack/react-simple-icons';

import { Section } from '../../section';
import { Query } from '../../../../graphql-types';
import { IconWrapper } from '../../icon-wrapper';

interface Icons {
  [key: string]: FunctionComponent<
    SVGAttributes<SVGSVGElement> & { size: number }
  >;
}

const Skills: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  ...props
}) => {
  const { allContentfulSkill } = useStaticQuery<Query>(graphql`
    query SkillsQuery {
      allContentfulSkill(sort: { order: ASC, fields: order }) {
        nodes {
          skillName
          rating
          component
          slug
          content {
            json
          }
        }
      }
    }
  `);

  const skills = allContentfulSkill?.nodes ?? [];

  return (
    <Section {...props}>
      <h2 tw="text-5xl">Skills</h2>
      <div tw="flex flex-wrap items-baseline">
        {skills.map(({ component, slug }) => {
          let Component;

          if (component) {
            Component = (ToolIcon as Icons)[component as string];
          }

          if (!Component) {
            return null;
          }

          return (
            <Link to={`/${slug}`} key={`${slug}-svg-icon`}>
              <IconWrapper>
                <Component aria-label={slug as string} role="img" size={64} />
              </IconWrapper>
            </Link>
          );
        })}
      </div>
    </Section>
  );
};

export { Skills };
