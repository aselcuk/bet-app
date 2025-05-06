import { useContext } from 'react';
import TabsContext from './context';

const useTabs = () => {
  return useContext(TabsContext);
};

export default useTabs;
