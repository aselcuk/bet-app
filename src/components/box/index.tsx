import ClassNames from 'classnames';
import type { ComponentProps } from 'react';

export type BoxProps = ComponentProps<'div'>;

export const Box = (props: BoxProps) => {
  const { children, className, ...rest } = props;

  const classNames = ClassNames('box', {
    [`${className}`]: className
  });

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};
