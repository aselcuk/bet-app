import ClassNames from 'classnames';
import {
  useState,
  type FocusEvent,
  type ComponentProps,
  type ReactNode
} from 'react';
import './styles.scss';

export type InputProps = ComponentProps<'input'> & {
  error?: boolean;
  fullWidth?: boolean;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  onAdornmentClick?: () => void;
};

export const Input = (props: InputProps) => {
  const { className, error, fullWidth, onFocus, onBlur, ...rest } = props;

  const [inputFocus, setInputFocus] = useState(false);

  const classNames = ClassNames('input', {
    'input-error': error,
    'input-focus': inputFocus && !error,
    'input-full-width': fullWidth,
    [`${className}`]: className
  });

  /**
   *
   */
  const handleOnFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
    setInputFocus(true);
    onFocus?.(event);
  };

  /**
   *
   */
  const handleOnBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
    setInputFocus(false);
    onBlur?.(event);
  };

  return (
    <input
      className={classNames}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      {...rest}
    />
  );
};
