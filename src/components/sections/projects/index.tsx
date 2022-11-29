import React, { FunctionComponent, HTMLAttributes } from 'react';
import { Anchor } from '../../anchor';
import { Link } from '../../link';
import { Section } from '../../section';
import { Help, NavRight } from '../../svgs';
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
  {
    title: 'FizzBuzz',
    to: '/fizz-buzz',
    description:
      'Numbers 1 to 100 where any number divisible by three is replaced with the word "fizz", and any number divisible by five is replaced with the word "buzz"',
  },
  {
    title: 'Totally not XSS vulnerable',
    to: 'https://totally-not-xss-vulnerable.netlify.app/',
    description:
      'An example of a XSS vulnerable site. A list of usernames and passwords are stored in IndexedDB and an example username in the form that can be used to print the list in a table',
  },
  {
    title: 'Layout Proposal for Twitch Streamer I watch',
    to: 'https://layout-proposal-for-austin.netlify.app/',
    description:
      'AustinShow uses a video call app to do a battle royale style show. During the elimination stage he introduces a bottom three stage that can sometimes be hard to follow',
  },
  {
    title: 'D3.js pie chart',
    to: '/pie-chart',
    description: 'Pie chart in svg using D3.js',
  },
];

const Projects: FunctionComponent<HTMLAttributes<HTMLElement>> = props => (
  <Section {...props}>
    <h2 className="text-5xl">Projects</h2>
    <div className="flex flex-wrap">
      {projects.map(({ title, to, description }) => (
        <div className="w-full sm:w-1/2 md:w-1/3" key={title}>
          <div className="relative pb-5/6">
            <Help className="absolute h-full w-full object-cover rounded-lg shadow-md" />
          </div>
          <div className="relative px-4 -mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-baseline">
                <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide">
                  {internal(to) ? 'internal' : 'external'}
                </div>
              </div>
              <Anchor as={Link} to={to} className="mt-2 flex items-center">
                <NavRight />
                <h3 className="ml-2 font-semibold text-lg leading-tight truncate">
                  {title}
                </h3>
              </Anchor>
              <div className="mt-3">
                <p className="text-gray-900 text-sm">{description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export { Projects };
