// https://codesandbox.io/s/x32155kw4q
import { useCallback, useRef, useState } from 'react';
import { easing as timing } from 'ts-easing';

const useTween = (
  initial: number,
  { easing = timing.inOutQuad, duration = 250 } = {},
): [number, (to: number) => void] => {
  const raf = useRef<number | null>(null);
  const [state, setState] = useState(initial);

  const setTween = useCallback(
    function setTween(to: number) {
      if (raf.current) cancelAnimationFrame(raf.current);

      let t0: number;
      function animate(t: number) {
        t0 = t0 || t;
        const delta = (t - t0) / duration,
          progress = Math.min(1, delta);

        setState(state => state + (to - state) * easing(progress));

        if (progress < 1) raf.current = requestAnimationFrame(animate);
        else raf.current = null;
      }

      raf.current = requestAnimationFrame(animate);
    },
    [duration, easing],
  );

  return [state, setTween];
};

export { useTween };
