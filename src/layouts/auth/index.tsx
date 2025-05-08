import { Box, FlexBox, Typography } from '@/components';
import { Outlet } from 'react-router-dom';
import './styles.scss';

const AuthLayout = () => {
  return (
    <FlexBox
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="var(--spacing-32)"
      className="auth-layout"
    >
      <Box>
        <Typography variant="subtitle1" color="primary">
          Welcome to Bet App
        </Typography>
      </Box>

      <Outlet />
    </FlexBox>
  );
};

export default AuthLayout;
