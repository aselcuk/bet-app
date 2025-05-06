import ClassNames from 'classnames';
import type { ComponentProps } from 'react';
import './styles.scss';

export type Align =
  | 'baseline'
  | 'center'
  | 'start'
  | 'end'
  | 'stretch'
  | 'flex-end'
  | 'flex-start'
  | 'self-end'
  | 'self-start';

export type Justify =
  | 'center'
  | 'start'
  | 'end'
  | 'stretch'
  | 'revert'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export type Wrap =
  | 'nowrap'
  | 'wrap'
  | 'wrap-reverse'
  | 'initial'
  | 'inherit'
  | 'unset';

export type FlexBoxProps = ComponentProps<'div'> & {
  alignItems?: Align;
  justifyContent?: Justify;
  direction?: Direction;
  gap?: string;
  columnGap?: string;
  rowGap?: string;
  wrap?: Wrap;
  fullWidth?: boolean;
};

export const FlexBox = (props: FlexBoxProps) => {
  const {
    children,
    className,
    direction,
    alignItems,
    justifyContent,
    wrap,
    fullWidth = false,
    gap,
    rowGap,
    columnGap,
    style,
    ...rest
  } = props;

  const classNames = ClassNames('flex-box', {
    [`flex-box-align-items-${alignItems}`]: alignItems,
    [`flex-box-justify-content-${justifyContent}`]: justifyContent,
    [`flex-box-wrap-${wrap}`]: wrap,
    [`flex-box-direction-${direction}`]: direction,
    [`flex-box-full-width`]: fullWidth,
    [`${className}`]: className
  });

  return (
    <div
      className={classNames}
      style={{
        ...(gap ? { gap } : {}),
        ...(rowGap ? { rowGap } : {}),
        ...(columnGap ? { columnGap } : {}),
        ...style
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
