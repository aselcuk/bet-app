import { BetBasket, Box } from '@/components';
import { Outlet } from 'react-router-dom';
import './styles.scss';

const MainLayout = () => {
  return (
    <Box className="main-layout">
      <Box className="main-layout-bet-list">
        <Outlet />
      </Box>
      <Box className="main-layout-bet-basket">
        <BetBasket />
      </Box>
    </Box>
  );
};

export default MainLayout;
