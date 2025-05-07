import ClassNames from 'classnames';
import type { ComponentProps } from 'react';
import { FlexBox } from '../flexBox';
import { Typography } from '../typography';
import './styles.scss';

export type EmptyDataProps = ComponentProps<'div'>;

export const EmptyData = (props: EmptyDataProps) => {
  const { children, className, ...rest } = props;

  const classNames = ClassNames('empty-data', {
    [`${className}`]: className
  });

  return (
    <FlexBox justifyContent="center" className={classNames} {...rest}>
      <Typography color="black">{children}</Typography>
    </FlexBox>
  );
};
