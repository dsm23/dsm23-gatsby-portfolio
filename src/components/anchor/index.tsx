import React, {
  ComponentProps,
  ElementType,
  forwardRef,
  ReactElement,
  Ref,
} from 'react';
import clsx from 'clsx';

export type PlymorphicProps<E extends ElementType = ElementType> = {
  as?: E;
  className?: string;
};

export type Props<E extends ElementType> = PlymorphicProps<E> &
  Omit<ComponentProps<E>, keyof PlymorphicProps>;

const defaultElement = 'a';

const Anchor: <E extends ElementType = typeof defaultElement>(
  props: Props<E>,
) => ReactElement | null = forwardRef(
  (
    { as: Component = defaultElement, className, ...props }: PlymorphicProps,
    ref: Ref<Element>,
  ) => (
    <Component
      className={clsx(
        'text-teal-900 hover:underline outline-none focus:bg-yellow-500 focus:rounded px-1 -mx-1',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

export { Anchor };
