import React, { FunctionComponent, HTMLAttributes } from 'react';
import { Section } from '../../section';
import { formatYears } from '../../../utils';

interface Props extends HTMLAttributes<HTMLElement> {
  experiences: Queries.ContentfulExperienceCompany[];
}

const Experience: FunctionComponent<Props> = ({ experiences, ...props }) => {
  return (
    <Section {...props}>
      <h2 className="text-5xl">Experience</h2>
      {experiences.map(
        ({ companyName, city, description, endDate, startDate }) => (
          <div key={`${companyName}-experiences`}>
            <h3 className="text-3xl">{companyName}</h3>
            <div>{city}</div>
            <p className="text-gray-900">{description?.description}</p>

            <div className="font-semibold text-teal-900">
              {formatYears(startDate as string, endDate as string)}
            </div>
          </div>
        ),
      )}
    </Section>
  );
};

export { Experience };
