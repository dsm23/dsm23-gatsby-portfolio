import React, { FunctionComponent, HTMLAttributes } from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { Section } from '../../section';
import { contentfulOptions, formatYears } from '../../../utils';

import * as styles from './styles.module.css';

interface Props extends HTMLAttributes<HTMLElement> {
  education: Queries.ContentfulEducationSchool[];
}

const Education: FunctionComponent<Props> = ({ education, ...props }) => {
  return (
    <Section {...props}>
      <h2 className="text-5xl">Education</h2>
      {education.map(({ schoolName, description, endDate, startDate }) => (
        <div key={`${schoolName}-education`} className={styles.container}>
          <h3 className={styles.school}>{schoolName}</h3>
          {description && (
            <div className={styles.description}>
              {renderRichText(description, contentfulOptions)}
            </div>
          )}

          <div className={styles.dates}>
            {formatYears(startDate as string, endDate as string)}
          </div>
        </div>
      ))}
    </Section>
  );
};

export { Education };
