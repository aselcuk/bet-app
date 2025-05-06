import { Box } from '../box';
import ClassNames from 'classnames';
import TabsContext from './hooks/context';
import {
  cloneElement,
  useCallback,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode
} from 'react';
import './styles.scss';

export type ITabsProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  index?: number;
  children: Array<ReactNode>;
  onChange?: (index: number) => void;
};

export const Tabs = (props: ITabsProps) => {
  const { children, className, index = 0, onChange, ...rest } = props;

  const [activeIndex, setActiveIndex] = useState(index);

  /**
   *
   */
  const mainClassNames = ClassNames('tabs', {
    [`${className}`]: className
  });

  /**
   *
   * @param index
   */
  const updateActiveIndex = useCallback(
    (index: number) => {
      setActiveIndex(index);

      onChange?.(index);
    },
    [onChange]
  );

  /**
   *
   */
  const contextValue = useMemo(
    () => ({ activeIndex, updateActiveIndex }),
    [activeIndex, updateActiveIndex]
  );

  return (
    <Box className={mainClassNames} {...rest}>
      <TabsContext.Provider value={contextValue}>
        {children.map((child, i) =>
          cloneElement(child as any, {
            key: `tab-child-${i}`,
            index: i
          })
        )}
      </TabsContext.Provider>
    </Box>
  );
};
