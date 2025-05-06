import type { ComponentProps } from 'react';
import ClassNames from 'classnames';

export type TableRowProps = ComponentProps<'tr'>;

export const TableRow = (props: TableRowProps) => {
  const { children, className, ...rest } = props;

  const classNames = ClassNames('table-row', {
    [`${className}`]: className
  });

  return (
    <tr className={classNames} {...rest}>
      {children}
    </tr>
  );
};
