import React, {
  ComponentProps,
  ElementType,
  forwardRef,
  ReactElement,
  Ref,
} from 'react';
import clsx from 'clsx';
import { Link } from 'gatsby';

export type PlymorphicProps<E extends ElementType = ElementType> = {
  as?: E;
  className?: string;
};

export type Props<E extends ElementType> = PlymorphicProps<E> &
  Omit<ComponentProps<E>, keyof PlymorphicProps>;

const defaultElement = Link;

const StyledLink: <E extends ElementType = typeof defaultElement>(
  props: Props<E>,
) => ReactElement | null = forwardRef(
  (
    { as: Component = defaultElement, className, ...props }: PlymorphicProps,
    ref: Ref<Element>,
  ) => (
    <Component
      className={clsx(
        'transition transform duration-500 ease-in-out w-10 h-10 flex items-center justify-center rounded-full outline-none bg-gray-100 hover:bg-green-900 hover:scale-125 focus:border-2 focus:border-yellow-500',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

export { StyledLink };
