import Header from './header';
import { Outlet } from 'react-router-dom';
import { BetBasket, Box } from '@/components';
import './styles.scss';

const MainLayout = () => {
  return (
    <Box>
      <Box>
        <Header />
      </Box>
      <Box className="main-layout">
        <Box className="main-layout-bet-list">
          <Outlet />
        </Box>
        <Box className="main-layout-bet-basket">
          <BetBasket />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
