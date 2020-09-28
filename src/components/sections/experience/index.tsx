import React, { FunctionComponent, HTMLAttributes } from 'react';

import 'twin.macro';

import { Section } from '../../section';

import { formatYears } from '../../../utils';
import { ContentfulExperienceCompany } from '../../../../graphql-types';

interface Props extends HTMLAttributes<HTMLElement> {
  experiences: ContentfulExperienceCompany[];
}

const Experience: FunctionComponent<Props> = ({ experiences, ...props }) => {
  return (
    <Section {...props}>
      <h2 tw="text-5xl">Experience</h2>
      {experiences.map(
        ({ companyName, city, description, endDate, startDate }) => (
          <div key={`${companyName}-experiences`}>
            <h3 tw="text-3xl">{companyName}</h3>
            <div>{city}</div>
            <p tw="text-gray-900">{description?.description}</p>

            <div tw="font-semibold text-teal-900">
              {formatYears(startDate as string, endDate as string)}
            </div>
          </div>
        ),
      )}
    </Section>
  );
};

export { Experience };
