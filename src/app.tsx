import { useEffect, useState } from 'react';
import { router } from './routes';
import { Box } from './components';
import { onAuthChange } from './utils';
import type { RootState } from './redux/store';
import { RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthLoading, setUser } from './redux/authSlice';
import './styles/index.scss';
import './app.scss';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [isAuthChanged, setIsAuthChanged] = useState(false);

  useEffect(() => {
    dispatch(setAuthLoading(true));

    const unsubscribe = onAuthChange((user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
          })
        );
      } else {
        dispatch(setUser(null));
      }
      dispatch(setAuthLoading(false));
      setIsAuthChanged(true);
    });

    return unsubscribe;
  }, [dispatch]);

  if (loading || !isAuthChanged) {
    return <></>;
  }

  return (
    <Box className="app">
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
