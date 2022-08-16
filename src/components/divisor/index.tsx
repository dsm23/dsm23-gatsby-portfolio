import React, {
  FunctionComponent,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import lottie, { AnimationItem, AnimationConfigWithData } from 'lottie-web';
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

  const observerOptions = {
    root: animationContainer.current,
    rootMargin: '0px',
    threshold: 1,
  };

  const callback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setAutoplay(true);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, observerOptions);

    observer.observe(animationContainer.current!);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const anim: AnimationItem = lottie.loadAnimation({
      container: animationContainer.current as HTMLDivElement,
      ...options,
      autoplay,
    });

    if (autoplay) {
      anim.playSegments([startFrame, endFrame], true);
    }
    return () => anim.destroy(); // optional clean up for unmounting
  }, [autoplay]);

  return <div {...props} className="h-32" ref={animationContainer} />;
};

export { Divisor };
