import React, { useEffect, useMemo, useRef } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';
import { useAsync } from '../../../utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  src: string;
}

const fetchSvg = (url: string) => async () => {
  const res = await fetch(url, {
    headers: new Headers({
      Accept: 'image/svg+xml',
    }),
  });

  return await res.text();
};

const SVGLoader: FunctionComponent<Props> = ({ src, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  const memoisedFetchFn = useMemo(() => fetchSvg(src), [src]);

  const { status, value } = useAsync(memoisedFetchFn);

  useEffect(() => {
    if (value && status === 'success') {
      ref.current?.insertAdjacentHTML('beforeend', value);
    }
  }, [value, status]);

  return <div ref={ref} {...props} />;
};

export default SVGLoader;
