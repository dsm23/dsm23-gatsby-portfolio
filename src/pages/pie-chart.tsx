import React, { FunctionComponent, useState } from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';
import { generateProgrammingLanguageStats } from '@nivo/generators';
import { ResponsivePie } from '@nivo/pie';
import Layout from '../components/layout';
import { StyledLink } from '../components/styled-go-back';
import { GoBack } from '../components/svgs';

import { Main } from '../components';
import { SEO } from '../components/seo';

interface Props extends PageProps<Queries.PieChartQuery> {}

export const Head: HeadFC<Queries.PieChartQuery> = ({ data }) => {
  return (
    <SEO
      description="The pie chart D3.js example in David Murdoch's portfolio"
      title="Pie Chart"
    >
      <title>{data?.site?.siteMetadata?.title} | Pie Chart</title>
    </SEO>
  );
};

const generateData = () =>
  generateProgrammingLanguageStats(true, 5).map(d => ({
    id: d.label,
    ...d,
  }));

const PieChart: FunctionComponent<Props> = ({ data, location }) => {
  const author = data.contentfulPerson;

  const [pieData, setPieData] = useState(generateData());

  const handleClick = () => {
    setPieData(generateData());
  };

  return (
    <Layout location={location} data={author as Queries.ContentfulPerson}>
      <Main className="px-6 py-8 w-full">
        <StyledLink to="/#projects" className="group">
          <GoBack className="styled-go-back" aria-label="Go Back" />
        </StyledLink>
        <h1 className="text-4xl text-teal-600 tracking-widest uppercase">
          Pie Chart
        </h1>

        <button
          className="mt-8 gap-x-2 flex items-center rounded-md border border-transparent bg-teal-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          onClick={handleClick}
        >
          <span className="whitespace-nowrap">Random data</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="h-6 w-6 text-white"
            fill="currentColor"
          >
            {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
            <path d="M252.3 11.7c-15.6-15.6-40.9-15.6-56.6 0l-184 184c-15.6 15.6-15.6 40.9 0 56.6l184 184c15.6 15.6 40.9 15.6 56.6 0l184-184c15.6-15.6 15.6-40.9 0-56.6l-184-184zM248 224c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24zM96 248c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm128 80c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm128-80c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zM224 72c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm96 392c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V240c0-26.5-21.5-48-48-48H472.5c13.4 26.9 8.8 60.5-13.6 82.9L320 413.8V464zm160-88c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z" />
          </svg>
        </button>
        <div className="h-96">
          <ResponsivePie
            data={pieData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2]],
            }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: 'ruby',
                },
                id: 'dots',
              },
              {
                match: {
                  id: 'c',
                },
                id: 'dots',
              },
              {
                match: {
                  id: 'go',
                },
                id: 'dots',
              },
              {
                match: {
                  id: 'python',
                },
                id: 'dots',
              },
              {
                match: {
                  id: 'scala',
                },
                id: 'lines',
              },
              {
                match: {
                  id: 'lisp',
                },
                id: 'lines',
              },
              {
                match: {
                  id: 'elixir',
                },
                id: 'lines',
              },
              {
                match: {
                  id: 'javascript',
                },
                id: 'lines',
              },
            ]}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </Main>
    </Layout>
  );
};

export default PieChart;

export const pageQuery = graphql`
  query PieChart {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPerson {
      name
      image {
        gatsbyImage(
          cropFocus: FACES
          layout: FULL_WIDTH
          placeholder: BLURRED
          height: 192
          width: 192
        )
      }
    }
  }
`;
