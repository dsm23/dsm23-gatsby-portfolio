import React, {
  FunctionComponent,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import lottie, { AnimationItem, AnimationConfigWithData } from 'lottie-web';
import { useIntersection } from 'react-use';
import animationData from '../../animations/waveLine.json';

type OptionsConfig = Omit<AnimationConfigWithData, 'container'>;

const options: OptionsConfig = {
  loop: false,
  animationData,
  renderer: 'svg',
  rendererSettings: {
    // width matches viewBox
    preserveAspectRatio: 'xMinYMid slice',
    progressiveLoad: true,
    // unique to waveLine
    viewBoxSize: '0 300 1155 100',
    viewBoxOnly: true,
  },
};

const startFrame = 0;
const endFrame = 100;

const Divisor: FunctionComponent<HTMLAttributes<HTMLDivElement>> = props => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const [autoplay, setAutoplay] = useState<boolean>(false);

  const intersection = useIntersection(animationContainer, {
    root: null,
    // prevent top divisor from animating on load at scrollY 0
    rootMargin: '0px',
    threshold: 1,
  });

  useEffect(() => {
    if (intersection?.intersectionRatio === 1) {
      setAutoplay(true);
    }
  }, [intersection?.intersectionRatio]);

  useEffect(() => {
    const anim: AnimationItem = lottie.loadAnimation({
      container: animationContainer.current as HTMLDivElement,
      ...options,
      autoplay,
    });

    if (autoplay) {
      anim.playSegments([startFrame, endFrame], true);

      return () => anim.destroy(); // optional clean up for unmounting
    }
  }, [autoplay]);

  return <div {...props} ref={animationContainer} />;
};

export { Divisor };
