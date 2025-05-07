import { signOutUser } from '@/utils';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@/redux/store';
import { Box, FlexBox, Typography } from '@/components';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    signOutUser().then(() => {
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
