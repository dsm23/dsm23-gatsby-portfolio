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

const defaultElementNavLink = 'a';
const defaultElementNavSpan = 'span';

const NavLink: <E extends ElementType = typeof defaultElementNavLink>(
  props: Props<E>,
) => ReactElement | null = forwardRef(
  (
    {
      as: Component = defaultElementNavLink,
      className,
      ...props
    }: PlymorphicProps,
    ref: Ref<Element>,
  ) => (
    <Component
      className={clsx(
        'flex items-center justify-start lg:justify-center uppercase w-full px-3 py-2 rounded hover:bg-gray-900 hover:text-white focus:outline-none',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

const NavSpan: <E extends ElementType = typeof defaultElementNavSpan>(
  props: Props<E>,
) => ReactElement | null = forwardRef(
  (
    {
      as: Component = defaultElementNavSpan,
      className,
      ...props
    }: PlymorphicProps,
    ref: Ref<Element>,
  ) => (
    <Component
      className={clsx(
        'font-medium rounded group-focus:bg-yellow-500 group-focus:text-gray-900 h-full',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

export { NavLink, NavSpan };
