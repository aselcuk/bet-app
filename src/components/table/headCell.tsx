import type { ComponentProps } from 'react';
import ClassNames from 'classnames';

export type TableHeadCellProps = ComponentProps<'th'>;

export const TableHeadCell = (props: TableHeadCellProps) => {
  const { children, className, ...rest } = props;

  const classNames = ClassNames('table-head-cell', {
    [`${className}`]: className
  });

  return (
    <th className={classNames} {...rest}>
      {children}
    </th>
  );
};
