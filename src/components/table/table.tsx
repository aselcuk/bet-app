import type { ComponentProps } from 'react';
import ClassNames from 'classnames';
import './styles.scss';

export type TableProps = ComponentProps<'table'>;

export const Table = (props: TableProps) => {
  const { children, className, ...rest } = props;

  const classNames = ClassNames('table', {
    [`${className}`]: className
  });

  return (
    <table className={classNames} {...rest}>
      {children}
    </table>
  );
};
