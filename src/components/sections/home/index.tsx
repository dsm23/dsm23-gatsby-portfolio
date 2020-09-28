import React, { FunctionComponent, HTMLAttributes } from 'react';
import { Codesandbox, Github } from '@icons-pack/react-simple-icons';

import 'twin.macro';

import { ContentfulPerson } from '../../../../graphql-types';

import { Anchor } from '../../anchor';
import { Section } from '../../section';
import { SectionHeader } from '../../section-header';

interface Props extends HTMLAttributes<HTMLElement> {
  author: ContentfulPerson;
}

const Home: FunctionComponent<Props> = ({ author, ...props }) => {
  const { email, name, phone } = author;

  const codesandbox = author.codesandbox as string;
  const github = author.github as string;

  const [firstName, lastName] = name?.split(' ') || [];

  const shortBio = author.shortBio?.shortBio;

  return (
    <Section {...props}>
      <SectionHeader>
        {firstName} <span tw="text-teal-900">{lastName}</span>
      </SectionHeader>
      <address>
        London-based · {phone} ·{' '}
        <Anchor href={`mailto:${email}`}>{email}</Anchor>
      </address>
      <p tw="mt-4 text-gray-900">{shortBio}</p>
      <div tw="relative flex mt-4">
        <a
          href={github}
          aria-label="GitHub"
          tw="transition transform duration-500 ease-in-out w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-teal-900 hover:scale-125"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Github tw="text-white" size={22} />
        </a>
        <a
          href={codesandbox}
          aria-label="CodeSandbox"
          tw="transition transform duration-500 ease-in-out w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-teal-900 hover:scale-125 ml-4"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Codesandbox tw="text-white" size={22} />
        </a>
      </div>
    </Section>
  );
};

export { Home };
