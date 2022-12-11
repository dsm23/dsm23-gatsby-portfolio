import React, { FunctionComponent, HTMLAttributes } from 'react';
import { Anchor } from '../../anchor';
import { Section } from '../../section';
import { SectionHeader } from '../../section-header';
import { GitHub, CodeSandbox } from '../../svgs';

interface Props extends HTMLAttributes<HTMLElement> {
  author: Queries.ContentfulPerson;
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
        {firstName} <span className="text-teal-900">{lastName}</span>
      </SectionHeader>
      <address>
        London-based · {phone} ·{' '}
        <Anchor href={`mailto:${email}`}>{email}</Anchor>
      </address>
      <p className="mt-4 text-gray-900">{shortBio}</p>
      <div className="relative flex mt-4">
        <a
          href={github}
          aria-label="GitHub"
          className="transition transform duration-500 ease-in-out w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-teal-900 hover:scale-125"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHub className="text-white" height="22" width="22" />
        </a>
        <a
          href={codesandbox}
          aria-label="CodeSandbox"
          className="transition transform duration-500 ease-in-out w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-teal-900 hover:scale-125 ml-4"
          rel="noopener noreferrer"
          target="_blank"
        >
          <CodeSandbox className="text-white" height="22" width="22" />
        </a>
      </div>
    </Section>
  );
};

export { Home };
