import { signOutUser } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@/redux/store';
import { Box, FlexBox, Typography } from '@/components';
import { logout } from '@/redux/authSlice';
import { clearEvents } from '@/redux/eventsSlice';
import { clearBasket } from '@/redux/betBasketSlice';
import { clearFilters } from '@/redux/filtersSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    signOutUser().then(() => {
      dispatch(logout());
      dispatch(clearEvents());
      dispatch(clearBasket());
      dispatch(clearFilters());

      navigate('/auth/signin');
    });
  };

  return (
    <FlexBox
      alignItems="center"
      justifyContent="flex-end"
      className="main-layout-header"
    >
      <Box>
        <FlexBox alignItems="center" wrap="nowrap" gap="var(--spacing-16)">
          <Typography variant="body2" weight={500} color="black">
            {user?.email}
          </Typography>

          <Typography
            weight={700}
            variant="heading2"
            onClick={handleLogout}
            className="main-layout-header-logout"
          >
            ⏻
          </Typography>
        </FlexBox>
      </Box>
    </FlexBox>
  );
};

export default Header;
