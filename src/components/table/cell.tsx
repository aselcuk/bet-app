import type { ComponentProps } from 'react';
import ClassNames from 'classnames';

export type TableCellProps = ComponentProps<'td'>;

export const TableCell = (props: TableCellProps) => {
  const { children, className, ...rest } = props;

  const classNames = ClassNames('table-cell', {
    [`${className}`]: className
  });

  return (
    <td className={classNames} {...rest}>
      {children}
    </td>
  );
};
