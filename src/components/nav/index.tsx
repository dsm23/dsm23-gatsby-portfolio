import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { easing } from 'ts-easing';
import resolveConfig from 'tailwindcss/resolveConfig';
import { KeyValuePair } from 'tailwindcss/types/config.js';
import { ResizeObserver } from 'resize-observer';
import tailwindConfig from '../../../tailwind.config.js';
import Hamburger from '../hamburger';
import { Link } from '../link';
import { useTween } from '../../utils/useTween';
import { ContentfulPerson } from '../../../graphql-types';

import * as styles from './styles.module.css';

interface Props {
  data: ContentfulPerson;
  open: boolean;
  onToggle: () => void;
}

const fullConfig = resolveConfig(tailwindConfig);

const Nav: FunctionComponent<Props> = ({ children, data, onToggle, open }) => {
  const [height, setHeight] = useTween(0, {
    easing: easing.inOutCirc,
    duration: 400,
  });
  const [isMobile, setMobile] = useState(false);

  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileHeightRef = useRef<HTMLDivElement>(null);

  const resizeObserver = new ResizeObserver(entries => {
    for (const _ of entries) {
      setMobile(
        window.matchMedia(
          `(max-width: ${
            (fullConfig.theme?.screens as KeyValuePair<string, string>)
              ?.md as string
          })`,
        ).matches,
      );
    }
  });

  useEffect(() => {
    resizeObserver.observe(mobileHeightRef.current!);

    // HACK: so ref is not null onDestroy
    const ref = mobileHeightRef.current!;
    return () => {
      resizeObserver.unobserve(ref);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      if (open) {
        setHeight(mobileHeightRef.current?.offsetHeight!);
      } else {
        setHeight(0);
      }
    }
  }, [isMobile, open]);

  return (
    <div className={styles.container}>
      <Link
        to="/#home"
        className="inline-flex items-center shadow-sm outline-none border-2 border-transparent lg:mr-0 lg:mb-4 lg:rounded-full lg:border-8 lg:border-teal-700 focus:border-yellow-500"
      >
        <GatsbyImage
          className="aspect-square w-10 lg:w-48 rounded-full"
          alt={`${data.name} profile`}
          image={data.image?.gatsbyImage}
        />

        <span className="hidden ml-4 print:inline md:inline lg:hidden text-xl text-white font-bold tracking-wide">
          David Murdoch
        </span>
        <span className="inline ml-4 print:hidden md:hidden text-xl text-white font-bold tracking-wide">
          DSM
        </span>
      </Link>
      <div className={styles.icon}>
        <button
          aria-label="Open the navigation menu"
          onClick={onToggle}
          className="p-1 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
          aria-controls="primary-navigation"
          aria-expanded={open}
        >
          <Hamburger className="h-6 w-6" open={open} />
        </button>
      </div>

      <nav aria-label="Primary" className={styles.sections}>
        <div
          className="h-0 overflow-hidden md:contents"
          ref={mobileContainerRef}
          style={{
            height,
          }}
        >
          <div className="pt-2 md:contents" ref={mobileHeightRef}>
            {children}
          </div>
        </div>
      </nav>
    </div>
  );
};

export { Nav };
