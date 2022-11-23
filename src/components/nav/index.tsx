import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GatsbyImage } from 'gatsby-plugin-image';
import resolveConfig from 'tailwindcss/resolveConfig';
import { KeyValuePair } from 'tailwindcss/types/config.js';
import { ResizeObserver } from 'resize-observer';
import tailwindConfig from '../../../tailwind.config.js';
import { Link } from '../link';
import { Cross, Hamburger } from '../svgs';
import { ContentfulPerson } from '../../../graphql-types';

import * as styles from './styles.module.css';

interface Props {
  data: ContentfulPerson;
  open: boolean;
  onToggle: () => void;
}

const fullConfig = resolveConfig(tailwindConfig);

const Nav: FunctionComponent<Props> = ({ children, data, onToggle, open }) => {
  const [height, setHeight] = useState(0);
  const [isMobile, setMobile] = useState(false);

  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileHeightRef = useRef<HTMLDivElement>(null);

  const tween = useRef<gsap.core.Tween | null>(null);

  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      setMobile(
        window.matchMedia(
          `(min-width: ${
            (fullConfig.theme?.screens as KeyValuePair<string, string>)
              ?.md as string
          })`,
        ).matches,
      );
      if (entry.contentBoxSize) {
        // Firefox implements `contentBoxSize` as a single content rect, rather than an array
        const contentBoxSize = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize;

        setHeight(contentBoxSize.blockSize);
      } else {
        setHeight(entry.contentRect.height);
      }
    }
  });

  useEffect(() => {
    resizeObserver.observe(mobileHeightRef.current!);
    return () => {
      resizeObserver.unobserve(mobileHeightRef.current!);
    };
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      tween.current = gsap.fromTo(
        mobileContainerRef.current,
        {
          height: 0,
        },
        {
          height,
          duration: 0.4,
          ease: 'circ.inOut',
          paused: true,
        },
      );
    }, mobileContainerRef);

    return () => ctx.revert();
  }, [height]);

  useEffect(() => {
    if (open) {
      tween.current!.play();
    } else {
      tween.current!.reverse();
    }
  }, [open, isMobile]);

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

        <span className="hidden ml-4 md:inline lg:hidden text-xl text-white font-bold tracking-wide">
          David Murdoch
        </span>
        <span className="inline ml-4 md:hidden text-xl text-white font-bold tracking-wide">
          DSM
        </span>
      </Link>
      <div className={styles.icon}>
        <button
          aria-label="Open the navigation menu"
          onClick={onToggle}
          className="p-1 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
        >
          {!open && <Hamburger className="block h-6 w-6" />}
          {open && <Cross className="block h-6 w-6" />}
        </button>
      </div>

      <nav aria-label="Primary" className={styles.sections}>
        <div
          className="h-0 overflow-hidden md:contents"
          ref={mobileContainerRef}
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
