import type { ComponentProps } from 'react';
import ClassNames from 'classnames';

export type TableBodyProps = ComponentProps<'tbody'>;

export const TableBody = (props: TableBodyProps) => {
  const { children, className, ...rest } = props;

  const classNames = ClassNames('table-body', {
    [`${className}`]: className
  });

  return (
    <tbody className={classNames} {...rest}>
      {children}
    </tbody>
  );
};
