import type { ComponentProps } from 'react';
import ClassNames from 'classnames';

export type TableFootProps = ComponentProps<'tfoot'>;

export const TableFoot = (props: TableFootProps) => {
  const { children, className, ...rest } = props;

  const classNames = ClassNames('table-foot', {
    [`${className}`]: className
  });

  return (
    <tfoot className={classNames} {...rest}>
      {children}
    </tfoot>
  );
};
