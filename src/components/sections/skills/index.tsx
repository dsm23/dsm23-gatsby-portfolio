import React, { FunctionComponent, HTMLAttributes } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Section } from '../../section';
import { IconWrapper } from '../../icon-wrapper';
import SVGLoader from './SVGLoader';
import { Tooltip } from '../../tooltip';

const Skills: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  ...props
}) => {
  const { allContentfulSkill } = useStaticQuery<Queries.SkillsQuery>(graphql`
    query Skills {
      allContentfulSkill(sort: { order: ASC, fields: order }) {
        nodes {
          skillName
          rating
          slug
          icon {
            url
          }
        }
      }
    }
  `);

  const skills = allContentfulSkill?.nodes ?? [];

  return (
    <Section {...props}>
      <h2 className="text-5xl">Skills</h2>
      <div className="flex flex-wrap items-baseline">
        {skills.map(({ icon, skillName, slug }) => {
          return (
            <Link to={`/${slug}`} key={`${slug}-svg-icon`}>
              <span className="sr-only">{skillName}</span>
              <Tooltip tooltipNode={skillName}>
                <IconWrapper>
                  <SVGLoader className="h-16 w-16" src={icon!.url as string} />
                </IconWrapper>
              </Tooltip>
            </Link>
          );
        })}
      </div>
    </Section>
  );
};

export { Skills };
