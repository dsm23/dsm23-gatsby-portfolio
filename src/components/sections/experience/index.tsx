import React, { FunctionComponent, HTMLAttributes } from 'react';
import { Section } from '../../section';
import { formatYears } from '../../../utils';

import * as styles from './styles.module.css';

interface Props extends HTMLAttributes<HTMLElement> {
  experiences: Queries.ContentfulExperienceCompany[];
}

const Experience: FunctionComponent<Props> = ({ experiences, ...props }) => {
  return (
    <Section {...props}>
      <h2 className="text-5xl">Experience</h2>
      {experiences.map(
        ({ companyName, city, description, endDate, startDate }) => (
          <div key={`${companyName}-experiences`} className={styles.container}>
            <h3 className={styles.company}>{companyName}</h3>
            <div className={styles.city}>{city}</div>
            <p className={styles.description}>{description?.description}</p>

            <div className={styles.dates}>
              {formatYears(startDate as string, endDate as string)}
            </div>
          </div>
        ),
      )}
    </Section>
  );
};

export { Experience };
