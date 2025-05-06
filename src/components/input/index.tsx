import {
  useState,
  type FocusEvent,
  type ComponentProps,
  type ReactNode
} from 'react';
import ClassNames from 'classnames';
import './styles.scss';

export type InputProps = ComponentProps<'input'> & {
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  onAdornmentClick?: () => void;
};

export const Input = (props: InputProps) => {
  const { className, onFocus, onBlur, ...rest } = props;

  const [inputFocus, setInputFocus] = useState(false);

  const classNames = ClassNames('input', {
    'input-focus': inputFocus,
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
