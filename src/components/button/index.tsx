import ClassNames from 'classnames';
import { type ComponentProps } from 'react';
import './styles.scss';

export type ButtonProps = ComponentProps<'button'> & {
  fullWidth?: boolean;
};

export const Button = (props: ButtonProps) => {
  const { className, fullWidth, ...rest } = props;

  const classNames = ClassNames('button', {
    'button-full-width': fullWidth,
    'button-disabled': props.disabled,
    [`${className}`]: className
  });

  return <button className={classNames} {...rest} />;
};
