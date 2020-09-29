import React, { FunctionComponent, HTMLAttributes } from 'react';
import 'twin.macro';

import { Anchor } from '../../anchor';
import { Link } from '../../link';
import { Section } from '../../section';

import Help from '../../svgs/help';
import { NavRight } from '../../svgs';
import { internal } from '../../../utils';

interface Project {
  title: string;
  to: string;
  description: string;
}

const projects: Project[] = [
  {
    title: 'This portfolio',
    to: 'https://github.com/dsm23/dsm23-gatsby-portfolio',
    description: 'The GitHub link to the source code of this portfolio',
  },
  {
    title: 'IMH website',
    to: 'https://imh-gatsby.netlify.app/',
    description:
      "A website for my parent's company. Built with Tailwind anc Gatsby and uses Contentful as a CMS",
  },
  {
    title: 'Noughts and Crosses',
    to: '/noughts-and-crosses',
    description:
      'The tutorial example from the reactjs.org docs in tailwindcss stylings with TypeScript typings',
  },
];

const Projects: FunctionComponent<HTMLAttributes<HTMLElement>> = props => (
  <Section {...props}>
    <h2 tw="text-5xl">Projects</h2>
    <div tw="flex flex-wrap">
      {projects.map(({ title, to, description }) => (
        <div tw="w-full sm:w-1/2 md:w-1/3">
          <div tw="relative pb-5/6">
            <Help tw="absolute h-full w-full object-cover rounded-lg shadow-md" />
          </div>
          <div tw="relative px-4 -mt-16">
            <div tw="bg-white p-6 rounded-lg shadow-lg">
              <div tw="flex items-baseline">
                <div tw="text-gray-600 text-xs uppercase font-semibold tracking-wide">
                  {internal(to) ? 'internal' : 'external'}
                </div>
              </div>
              <Anchor as={Link} to={to} tw="mt-2 flex items-center">
                <NavRight />
                <h3 tw="ml-2 font-semibold text-lg leading-tight truncate">
                  {title}
                </h3>
              </Anchor>
              <div tw="mt-3">
                <p tw="text-gray-900 text-sm">{description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export { Projects };
