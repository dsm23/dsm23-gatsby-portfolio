import React, {
  FunctionComponent,
  SVGAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

import * as styles from './styles.module.css';

type Props = SVGAttributes<SVGSVGElement>;

const Divisor: FunctionComponent<Props> = props => {
  const animationContainer = useRef<SVGSVGElement>(null);
  const leftCurve = useRef<SVGAnimateElement>(null);
  const rightCurve = useRef<SVGAnimateElement>(null);
  const leftBall = useRef<SVGAnimateMotionElement>(null);
  const rightBall = useRef<SVGAnimateMotionElement>(null);

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
    if (autoplay) {
      leftCurve.current?.beginElement();
      rightCurve.current?.beginElement();
      leftBall.current?.beginElement();
      rightBall.current?.beginElement();
    }
  }, [autoplay]);

  return (
    <svg
      {...props}
      ref={animationContainer}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 260 50"
      className={styles.divisor}
      stroke="currentColor"
    >
      <path
        strokeDasharray={134}
        strokeDashoffset={-134}
        d="
        M10,25
        C30,40
        30,10
        50,25
        70,40
        70,10
        90,25
        110,40
        110,10
        130,25
        "
      >
        <animate
          ref={leftCurve}
          attributeName="stroke-dashoffset"
          to="0"
          dur="2500ms"
          fill="freeze"
          begin="indefinite"
        />
      </path>
      <path
        strokeDasharray={134}
        strokeDashoffset={134}
        d="
        M130,25
        C150,40
        150,10
        170,25
        190,40
        190,10
        210,25
        230,40
        230,10
        250,25
    "
      >
        <animate
          ref={rightCurve}
          attributeName="stroke-dashoffset"
          to="0"
          dur="2500ms"
          fill="freeze"
          begin="indefinite"
        />
      </path>
      <circle
        cx="10"
        cy="25"
        r="4"
        fill="currentColor"
        className="text-green-300"
        visibility={!autoplay ? 'hidden' : 'visible'}
      >
        <animateMotion
          ref={leftBall}
          dur="2500ms"
          repeatCount="1"
          begin="indefinite"
          path="M120,0 C100,-15
            100,15
            80,0
            60,-15
            60,15
            40,0
            20,-15
            20,15
            0,0"
        />
      </circle>
      <circle
        cx="250"
        cy="25"
        r="4"
        fill="currentColor"
        className="text-teal-500"
        visibility={!autoplay ? 'hidden' : 'visible'}
      >
        <animateMotion
          ref={rightBall}
          dur="2500ms"
          repeatCount="1"
          begin="indefinite"
          path="M-120,0 C-100,15
          -100,-15
          -80,0
          -60,15
          -60,-15
          -40,0
          -20,15
          -20,-15
          0,0"
        />
      </circle>
    </svg>
  );
};

export { Divisor };
