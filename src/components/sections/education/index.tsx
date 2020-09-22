import React, { FunctionComponent, HTMLAttributes } from 'react';
import 'twin.macro';

import { Section } from '../../section';

import { formatYears } from '../../../utils';
import { ContentfulEducationSchool } from '../../../../graphql-types';

interface Props extends HTMLAttributes<HTMLElement> {
  education: ContentfulEducationSchool[];
}

const Education: FunctionComponent<Props> = ({ education, ...props }) => {
  return (
    <Section {...props}>
      <h2 tw="text-5xl">Education</h2>
      {education.map(({ schoolName, description, endDate, startDate }) => (
        <div key={`${schoolName}-education`}>
          <h3 tw="text-3xl">{schoolName}</h3>
          {description && <p tw="text-gray-900">{description?.description}</p>}

          <div tw="font-semibold text-teal-900">
            {formatYears(startDate as string, endDate as string)}
          </div>
        </div>
      ))}
    </Section>
  );
};

export { Education };
