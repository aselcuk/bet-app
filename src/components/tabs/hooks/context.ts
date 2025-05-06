import { createContext } from 'react';

const TabsContext = createContext<{
  activeIndex?: number;
  updateActiveIndex?: (index: number) => void;
}>({});

export default TabsContext;
