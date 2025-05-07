import type { ComponentProps } from 'react';
import ClassNames from 'classnames';
import './styles.scss';

export type TypographyVariant =
  | 'heading1'
  | 'heading2'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption';

export type TypographyColor = 'text' | 'primary' | 'black' | 'white' | 'error';

export type TypographyAlign = 'center' | 'end' | 'justify' | 'left';

export type TypographyWeight = 300 | 400 | 500 | 600 | 700;

export type TypographyProps = ComponentProps<'p'> & {
  truncate?: boolean;
  color?: TypographyColor;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  variant?: TypographyVariant;
};

const TypographyMapper = {
  heading1: 'h1',
  heading2: 'h2',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span'
};

export const Typography = (props: TypographyProps) => {
  const {
    align,
    children,
    className,
    weight,
    truncate,
    variant = 'body1',
    color = 'text',
    ...rest
  } = props;

  const classNames = ClassNames('typography', {
    'typography-truncate': truncate,
    [`typography-${variant}`]: variant,
    [`typography-color-${color}`]: color,
    [`typography-align-${align}`]: align,
    [`typography-weight-${weight}`]: weight,
    [`${className}`]: className
  });

  const Element: any = TypographyMapper[variant];

  return (
    <Element className={classNames} {...rest}>
      {children}
    </Element>
  );
};
