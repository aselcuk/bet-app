import type { ComponentProps } from 'react';
import ClassNames from 'classnames';

export type TableHeadProps = ComponentProps<'thead'>;

export const TableHead = (props: TableHeadProps) => {
  const { children, className, ...rest } = props;

  const classNames = ClassNames('table-head', {
    [`${className}`]: className
  });

  return (
    <thead className={classNames} {...rest}>
      {children}
    </thead>
  );
};
