import { Box } from '@/components';
import ClassNames from 'classnames';
import {
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode
} from 'react';

export type ITabPanelProps = ComponentProps<'div'> & {
  children: ReactNode;
  index?: number;
  value?: number;
};

export const TabPanel = (props: ITabPanelProps) => {
  const { className, children, index, value, ...rest } = props;

  const [render, setRender] = useState(false);

  /**
   *
   */
  const mainClassNames = ClassNames('tab-panel', {
    [`${className}`]: className
  });

  /**
   *
   */
  useEffect(() => {
    if (value == index) {
      setRender(true);
    }
  }, [value, index]);

  return (
    <Box className={mainClassNames} hidden={index != value} {...rest}>
      {render ? children : <></>}
    </Box>
  );
};
