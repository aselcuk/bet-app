import ClassNames from 'classnames';
import useTabs from '../hooks/useTabs';
import { type MouseEvent, type ComponentProps, useRef, useEffect } from 'react';

export type ITabProps = ComponentProps<'button'> & {
  index?: number;
};

export const Tab = (props: ITabProps) => {
  const { className, children, index, onClick, ...rest } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const { activeIndex, updateActiveIndex } = useTabs();

  /**
   *
   */
  const mainClassNames = ClassNames('tab', {
    [`tab-active`]: activeIndex == index,
    [`tab-disabled`]: props.disabled,
    [`${className}`]: className
  });

  /**
   *
   */
  useEffect(() => {
    if (activeIndex === index) {
      buttonRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeIndex, index]);

  /**
   *
   */
  const handleClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    updateActiveIndex?.(index!);
    onClick?.(event);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={mainClassNames}
      {...rest}
    >
      {children}
    </button>
  );
};
